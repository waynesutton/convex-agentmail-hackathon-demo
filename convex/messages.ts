import { v } from "convex/values";
import { query, mutation, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

// Create a new thread
export const createThread = mutation({
  args: {},
  returns: v.id("threads"),
  handler: async (ctx) => {
    const threadId = await ctx.db.insert("threads", {});
    return threadId;
  },
});

// List all messages in a thread
export const listMessages = query({
  args: { threadId: v.id("threads") },
  returns: v.array(
    v.object({
      _id: v.id("messages"),
      _creationTime: v.number(),
      threadId: v.id("threads"),
      role: v.union(
        v.literal("user"),
        v.literal("assistant"),
        v.literal("email")
      ),
      content: v.string(),
      from: v.optional(v.string()),
      to: v.optional(v.string()),
      subject: v.optional(v.string()),
    })
  ),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();

    return messages;
  },
});

// Send a user message and schedule agent reply
export const sendUserMessage = mutation({
  args: {
    threadId: v.id("threads"),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Verify thread exists
    const thread = await ctx.db.get(args.threadId);
    if (!thread) {
      throw new Error("Thread not found");
    }

    // Insert user message
    await ctx.db.insert("messages", {
      threadId: args.threadId,
      role: "user",
      content: args.content,
    });

    // Schedule agent reply
    await ctx.scheduler.runAfter(0, internal.agent.generateAgentReply, {
      threadId: args.threadId,
    });

    return null;
  },
});

// Get chat transcript formatted for email (internal)
export const getChatTranscript = internalQuery({
  args: { threadId: v.id("threads") },
  returns: v.string(),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("asc")
      .collect();

    if (messages.length === 0) {
      return "No messages in this chat yet.";
    }

    let transcript = "Chat Transcript\n";
    transcript += "=".repeat(50) + "\n\n";

    for (const msg of messages) {
      const timestamp = new Date(msg._creationTime).toLocaleString();
      let senderName = "";
      
      if (msg.role === "user") {
        senderName = "You";
      } else if (msg.role === "assistant") {
        senderName = "AI Agent";
      } else if (msg.role === "email") {
        senderName = msg.from || "Email";
      }
      
      transcript += `[${timestamp}] ${senderName}:\n`;
      transcript += `${msg.content}\n`;
      
      if (msg.subject) {
        transcript += `(Email - Subject: ${msg.subject}`;
        if (msg.to) {
          transcript += `, To: ${msg.to}`;
        }
        transcript += `)\n`;
      }
      
      transcript += "\n";
    }

    transcript += "=".repeat(50) + "\n";
    transcript += `Total messages: ${messages.length}\n`;
    transcript += `Generated: ${new Date().toLocaleString()}\n`;

    return transcript;
  },
});


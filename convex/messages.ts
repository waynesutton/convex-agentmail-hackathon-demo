import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
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


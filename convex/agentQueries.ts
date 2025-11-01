import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

// Load recent messages from thread for context
export const loadThreadContext = internalQuery({
  args: { threadId: v.id("threads") },
  returns: v.array(
    v.object({
      role: v.union(v.literal("user"), v.literal("assistant")),
      content: v.string(),
    })
  ),
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .order("desc")
      .take(20);

    // Reverse to get chronological order and map to OpenAI format
    return messages
      .reverse()
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));
  },
});

// Append assistant message to thread
export const appendAgentMessage = internalMutation({
  args: {
    threadId: v.id("threads"),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      threadId: args.threadId,
      role: "assistant",
      content: args.content,
    });
    return null;
  },
});


import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Chat threads
  threads: defineTable({
    name: v.optional(v.string()),
  }),

  // Messages in threads from users or agents
  messages: defineTable({
    threadId: v.id("threads"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("email")),
    content: v.string(),
    // Optional fields for email messages
    from: v.optional(v.string()),
    to: v.optional(v.string()),
    subject: v.optional(v.string()),
  }).index("by_thread", ["threadId"]),

  // AgentMail inbox mapping per thread
  mail_inboxes: defineTable({
    threadId: v.id("threads"),
    inboxId: v.string(),
    emailAddress: v.string(),
    username: v.string(),
    domain: v.string(),
  }).index("by_thread", ["threadId"])
    .index("by_inbox_id", ["inboxId"]),
});


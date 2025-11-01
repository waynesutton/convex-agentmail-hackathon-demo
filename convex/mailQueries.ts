import { v } from "convex/values";
import { internalQuery, internalMutation } from "./_generated/server";

// Internal: Get inbox by thread
export const getInboxByThread = internalQuery({
  args: { threadId: v.id("threads") },
  returns: v.union(
    v.object({
      inboxId: v.string(),
      emailAddress: v.string(),
      username: v.string(),
      domain: v.string(),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const inbox = await ctx.db
      .query("mail_inboxes")
      .withIndex("by_thread", (q) => q.eq("threadId", args.threadId))
      .first();

    if (!inbox) {
      return null;
    }

    return {
      inboxId: inbox.inboxId,
      emailAddress: inbox.emailAddress,
      username: inbox.username,
      domain: inbox.domain,
    };
  },
});

// Internal: Store inbox mapping
export const storeInbox = internalMutation({
  args: {
    threadId: v.id("threads"),
    inboxId: v.string(),
    emailAddress: v.string(),
    username: v.string(),
    domain: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("mail_inboxes", {
      threadId: args.threadId,
      inboxId: args.inboxId,
      emailAddress: args.emailAddress,
      username: args.username,
      domain: args.domain,
    });
    return null;
  },
});

// Internal: Record email message
export const recordEmailMessage = internalMutation({
  args: {
    threadId: v.id("threads"),
    from: v.string(),
    to: v.string(),
    subject: v.string(),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      threadId: args.threadId,
      role: "email",
      content: args.content,
      from: args.from,
      to: args.to,
      subject: args.subject,
    });
    return null;
  },
});

// Internal: Get inbox by inboxId
export const getInboxByInboxId = internalQuery({
  args: { inboxId: v.string() },
  returns: v.union(
    v.object({
      threadId: v.id("threads"),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const inbox = await ctx.db
      .query("mail_inboxes")
      .withIndex("by_inbox_id", (q) => q.eq("inboxId", args.inboxId))
      .first();

    if (!inbox) {
      return null;
    }

    return {
      threadId: inbox.threadId,
    };
  },
});


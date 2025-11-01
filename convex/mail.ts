"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { AgentMailClient } from "agentmail";
import { Id } from "./_generated/dataModel";

// Initialize AgentMail client
const getAgentMailClient = () => {
  return new AgentMailClient({
    apiKey: process.env.AGENTMAIL_API_KEY!,
  });
};

// Create an inbox for a thread
export const createInbox = action({
  args: { threadId: v.id("threads") },
  returns: v.object({
    inboxId: v.string(),
    emailAddress: v.string(),
  }),
  handler: async (ctx, args): Promise<{ inboxId: string; emailAddress: string }> => {
    const client = getAgentMailClient();
    
    // Check if inbox already exists for this thread
    const existing: { inboxId: string; emailAddress: string; username: string; domain: string } | null = 
      await ctx.runQuery(internal.mailQueries.getInboxByThread, {
        threadId: args.threadId,
      });
    
    if (existing) {
      return {
        inboxId: existing.inboxId,
        emailAddress: existing.emailAddress,
      };
    }

    // Create new inbox
    const username = `thread-${args.threadId.replace(":", "-")}`;
    const domain = process.env.AGENTMAIL_DOMAIN || "agentmail.to";
    
    const inbox = await client.inboxes.create({
      username,
      domain,
    });

    // Construct email address from username and domain
    const emailAddress = `${username}@${domain}`;

    // Store inbox mapping
    await ctx.runMutation(internal.mailQueries.storeInbox, {
      threadId: args.threadId,
      inboxId: inbox.inboxId,
      emailAddress,
      username,
      domain,
    });

    return {
      inboxId: inbox.inboxId,
      emailAddress,
    };
  },
});

// Send an email from a thread's inbox
export const sendEmail = action({
  args: {
    threadId: v.id("threads"),
    to: v.string(),
    subject: v.string(),
    text: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args): Promise<null> => {
    const client = getAgentMailClient();

    // Get or create inbox for this thread
    let inbox: { inboxId: string; emailAddress: string; username: string; domain: string } | null = 
      await ctx.runQuery(internal.mailQueries.getInboxByThread, {
        threadId: args.threadId,
      });

    if (!inbox) {
      // Create inbox by calling the handler directly
      const username = `thread-${args.threadId.replace(":", "-")}`;
      const domain = process.env.AGENTMAIL_DOMAIN || "agentmail.to";
      
      const newInbox = await client.inboxes.create({
        username,
        domain,
      });

      // Construct email address from username and domain
      const emailAddress = `${username}@${domain}`;

      // Store inbox mapping
      await ctx.runMutation(internal.mailQueries.storeInbox, {
        threadId: args.threadId,
        inboxId: newInbox.inboxId,
        emailAddress,
        username,
        domain,
      });

      // Set inbox for use
      inbox = {
        inboxId: newInbox.inboxId,
        emailAddress,
        username,
        domain,
      };
    }

    // Send email
    await client.inboxes.messages.send(
      inbox.inboxId,
      {
        to: args.to,
        subject: args.subject,
        text: args.text,
      }
    );

    // Record sent email in messages
    await ctx.runMutation(internal.mailQueries.recordEmailMessage, {
      threadId: args.threadId,
      from: inbox.emailAddress,
      to: args.to,
      subject: args.subject,
      content: args.text,
    });

    return null;
  },
});

// Send chat transcript via email
export const sendChatTranscript = action({
  args: {
    threadId: v.id("threads"),
    recipientEmail: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args): Promise<null> => {
    // Get the chat transcript
    const transcript: string = await ctx.runQuery(internal.messages.getChatTranscript, {
      threadId: args.threadId,
    });

    // Send it via email using the existing sendEmail action
    await sendEmailHelper(ctx, {
      threadId: args.threadId,
      to: args.recipientEmail,
      subject: "Your Chat Transcript from Convex AgentMail Demo",
      text: transcript,
    });

    return null;
  },
});

// Helper function to send email (to avoid circular reference)
async function sendEmailHelper(
  ctx: any,
  args: {
    threadId: Id<"threads">;
    to: string;
    subject: string;
    text: string;
  }
): Promise<void> {
  const client = getAgentMailClient();

  // Get or create inbox for this thread
  let inbox: { inboxId: string; emailAddress: string; username: string; domain: string } | null = 
    await ctx.runQuery(internal.mailQueries.getInboxByThread, {
      threadId: args.threadId,
    });

  if (!inbox) {
    // Create inbox
    const username = `thread-${args.threadId.replace(":", "-")}`;
    const domain = process.env.AGENTMAIL_DOMAIN || "agentmail.to";
    
    const newInbox = await client.inboxes.create({
      username,
      domain,
    });

    const emailAddress = `${username}@${domain}`;

    await ctx.runMutation(internal.mailQueries.storeInbox, {
      threadId: args.threadId,
      inboxId: newInbox.inboxId,
      emailAddress,
      username,
      domain,
    });

    inbox = {
      inboxId: newInbox.inboxId,
      emailAddress,
      username,
      domain,
    };
  }

  // Send email
  await client.inboxes.messages.send(
    inbox.inboxId,
    {
      to: args.to,
      subject: args.subject,
      text: args.text,
    }
  );

  // Record sent email in messages
  await ctx.runMutation(internal.mailQueries.recordEmailMessage, {
    threadId: args.threadId,
    from: inbox.emailAddress,
    to: args.to,
    subject: args.subject,
    content: args.text,
  });
}


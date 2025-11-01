import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// AgentMail webhook endpoint
http.route({
  path: "/agentmail/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    try {
      const body = await req.json();
      
      // AgentMail sends webhook with inbox_id and message data
      const { inbox_id, message } = body;
      
      if (!inbox_id || !message) {
        return new Response("Missing inbox_id or message", { status: 400 });
      }

      // Find thread by inbox_id
      const inbox = await ctx.runQuery(internal.mailQueries.getInboxByInboxId, {
        inboxId: inbox_id,
      });

      if (!inbox) {
        return new Response("Inbox not found", { status: 404 });
      }

      // Parse email and add to thread
      const from = message.from || "unknown";
      const subject = message.subject || "(no subject)";
      const text = message.text || message.html || "";

      await ctx.runMutation(internal.mailQueries.recordEmailMessage, {
        threadId: inbox.threadId,
        from,
        to: "", // Inbound email recipient (our inbox)
        subject,
        content: text,
      });

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return new Response("Internal error", { status: 500 });
    }
  }),
});

export default http;


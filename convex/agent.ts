"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import OpenAI from "openai";

// Generate AI agent response for a thread
export const generateAgentReply = internalAction({
  args: { threadId: v.id("threads") },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Initialize OpenAI client inside action
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Load recent messages for context
    const messages: Array<{ role: "user" | "assistant"; content: string }> =
      await ctx.runQuery(internal.agentQueries.loadThreadContext, {
        threadId: args.threadId,
      });

    // Call OpenAI to generate response
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant in a chat app that can also send and receive emails. Be concise and friendly.",
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    // Append assistant reply to thread
    await ctx.runMutation(internal.agentQueries.appendAgentMessage, {
      threadId: args.threadId,
      content,
    });

    return null;
  },
});


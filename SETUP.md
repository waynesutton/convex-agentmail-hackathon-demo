# Setup Guide

Follow these steps to get the Convex AgentMail Chat demo running.

## Prerequisites

- Node.js 18+ installed
- NPM or Yarn package manager
- OpenAI API key
- AgentMail API key

## Step by Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize Convex

```bash
npx convex dev
```

This command will:
- Prompt you to log in or create a Convex account
- Create a new Convex project
- Generate your deployment URL
- Start the Convex dev server

Keep this terminal window open.

### 3. Set Environment Variables

#### A. Local Environment (.env.local)

Create a `.env.local` file in the root directory:

```bash
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

Replace with your actual Convex deployment URL from step 2.

#### B. Convex Environment Variables

In a new terminal, open the Convex dashboard:

```bash
npx convex dashboard
```

Navigate to: **Settings → Environment Variables**

Add these variables:

```
OPENAI_API_KEY=sk-your-openai-api-key
AGENTMAIL_API_KEY=your-agentmail-api-key
AGENTMAIL_DOMAIN=agentmail.to
```

### 4. Start the Development Server

In a new terminal (keep Convex dev running):

```bash
npm run dev
```

The app should open at `http://localhost:5173`

## Testing the App

### Chat Functionality

1. Open the app in your browser
2. Type a message in the input field
3. Click "Send"
4. Wait for the AI agent to respond

### Email Functionality

1. Click "Show Email" button
2. Click "Create Inbox" to generate an email address
3. Copy the generated email address
4. Fill in the send email form:
   - To: any valid email address
   - Subject: test email
   - Message: your test message
5. Click "Send Email"

### Testing Inbound Email (Advanced)

To test receiving emails, you need to expose the webhook endpoint publicly:

1. Install ngrok or similar tool:
   ```bash
   npm install -g ngrok
   ```

2. Get your Convex HTTP endpoint:
   ```bash
   npx convex dashboard
   ```
   Navigate to Settings → HTTP Routes
   Copy the URL (e.g., `https://your-deployment.convex.site`)

3. Configure AgentMail webhook:
   - Go to AgentMail dashboard
   - Set webhook URL to: `https://your-deployment.convex.site/agentmail/webhook`

4. Send an email to your inbox address from any email client

5. Check the chat interface for the received email

## Troubleshooting

### "Cannot find module" errors

Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Convex functions not found

Make sure Convex dev is running:
```bash
npx convex dev
```

### OpenAI API errors

Verify your `OPENAI_API_KEY` is correct in the Convex dashboard environment variables.

### AgentMail errors

Verify your `AGENTMAIL_API_KEY` is correct in the Convex dashboard environment variables.

### Webhook not receiving emails

- Ensure your Convex HTTP endpoint is publicly accessible
- Verify webhook URL is correctly configured in AgentMail dashboard
- Check Convex logs for errors: `npx convex logs`

## Development Commands

```bash
# Start Convex dev server
npx convex dev

# Open Convex dashboard
npx convex dashboard

# View Convex logs
npx convex logs

# Start Vite dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Production Deployment

### Deploy Convex Backend

```bash
npx convex deploy
```

This will deploy your backend to production.

### Deploy Frontend

You can deploy the frontend to any static hosting service:

- Vercel
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront

Make sure to set the `VITE_CONVEX_URL` environment variable to your production Convex URL.

### Configure Production Webhook

Update your AgentMail webhook URL to point to your production Convex deployment.

## Next Steps

- Customize the AI agent prompt in `convex/agent.ts`
- Add authentication with Clerk or Convex Auth
- Implement multi-user support
- Add file attachments to emails
- Create email threads and conversations
- Add search and filtering

## Support

For issues with:
- Convex: https://docs.convex.dev
- AgentMail: https://agentmail.to/docs
- OpenAI: https://platform.openai.com/docs


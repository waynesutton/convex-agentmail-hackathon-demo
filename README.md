# Convex AgentMail Chat Demo

A real time chat app that combines Convex realtime backend, OpenAI agent responses, and AgentMail email integration. Users can chat with an AI agent and send receive emails within the same conversation thread.

## Features

- Real time chat with AI agent powered by OpenAI
- AgentMail integration for sending and receiving emails
- Clean tan themed UI
- Anonymous demo with no auth required

## Tech Stack

- **Backend**: Convex with realtime subscriptions
- **AI**: OpenAI GPT-4o-mini
- **Email**: AgentMail API
- **Frontend**: React + Vite with TypeScript
- **Styling**: CSS with tan theme from theme guide

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Convex

```bash
npx convex dev
```

This will:
- Create a Convex project
- Generate your deployment URL
- Start the Convex dev server

### 3. Configure Environment Variables

#### Local (.env.local)
```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

#### Convex Dashboard (npx convex dashboard)
Navigate to Settings > Environment Variables and add:
```
OPENAI_API_KEY=your_openai_api_key
AGENTMAIL_API_KEY=your_agentmail_api_key
AGENTMAIL_DOMAIN=agentmail.to
```

### 4. Start Development Server

```bash
npm run dev
```

## Usage

1. Open the app in your browser
2. Send messages to chat with the AI agent
3. Click "Show Email" to access email features
4. Create an inbox to get a unique email address
5. Send emails or receive emails at your inbox address

## Project Structure

```
convex/
  schema.ts          # Database schema for threads, messages, inboxes
  agent.ts           # OpenAI agent integration
  messages.ts        # Chat queries and mutations
  mail.ts            # AgentMail actions
  http.ts            # Webhook for inbound emails

src/
  components/
    Chat.tsx         # Main chat interface
    Composer.tsx     # Message input
    EmailPanel.tsx   # Email send/receive UI
  App.tsx            # Root component
  main.tsx           # Entry point
```

## How It Works

### Chat Flow
1. User sends message via Composer
2. Message saved to Convex database
3. Agent reply scheduled via internal action
4. OpenAI generates response based on thread context
5. Agent message appended to thread
6. UI updates in realtime via Convex subscriptions

### Email Flow
1. User creates inbox via AgentMail API
2. Inbox mapping stored in Convex
3. Outbound: Send email via AgentMail client
4. Inbound: AgentMail webhook posts to `/agentmail/webhook`
5. Email content appended to thread as message
6. UI shows email in chat timeline

## Development

```bash
# Run Convex dev server
npm run convex

# Run Vite dev server
npm run dev

# Build for production
npm run build
```

## Environment Variables

### Required
- `VITE_CONVEX_URL`: Your Convex deployment URL
- `OPENAI_API_KEY`: OpenAI API key for agent responses
- `AGENTMAIL_API_KEY`: AgentMail API key for email

### Optional
- `AGENTMAIL_DOMAIN`: Custom domain for email addresses (default: agentmail.to)

## Notes

- No authentication required for demo purposes
- Single thread created per session
- Email webhook requires public URL for production
- Use ngrok or similar for local webhook testing

# convex-agentmail-hackathon-demo

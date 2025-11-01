# Convex AgentMail Chat Demo

A production-ready real-time chat application demonstrating Convex realtime backend, OpenAI AI agent responses, and AgentMail email integration.

## Features

- Real-time chat with AI agent powered by OpenAI GPT-4o-mini
- Email integration via AgentMail for sending and receiving emails
- Clean tan themed UI based on professional design system
- Type-safe throughout with Convex validators and TypeScript
- Production ready with Netlify deployment configuration
- Responsive design for mobile and desktop

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Convex | Backend, database, realtime subscriptions |
| OpenAI | AI agent responses via GPT-4o-mini |
| AgentMail | Email infrastructure for agents |
| React 19 | UI framework |
| React Router | Client-side routing |
| Vite | Build tool and dev server |
| TypeScript | Type safety throughout |

## Quick Start

### Prerequisites

- Node.js 18+
- [OpenAI API key](https://platform.openai.com/api-keys)
- [AgentMail API key](https://agentmail.to)

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR-USERNAME/hackdemo-test2.git
cd hackdemo-test2

# Install dependencies
npm install

# Start Convex dev server (in one terminal)
npx convex dev

# Start Vite dev server (in another terminal)
npm run dev
```

### Environment Variables

**Local** (`.env.local`):
```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

**Convex Dashboard** (`npx convex dashboard` → Settings → Environment Variables):
```
OPENAI_API_KEY=your_openai_api_key
AGENTMAIL_API_KEY=your_agentmail_api_key
AGENTMAIL_DOMAIN=agentmail.to
```

## Documentation

Visit [/docs](/docs) in the app for comprehensive documentation including:

- Getting started guide
- Setup in Cursor IDE
- Fork and clone instructions
- Convex features explained
- AgentMail features explained
- How it works (detailed flows)
- Architecture overview
- Deployment to Netlify
- Troubleshooting guide

## Project Structure

```
convex/
  schema.ts          # Database tables and indexes
  agent.ts           # OpenAI action
  agentQueries.ts    # Agent queries/mutations
  messages.ts        # Message CRUD
  mail.ts            # AgentMail actions
  mailQueries.ts     # Mail queries/mutations
  http.ts            # Webhook endpoint

src/
  components/
    Chat.tsx         # Main chat interface
    Composer.tsx     # Message input
    EmailPanel.tsx   # Email UI
    Docs.tsx         # Documentation page
    Changelog.tsx    # Version history
  App.tsx            # Root with routing
  main.tsx           # Entry point
```

## How It Works

### Chat Flow
1. User sends message → saved to Convex database
2. Mutation schedules AI agent reply
3. OpenAI generates response with conversation context
4. Response saved and UI updates in realtime

### Email Flow
1. User creates AgentMail inbox for thread
2. Send emails via AgentMail API
3. Receive emails via webhook at `/agentmail/webhook`
4. All emails appear in chat timeline

## Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository in Netlify
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variable: `VITE_CONVEX_URL`
4. Deploy!

The included `netlify.toml` handles SPA routing automatically.

### Deploy Convex Backend

```bash
# Deploy to production
npx convex deploy

# Set production environment variables
npx convex env set OPENAI_API_KEY your_key --prod
npx convex env set AGENTMAIL_API_KEY your_key --prod
```

### Configure AgentMail Webhook

In AgentMail dashboard, set webhook URL:
```
https://your-deployment.convex.site/agentmail/webhook
```

## Tan Theme

Color palette from professional design system:

| Element | Color |
|---------|-------|
| Primary Background | #faf8f5 |
| Secondary Background | #f5f3f0 |
| Interactive Accent | #EB5601 (orange) |
| Text Primary | #1a1a1a |
| Text Secondary | #6b6b6b |
| Border | #e6e4e1 |

## Development

```bash
# Run Convex dev server
npx convex dev

# Run Vite dev server  
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# View Convex logs
npx convex logs

# Open Convex dashboard
npx convex dashboard
```

## Troubleshooting

### Page Not Found on Netlify
**Solution**: Ensure `netlify.toml` exists with redirect rule (included in project)

### Convex Functions Not Found
**Solution**: Run `npx convex dev` and check `VITE_CONVEX_URL` in `.env.local`

### OpenAI Errors
**Solution**: Verify `OPENAI_API_KEY` in Convex dashboard, check OpenAI credits

### Email Not Received
**Solution**: Configure webhook URL in AgentMail dashboard, check Convex logs

## Learn More

- [Convex Documentation](https://docs.convex.dev)
- [AgentMail Documentation](https://agentmail.to/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [View Changelog](/changelog)

## License

MIT

## Acknowledgments

Built with:
- [Convex](https://convex.dev) - Realtime backend
- [AgentMail](https://agentmail.to) - Email for agents
- [OpenAI](https://openai.com) - AI capabilities

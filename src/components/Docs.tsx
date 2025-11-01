import { Link } from "react-router-dom";
import "./Docs.css";

function Docs() {
  return (
    <div className="docs-container">
      <div className="docs-sidebar">
        <h2>Documentation</h2>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#getting-started">Getting Started</a>
          <a href="#setup-cursor">Setup in Cursor</a>
          <a href="#fork-clone">Fork & Clone</a>
          <a href="#convex-features">Convex Features</a>
          <a href="#agentmail-features">AgentMail Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#architecture">Architecture</a>
          <a href="#deployment">Deployment</a>
          <a href="#troubleshooting">Troubleshooting</a>
        </nav>
        <div className="sidebar-links">
          <Link to="/" className="back-link">← Home</Link>
          <Link to="/changelog" className="changelog-link">Changelog</Link>
        </div>
      </div>

      <div className="docs-content">
        <h1>Convex AgentMail Chat Documentation</h1>

        <section id="overview">
          <h2>Overview</h2>
          <p>
            This is a real-time chat application that demonstrates the power of combining
            <strong> Convex</strong> (realtime backend), <strong>OpenAI</strong> (AI agent),
            and <strong>AgentMail</strong> (email infrastructure for agents).
          </p>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>🔄 Real-time Chat</h3>
              <p>Instant message sync with Convex subscriptions</p>
            </div>
            <div className="feature-card">
              <h3>🤖 AI Agent</h3>
              <p>GPT-4o-mini powered responses</p>
            </div>
            <div className="feature-card">
              <h3>📧 Email Integration</h3>
              <p>Send and receive emails via AgentMail</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Clean UI</h3>
              <p>Tan themed, production-ready interface</p>
            </div>
          </div>
        </section>

        <section id="getting-started">
          <h2>Getting Started</h2>
          <h3>Prerequisites</h3>
          <ul>
            <li>Node.js 18+ installed</li>
            <li>npm or yarn package manager</li>
            <li>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener">
                OpenAI API key
              </a>
            </li>
            <li>
              <a href="https://agentmail.to" target="_blank" rel="noopener">
                AgentMail API key
              </a>
            </li>
          </ul>

          <h3>Quick Start</h3>
          <div className="code-block">
            <pre>{`# 1. Install dependencies
npm install

# 2. Start Convex dev server
npx convex dev

# 3. Set environment variables (see below)

# 4. Start Vite dev server
npm run dev`}</pre>
          </div>
        </section>

        <section id="setup-cursor">
          <h2>Setup in Cursor</h2>
          <p>
            Cursor is an AI-powered code editor. Here's how to set up this project in Cursor:
          </p>
          <ol>
            <li>
              <strong>Open Cursor</strong> and select "Open Folder"
            </li>
            <li>Navigate to your cloned repository</li>
            <li>
              <strong>Install Dependencies:</strong> Open terminal (Cmd/Ctrl + `) and run:
              <div className="code-block">
                <pre>npm install</pre>
              </div>
            </li>
            <li>
              <strong>Initialize Convex:</strong> Run in terminal:
              <div className="code-block">
                <pre>npx convex dev</pre>
              </div>
              This will prompt you to login and create a project.
            </li>
            <li>
              <strong>Set Environment Variables:</strong>
              <ul>
                <li>
                  Create <code>.env.local</code> file in root directory
                </li>
                <li>
                  Add <code>VITE_CONVEX_URL=your-convex-url</code>
                </li>
                <li>
                  Open Convex dashboard: <code>npx convex dashboard</code>
                </li>
                <li>Go to Settings → Environment Variables</li>
                <li>
                  Add <code>OPENAI_API_KEY</code> and <code>AGENTMAIL_API_KEY</code>
                </li>
              </ul>
            </li>
            <li>
              <strong>Start Dev Server:</strong> In a new terminal:
              <div className="code-block">
                <pre>npm run dev</pre>
              </div>
            </li>
          </ol>
        </section>

        <section id="fork-clone">
          <h2>Fork & Clone Repository</h2>
          <h3>Fork on GitHub</h3>
          <ol>
            <li>Visit the repository on GitHub</li>
            <li>Click the "Fork" button in the top right</li>
            <li>Select your account as the destination</li>
          </ol>

          <h3>Clone Your Fork</h3>
          <div className="code-block">
            <pre>{`# Clone via HTTPS
git clone https://github.com/YOUR-USERNAME/hackdemo-test2.git

# Or via SSH
git clone git@github.com:YOUR-USERNAME/hackdemo-test2.git

# Navigate into directory
cd hackdemo-test2

# Install dependencies
npm install`}</pre>
          </div>

          <h3>Keep Your Fork Updated</h3>
          <div className="code-block">
            <pre>{`# Add upstream remote
git remote add upstream https://github.com/ORIGINAL-OWNER/hackdemo-test2.git

# Fetch upstream changes
git fetch upstream

# Merge upstream changes
git merge upstream/main`}</pre>
          </div>
        </section>

        <section id="convex-features">
          <h2>Convex Features Used</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Realtime Subscriptions</h3>
              <p>
                Messages appear instantly using <code>useQuery</code> hook. No polling, no
                websockets to manage - Convex handles it all.
              </p>
              <div className="code-block">
                <pre>{`const messages = useQuery(api.messages.listMessages, { threadId });`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Type-Safe Functions</h3>
              <p>
                All Convex functions use validators for arguments and return values,
                ensuring end-to-end type safety.
              </p>
              <div className="code-block">
                <pre>{`export const sendUserMessage = mutation({
  args: {
    threadId: v.id("threads"),
    content: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    // Implementation
  },
});`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Scheduled Functions</h3>
              <p>
                After a user sends a message, we schedule the AI agent to respond using{" "}
                <code>ctx.scheduler</code>.
              </p>
              <div className="code-block">
                <pre>{`await ctx.scheduler.runAfter(0, internal.agent.generateAgentReply, {
  threadId: args.threadId,
});`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Actions for External APIs</h3>
              <p>
                Actions run in Node.js and can call external APIs like OpenAI and AgentMail.
                They're marked with <code>"use node"</code>.
              </p>
              <div className="code-block">
                <pre>{`"use node";

export const generateAgentReply = internalAction({
  handler: async (ctx, args) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Call OpenAI API
  },
});`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>HTTP Endpoints</h3>
              <p>
                Convex HTTP routes handle AgentMail webhooks for inbound emails.
              </p>
              <div className="code-block">
                <pre>{`http.route({
  path: "/agentmail/webhook",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    // Handle webhook
  }),
});`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Database with Indexes</h3>
              <p>
                Fast queries using indexes. Messages are indexed by thread for efficient lookup.
              </p>
              <div className="code-block">
                <pre>{`messages: defineTable({
  threadId: v.id("threads"),
  role: v.union(v.literal("user"), v.literal("assistant")),
  content: v.string(),
}).index("by_thread", ["threadId"])`}</pre>
              </div>
            </div>
          </div>
        </section>

        <section id="agentmail-features">
          <h2>AgentMail Features Used</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Inbox Creation</h3>
              <p>
                Create unique email addresses for each chat thread programmatically.
              </p>
              <div className="code-block">
                <pre>{`const inbox = await client.inboxes.create({
  username: "thread-abc123",
  domain: "agentmail.to",
});
// Result: thread-abc123@agentmail.to`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Send Emails</h3>
              <p>Send emails from your agent's inbox using the AgentMail API.</p>
              <div className="code-block">
                <pre>{`await client.inboxes.messages.send(inboxId, {
  to: "recipient@example.com",
  subject: "Hello from AI Agent",
  text: "This is an automated message",
});`}</pre>
              </div>
            </div>

            <div className="feature-item">
              <h3>Receive Emails via Webhook</h3>
              <p>
                AgentMail POSTs to your webhook when emails arrive. Configure in AgentMail
                dashboard.
              </p>
              <div className="code-block">
                <pre>{`// Webhook URL: https://your-app.convex.site/agentmail/webhook

{
  "inbox_id": "inbox_abc123",
  "message": {
    "from": "sender@example.com",
    "subject": "Reply",
    "text": "Email content"
  }
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works">
          <h2>How It Works</h2>
          
          <h3>Chat Flow</h3>
          <ol className="flow-steps">
            <li>User types message in <code>Composer</code> component</li>
            <li>
              <code>sendUserMessage</code> mutation saves message to Convex database
            </li>
            <li>
              Mutation schedules <code>generateAgentReply</code> action
            </li>
            <li>Action loads recent messages for context</li>
            <li>OpenAI generates response based on conversation history</li>
            <li>
              Response saved to database via <code>appendAgentMessage</code>
            </li>
            <li>
              UI updates instantly via Convex realtime subscription
            </li>
          </ol>

          <h3>Email Send Flow</h3>
          <ol className="flow-steps">
            <li>User clicks "Create Inbox" (first time only)</li>
            <li>
              <code>createInbox</code> action calls AgentMail API
            </li>
            <li>Inbox mapping stored in Convex database</li>
            <li>User fills out email form and clicks send</li>
            <li>
              <code>sendEmail</code> action calls AgentMail send API
            </li>
            <li>Email recorded in messages table with role "email"</li>
            <li>UI shows sent email in chat timeline</li>
          </ol>

          <h3>Email Receive Flow</h3>
          <ol className="flow-steps">
            <li>Someone sends email to your inbox address</li>
            <li>AgentMail POSTs webhook to <code>/agentmail/webhook</code></li>
            <li>HTTP action looks up thread by inbox ID</li>
            <li>Email content appended to thread messages</li>
            <li>UI updates in realtime showing received email</li>
          </ol>
        </section>

        <section id="architecture">
          <h2>Architecture</h2>
          <h3>File Structure</h3>
          <div className="code-block">
            <pre>{`convex/
  schema.ts          # Database tables and indexes
  agent.ts           # OpenAI action (Node.js)
  agentQueries.ts    # Agent queries/mutations
  messages.ts        # Message CRUD functions
  mail.ts            # AgentMail actions (Node.js)
  mailQueries.ts     # Mail queries/mutations
  http.ts            # Webhook endpoint

src/
  components/
    Chat.tsx         # Main chat interface
    Composer.tsx     # Message input component
    EmailPanel.tsx   # Email UI
    Docs.tsx         # This page
    Changelog.tsx    # Version history
  App.tsx            # Root with routing
  main.tsx           # React entry point`}</pre>
          </div>

          <h3>Data Model</h3>
          <div className="code-block">
            <pre>{`threads
├─ _id: Id<"threads">
└─ name?: string

messages
├─ _id: Id<"messages">
├─ threadId: Id<"threads">
├─ role: "user" | "assistant" | "email"
├─ content: string
├─ from?: string (for emails)
├─ to?: string (for emails)
└─ subject?: string (for emails)

mail_inboxes
├─ _id: Id<"mail_inboxes">
├─ threadId: Id<"threads">
├─ inboxId: string
├─ emailAddress: string
├─ username: string
└─ domain: string`}</pre>
          </div>
        </section>

        <section id="deployment">
          <h2>Deployment to Netlify</h2>
          
          <h3>Build Configuration</h3>
          <p>
            The project includes a <code>netlify.toml</code> file with proper configuration:
          </p>
          <div className="code-block">
            <pre>{`[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`}</pre>
          </div>

          <h3>Deploy Steps</h3>
          <ol>
            <li>Push your code to GitHub</li>
            <li>
              Go to <a href="https://netlify.com" target="_blank" rel="noopener">Netlify</a> and
              sign in
            </li>
            <li>Click "Add new site" → "Import an existing project"</li>
            <li>Connect your GitHub repository</li>
            <li>
              Configure build settings:
              <ul>
                <li>Build command: <code>npm run build</code></li>
                <li>Publish directory: <code>dist</code></li>
              </ul>
            </li>
            <li>
              Add environment variable:
              <ul>
                <li>
                  <code>VITE_CONVEX_URL</code> = your production Convex URL
                </li>
              </ul>
            </li>
            <li>Click "Deploy site"</li>
          </ol>

          <h3>Deploy Convex Backend</h3>
          <div className="code-block">
            <pre>{`# Deploy to production
npx convex deploy

# Set production environment variables
npx convex env set OPENAI_API_KEY your_key --prod
npx convex env set AGENTMAIL_API_KEY your_key --prod`}</pre>
          </div>

          <h3>Configure AgentMail Webhook</h3>
          <ol>
            <li>Get your Convex HTTP endpoint from dashboard</li>
            <li>In AgentMail dashboard, set webhook URL to:</li>
            <div className="code-block">
              <pre>https://your-deployment.convex.site/agentmail/webhook</pre>
            </div>
          </ol>
        </section>

        <section id="troubleshooting">
          <h2>Troubleshooting</h2>
          
          <div className="troubleshooting-item">
            <h3>Page Not Found on Netlify</h3>
            <p><strong>Problem:</strong> Routes like <code>/docs</code> show 404 after deploy.</p>
            <p>
              <strong>Solution:</strong> Ensure <code>netlify.toml</code> has redirect rule (included in project).
              This tells Netlify to serve <code>index.html</code> for all routes, allowing React Router to handle routing.
            </p>
          </div>

          <div className="troubleshooting-item">
            <h3>Convex Functions Not Found</h3>
            <p><strong>Problem:</strong> "Function not found" errors in console.</p>
            <p>
              <strong>Solution:</strong> Make sure <code>npx convex dev</code> is running. Check that
              <code>VITE_CONVEX_URL</code> in <code>.env.local</code> matches your Convex deployment URL.
            </p>
          </div>

          <div className="troubleshooting-item">
            <h3>OpenAI API Errors</h3>
            <p><strong>Problem:</strong> Agent doesn't respond, OpenAI errors in logs.</p>
            <p>
              <strong>Solution:</strong> Verify <code>OPENAI_API_KEY</code> is set correctly in Convex dashboard
              (Settings → Environment Variables). Check your OpenAI account has available credits.
            </p>
          </div>

          <div className="troubleshooting-item">
            <h3>AgentMail Inbox Creation Fails</h3>
            <p><strong>Problem:</strong> Error when clicking "Create Inbox".</p>
            <p>
              <strong>Solution:</strong> Verify <code>AGENTMAIL_API_KEY</code> is set in Convex dashboard.
              Check AgentMail account is active. View Convex logs: <code>npx convex logs</code>
            </p>
          </div>

          <div className="troubleshooting-item">
            <h3>Emails Not Being Received</h3>
            <p><strong>Problem:</strong> Sent emails don't appear in chat.</p>
            <p>
              <strong>Solution:</strong>
              <ul>
                <li>Verify webhook URL is configured in AgentMail dashboard</li>
                <li>Ensure URL is publicly accessible (use production Convex URL)</li>
                <li>Check Convex logs for webhook errors</li>
                <li>Test webhook manually with curl or Postman</li>
              </ul>
            </p>
          </div>

          <div className="troubleshooting-item">
            <h3>TypeScript Errors</h3>
            <p><strong>Problem:</strong> Build fails with TypeScript errors.</p>
            <p>
              <strong>Solution:</strong> Run <code>npx convex dev</code> to regenerate types.
              Ensure all Convex functions have proper validators. Check that imports from
              <code>convex/_generated</code> are correct.
            </p>
          </div>
        </section>

        <div className="docs-footer">
          <p>
            View <Link to="/changelog">Changelog</Link> for recent updates
          </p>
          <p>
            Powered by{" "}
            <a href="https://convex.dev" target="_blank" rel="noopener noreferrer">
              Convex
            </a>
            {" "}&middot;{" "}
            <a 
              href="https://github.com/waynesutton/convex-agentmail-hackathon-demo" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Open Source on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Docs;


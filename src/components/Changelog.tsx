import { Link } from "react-router-dom";
import { Plus, Wrench, Package, Mail, FileText, Palette, Rocket, Settings } from "lucide-react";
import "./Changelog.css";

function Changelog() {
  return (
    <div className="changelog-container">
      <div className="changelog-header">
        <Link to="/" className="back-link">← Back to Chat</Link>
        <h1>Changelog</h1>
        <p className="subtitle">All notable changes to this project</p>
      </div>

      <div className="changelog-content">
        <div className="version-block">
          <div className="version-header">
            <h2>v1.0.0</h2>
            <span className="date">2025-01-01</span>
          </div>
          <div className="changes">
            <h3>
              <Plus size={18} className="section-icon" />
              Added
            </h3>
            <ul>
              <li>Real-time chat interface with AI agent powered by OpenAI GPT-4o-mini</li>
              <li>AgentMail integration for sending and receiving emails</li>
              <li>Convex backend with realtime subscriptions</li>
              <li>Clean tan themed UI based on design system</li>
              <li>Message composer with real-time updates</li>
              <li>Email panel for inbox creation and email sending</li>
              <li>HTTP webhook endpoint for inbound emails</li>
              <li>Comprehensive documentation page at <code>/docs</code></li>
              <li>Changelog page at <code>/changelog</code></li>
              <li>Type-safe Convex functions with validators</li>
              <li>Scheduled actions for AI responses</li>
              <li>Database schema with proper indexes</li>
              <li>Netlify deployment configuration</li>
              <li>SPA routing support for Netlify</li>
            </ul>

            <h3>
              <Wrench size={18} className="section-icon" />
              Technical
            </h3>
            <ul>
              <li>React 18 with TypeScript</li>
              <li>Vite for build tooling</li>
              <li>Convex for backend and realtime data</li>
              <li>OpenAI API integration via actions</li>
              <li>AgentMail SDK for email functionality</li>
              <li>React Router for client-side routing</li>
              <li>CSS variables for theming</li>
              <li>Separated Node.js actions from queries/mutations</li>
            </ul>

            <h3>
              <Package size={18} className="section-icon" />
              Convex Features
            </h3>
            <ul>
              <li>Realtime subscriptions with <code>useQuery</code></li>
              <li>Mutations for data updates</li>
              <li>Actions for external API calls (OpenAI, AgentMail)</li>
              <li>Scheduled functions with <code>ctx.scheduler</code></li>
              <li>HTTP routes for webhooks</li>
              <li>Internal functions for security</li>
              <li>Database indexes for performance</li>
            </ul>

            <h3>
              <Mail size={18} className="section-icon" />
              AgentMail Features
            </h3>
            <ul>
              <li>Programmatic inbox creation</li>
              <li>Email sending from agent inboxes</li>
              <li>Webhook integration for receiving emails</li>
              <li>Inbox mapping per chat thread</li>
            </ul>

            <h3>
              <FileText size={18} className="section-icon" />
              Documentation
            </h3>
            <ul>
              <li>Comprehensive README with setup instructions</li>
              <li>Detailed documentation page with:
                <ul>
                  <li>Getting started guide</li>
                  <li>Cursor setup instructions</li>
                  <li>Fork and clone guide</li>
                  <li>Convex features explanation</li>
                  <li>AgentMail features explanation</li>
                  <li>Architecture overview</li>
                  <li>Deployment guide for Netlify</li>
                  <li>Troubleshooting section</li>
                </ul>
              </li>
              <li>Project summary document</li>
              <li>Setup guide</li>
              <li>Files reference (files.md)</li>
            </ul>

            <h3>
              <Palette size={18} className="section-icon" />
              UI/UX
            </h3>
            <ul>
              <li>Tan color theme (#faf8f5, #EB5601, #1a1a1a)</li>
              <li>Responsive layout for mobile and desktop</li>
              <li>Clean message display with role indicators</li>
              <li>Email metadata display (from, to, subject)</li>
              <li>Loading states for async operations</li>
              <li>Disabled states for form validation</li>
              <li>Hover and focus states throughout</li>
            </ul>
          </div>
        </div>

        <div className="version-block">
          <div className="version-header">
            <h2>Future Plans</h2>
          </div>
          <div className="changes">
            <h3>
              <Rocket size={18} className="section-icon" />
              Planned Features
            </h3>
            <ul>
              <li>User authentication with Clerk or Convex Auth</li>
              <li>Multiple threads per user</li>
              <li>Message editing and deletion</li>
              <li>File attachments in emails</li>
              <li>Email threading and reply chains</li>
              <li>Search functionality across messages</li>
              <li>User profiles and settings</li>
              <li>Dark mode toggle</li>
              <li>Export chat history</li>
              <li>Custom AI agent instructions</li>
            </ul>

            <h3>
              <Settings size={18} className="section-icon" />
              Planned Improvements
            </h3>
            <ul>
              <li>Pagination for message history</li>
              <li>Rate limiting for API calls</li>
              <li>Better error handling and user feedback</li>
              <li>Offline support with service workers</li>
              <li>Progressive Web App (PWA) features</li>
              <li>Analytics integration</li>
              <li>Performance monitoring</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="changelog-footer">
        <p>
          This project follows{" "}
          <a href="https://keepachangelog.com/en/1.0.0/" target="_blank" rel="noopener noreferrer">
            Keep a Changelog
          </a>
        </p>
        <p>
          <Link to="/docs">Documentation</Link> &middot; <Link to="/">Home</Link>
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
  );
}

export default Changelog;


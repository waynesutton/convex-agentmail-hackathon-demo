# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-01-01

### Fixed
- **TypeScript Build Errors** - Added missing @types/node dependency
  - Added `@types/node` ^22.10.5 to devDependencies
  - Resolved process.env errors in Convex actions
  - Fixed 4 TypeScript errors in `convex/agent.ts` and `convex/mail.ts`
  - Netlify deployment now builds successfully
  - All Node.js actions properly typed for production builds

### Changed
- Updated build configuration to include Node.js type definitions
- Improved TypeScript strictness across Convex backend files

## [1.1.0] - 2025-01-01

### Added
- **Send Chat to Email** feature - Export entire conversation via email
  - New "Send Chat to Email" button in chat interface
  - Email input form with validation
  - Formatted transcript generation with timestamps
  - Includes all messages: user, AI agent, and emails
  - Success/error feedback messages
  - Auto-dismiss after successful send
- New Convex function: `getChatTranscript` query for formatting chat history
- New Convex action: `sendChatTranscript` for emailing transcripts
- `SendChatEmail` React component with Lucide Mail icon
- Email validation and error handling
- Animated success/error messages

### Changed
- Chat interface now includes export button above messages
- Updated documentation to include chat export feature
- Enhanced `convex/messages.ts` with transcript formatting
- Enhanced `convex/mail.ts` with transcript email action

## [1.0.0] - 2025-01-01

### Added

#### Core Features
- Real-time chat interface with AI agent powered by OpenAI GPT-4o-mini
- AgentMail integration for sending and receiving emails within chat threads
- Convex backend with realtime subscriptions for instant message updates
- Anonymous chat sessions with no authentication required
- Message composer with real-time validation and disabled states
- Email panel for inbox creation and email sending
- HTTP webhook endpoint for inbound emails at `/agentmail/webhook`
- Type-safe Convex functions with validators throughout

#### UI/UX
- Clean tan themed design system (#faf8f5, #EB5601, #1a1a1a)
- Responsive layout for mobile and desktop
- Navigation header with Documentation and Home links
- Footer with Convex branding and GitHub open source link
- Message display with role indicators (user, assistant, email)
- Email metadata display (from, to, subject)
- Loading states for async operations
- Hover and focus states throughout interface

#### Documentation
- Comprehensive `/docs` page with:
  - Getting started guide
  - Cursor IDE setup instructions
  - Fork and clone guide
  - Convex features explanation with code examples
  - AgentMail features explanation
  - Detailed flow diagrams
  - Architecture overview
  - Deployment guide for Netlify
  - Troubleshooting section
- `/changelog` page with version history
- Updated README with quick start and tech stack
- `files.md` reference for all project files
- `SETUP.md` with step-by-step instructions
- `PROJECT_SUMMARY.md` with architecture details

#### Technical Implementation
- React 19 with TypeScript for type safety
- React Router v7 for client-side routing
- Vite for fast build tooling
- Convex realtime database with indexes
- OpenAI API integration via Convex actions
- AgentMail SDK for email functionality
- Netlify deployment configuration with SPA routing
- Separated Node.js actions from queries/mutations
- Scheduled functions for AI responses
- Database schema with proper indexes for performance

#### Convex Features Used
- Realtime subscriptions with `useQuery` hook
- Type-safe mutations for data updates
- Actions for external API calls (OpenAI, AgentMail)
- Scheduled functions with `ctx.scheduler`
- HTTP routes for webhooks
- Internal functions for security
- Database with `by_thread` and `by_inbox_id` indexes

#### AgentMail Features Used
- Programmatic inbox creation per thread
- Email sending from agent inboxes
- Webhook integration for receiving emails
- Inbox-to-thread mapping storage

### Technical Details

#### Database Schema
- `threads` table for chat containers
- `messages` table with role-based messages (user, assistant, email)
- `mail_inboxes` table for AgentMail inbox mappings
- Indexes: `by_thread` on messages, `by_thread` and `by_inbox_id` on mail_inboxes

#### File Structure
```
convex/
  schema.ts, agent.ts, agentQueries.ts
  messages.ts, mail.ts, mailQueries.ts, http.ts
src/
  components/ (Chat, Composer, EmailPanel, Docs, Changelog)
  App.tsx, main.tsx, index.css
netlify.toml, package.json, tsconfig.json
```

### Dependencies

#### Production
- `@convex-dev/agent` ^0.2.12
- `agentmail` ^0.1.4
- `convex` ^1.28.0
- `openai` ^6.7.0
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `react-router-dom` ^7.9.5

#### Development
- `@types/react` ^19.2.2
- `@types/react-dom` ^19.2.2
- `@vitejs/plugin-react` ^4.3.4
- `typescript` ^5.7.3
- `vite` ^6.0.7

## Future Plans

### Planned Features
- [ ] User authentication with Clerk or Convex Auth
- [ ] Multiple threads per user
- [ ] Message editing and deletion
- [ ] File attachments in emails
- [ ] Email threading and reply chains
- [ ] Search functionality across messages
- [ ] User profiles and settings
- [ ] Dark mode toggle
- [ ] Export chat history
- [ ] Custom AI agent instructions per thread

### Planned Improvements
- [ ] Pagination for message history
- [ ] Rate limiting for API calls
- [ ] Better error handling and user feedback
- [ ] Offline support with service workers
- [ ] Progressive Web App (PWA) features
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Internationalization (i18n)
- [ ] Accessibility (a11y) improvements
- [ ] E2E testing with Playwright

### Planned Optimizations
- [ ] Code splitting for faster initial load
- [ ] Image optimization for assets
- [ ] Lazy loading for routes
- [ ] Caching strategies
- [ ] Bundle size reduction

---

[1.1.1]: https://github.com/waynesutton/convex-agentmail-hackathon-demo/releases/tag/v1.1.1
[1.1.0]: https://github.com/waynesutton/convex-agentmail-hackathon-demo/releases/tag/v1.1.0
[1.0.0]: https://github.com/waynesutton/convex-agentmail-hackathon-demo/releases/tag/v1.0.0


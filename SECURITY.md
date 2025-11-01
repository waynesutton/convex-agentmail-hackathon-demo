# Security Checklist

This document ensures no sensitive information is exposed when pushing to GitHub.

## Status: ✅ SECURE

All sensitive data is properly protected and not committed to the repository.

## Protected Files

### Environment Variables (Git Ignored)

✅ `.env.local` - Contains `VITE_CONVEX_URL` (frontend env var)
- Status: **Properly ignored by .gitignore**
- Should NEVER be committed to git
- Each developer/deployment needs their own copy

✅ `.env`, `.env.production.local`, `.env.development.local`, `.env.test.local`
- Status: **Properly ignored by .gitignore**
- Safe to create locally, will not be committed

### Convex Files (Git Ignored)

✅ `.convex/` - Contains local Convex state
- Status: **Properly ignored by .gitignore**

✅ `convex/_generated/` - Auto-generated TypeScript types
- Status: **Properly ignored by .gitignore**
- Regenerated on each build

## Where API Keys Are Used (Securely)

### Backend (Convex) - Server-Side Only

✅ `convex/agent.ts` - Uses `process.env.OPENAI_API_KEY`
- Runs server-side only
- Never exposed to client
- Set via Convex dashboard

✅ `convex/mail.ts` - Uses `process.env.AGENTMAIL_API_KEY`
- Runs server-side only
- Never exposed to client  
- Set via Convex dashboard

### Frontend - Public URL Only

✅ Frontend only uses `VITE_CONVEX_URL`
- This is a PUBLIC URL, safe to expose
- No API keys in frontend code
- Convex handles authentication server-side

## Documentation References (Safe)

✅ All documentation files (README.md, SETUP.md, etc.) only show:
- Placeholder text like `your_openai_api_key`
- Instructions on where to set keys
- No actual keys are present

## Git Configuration

✅ `.gitignore` properly configured with:
```
# Environment files
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Convex local state
.convex/
convex/_generated/
```

## Deployment Security

### Netlify Environment Variables

Set these in Netlify Dashboard (NOT in code):
- `VITE_CONVEX_URL` - Your production Convex URL
- `CONVEX_DEPLOY_KEY` - For deploying Convex backend

### Convex Environment Variables

Set these in Convex Dashboard (NOT in code):
- `OPENAI_API_KEY` - Your OpenAI API key
- `AGENTMAIL_API_KEY` - Your AgentMail API key
- `AGENTMAIL_DOMAIN` - Optional custom domain

## Security Best Practices

### ✅ What IS Committed (Safe)

- Source code (`.ts`, `.tsx`, `.css` files)
- Configuration files (`package.json`, `tsconfig.json`, `vite.config.ts`)
- Convex schema and function definitions
- Documentation files
- `.gitignore` file itself

### ❌ What IS NOT Committed (Sensitive)

- `.env.local` or any `.env` files
- `node_modules/` directory
- `.convex/` directory
- `convex/_generated/` directory
- Build output (`dist/`)
- Any files with actual API keys

## Verification Commands

Check if files are properly ignored:

```bash
# Verify .env.local is ignored
git check-ignore .env.local

# Check git status (should not show env files)
git status

# See what would be committed
git add --dry-run .
```

## If You Accidentally Commit Keys

1. **Immediately rotate the exposed keys:**
   - OpenAI: https://platform.openai.com/api-keys
   - AgentMail: https://agentmail.to
   - Convex: Generate new deploy key

2. **Remove from git history:**
   ```bash
   # For recent commit
   git reset --soft HEAD~1
   git reset HEAD .env.local
   git commit -m "your message"
   
   # For older commits, use git filter-branch or BFG Repo-Cleaner
   ```

3. **Update your keys:**
   - Set new keys in Convex dashboard
   - Update `.env.local` locally
   - Set new `CONVEX_DEPLOY_KEY` in Netlify

## Code Review Checklist

Before pushing to GitHub, verify:

- [ ] No `.env` files in git status
- [ ] No API keys in source code
- [ ] All environment variables use `process.env`
- [ ] `.gitignore` includes all sensitive files
- [ ] Documentation only has placeholder examples
- [ ] No hardcoded URLs with secrets in query params
- [ ] No console.log of sensitive data

## Additional Security Measures

### Convex Security

✅ **Internal Functions** - Sensitive operations use `internalAction`, `internalMutation`, `internalQuery`
- Cannot be called from frontend
- Only callable by other Convex functions

✅ **HTTP Actions** - Webhook endpoint validates incoming data
- No authentication tokens in URL
- Validates request structure

### Frontend Security

✅ **No Client-Side Secrets** - Frontend only has:
- Public Convex URL
- No API keys
- No authentication tokens

✅ **API Calls Through Convex** - All external APIs called server-side:
- OpenAI calls from `convex/agent.ts`
- AgentMail calls from `convex/mail.ts`
- Keys never reach browser

## Monitoring

Regular security checks:

- [ ] Review git history for accidentally committed secrets
- [ ] Audit environment variables in deployment platforms
- [ ] Check Convex function visibility (public vs internal)
- [ ] Monitor API usage for anomalies
- [ ] Rotate keys periodically

## Resources

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Convex Security Best Practices](https://docs.convex.dev/production/best-practices)
- [OWASP: Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**Last Updated:** 2025-01-01  
**Status:** ✅ All security measures in place


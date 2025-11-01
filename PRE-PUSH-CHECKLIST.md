# Pre-Push Security Checklist

Run this checklist before pushing to GitHub to ensure no secrets are exposed.

## Quick Security Check

Run the automated security check:
```bash
npm run security-check
```

## Manual Verification

### 1. Check Git Status
```bash
git status
```
Ensure NO `.env` files are listed.

### 2. Files That Should NOT Appear
- ❌ `.env.local`
- ❌ `.env`
- ❌ `.convex/`
- ❌ `convex/_generated/`
- ❌ `node_modules/`
- ❌ Any file with actual API keys

### 3. Files That SHOULD Appear (Safe)
- ✅ `src/` directory (all `.ts`, `.tsx`, `.css` files)
- ✅ `convex/` directory (schema and functions, NOT `_generated`)
- ✅ `package.json`, `tsconfig.json`, `vite.config.ts`
- ✅ `README.md`, `SECURITY.md`, documentation files
- ✅ `.gitignore`
- ✅ `netlify.toml`

## Where Your Keys Should Be

### Local Development
**File:** `.env.local` (git-ignored)
```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

### Convex Backend
**Location:** Convex Dashboard → Settings → Environment Variables
```
OPENAI_API_KEY=your_openai_key
AGENTMAIL_API_KEY=your_agentmail_key
AGENTMAIL_DOMAIN=agentmail.to
```

### Netlify Deployment
**Location:** Netlify Dashboard → Site Settings → Environment Variables
```
VITE_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_DEPLOY_KEY=your_convex_deploy_key
```

## Security Features Built-In

✅ **All API keys use `process.env`**
- `convex/agent.ts`: `process.env.OPENAI_API_KEY`
- `convex/mail.ts`: `process.env.AGENTMAIL_API_KEY`

✅ **Sensitive operations are internal**
- `internalAction` for OpenAI calls
- `internalQuery` for loading context
- `internalMutation` for writing data
- Cannot be called from frontend

✅ **Frontend has NO secrets**
- Only has public Convex URL
- All API calls go through Convex backend
- Keys never reach the browser

✅ **Proper .gitignore**
- All `.env` files ignored
- Convex generated files ignored
- Build output ignored

## Final Check Before Push

1. Run security check:
   ```bash
   npm run security-check
   ```

2. Review what's being committed:
   ```bash
   git diff --cached
   ```

3. Look for these patterns (should NOT exist in code):
   - Actual API keys starting with `sk-`
   - Hardcoded email addresses
   - Hardcoded tokens
   - Any string that looks like a secret

4. If everything looks good:
   ```bash
   git push origin main
   ```

## If You Find a Problem

### Accidentally Staged .env.local
```bash
git reset HEAD .env.local
```

### Accidentally Committed .env.local (not pushed yet)
```bash
git reset --soft HEAD~1
git reset HEAD .env.local
git commit -m "Your commit message"
```

### Already Pushed Secrets to GitHub
1. **IMMEDIATELY** rotate all exposed keys:
   - OpenAI: https://platform.openai.com/api-keys
   - AgentMail: Regenerate in dashboard
   - Convex: `npx convex deploy --configure-key`

2. Remove from git history:
   ```bash
   # Use BFG Repo-Cleaner or git filter-branch
   # See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
   ```

3. Force push the cleaned history (use with caution)

## Need Help?

See `SECURITY.md` for comprehensive security documentation.

## Remember

🔒 **Never commit secrets to git**  
🔒 **Always use environment variables**  
🔒 **Run security check before pushing**  
🔒 **When in doubt, don't push**


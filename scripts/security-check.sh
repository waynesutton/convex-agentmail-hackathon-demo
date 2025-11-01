#!/bin/bash

# Security Pre-Commit Check
# Run this before pushing to GitHub

echo "🔒 Running security checks..."
echo ""

# Check for .env files
echo "Checking for .env files in git..."
if git ls-files | grep -E "\.env$|\.env\."; then
    echo "❌ ERROR: .env files found in git!"
    echo "Run: git rm --cached .env.local"
    exit 1
else
    echo "✅ No .env files in git"
fi

# Check for API keys in code
echo ""
echo "Checking for hardcoded API keys..."
if grep -r "sk-" src/ convex/ --include="*.ts" --include="*.tsx" 2>/dev/null; then
    echo "❌ ERROR: Possible API key found in code!"
    exit 1
else
    echo "✅ No hardcoded API keys detected"
fi

# Check for API key patterns
echo ""
echo "Checking for common API key patterns..."
if grep -r "apiKey:\s*['\"]" src/ convex/ --include="*.ts" --include="*.tsx" | grep -v "process.env" | grep -v "apiKey: process.env"; then
    echo "❌ WARNING: Possible hardcoded API key found!"
    exit 1
else
    echo "✅ All API keys use environment variables"
fi

# Verify .gitignore
echo ""
echo "Verifying .gitignore..."
if git check-ignore .env.local > /dev/null 2>&1; then
    echo "✅ .env.local is properly ignored"
else
    echo "❌ ERROR: .env.local is NOT ignored by git!"
    exit 1
fi

if git check-ignore .convex/ > /dev/null 2>&1; then
    echo "✅ .convex/ is properly ignored"
else
    echo "❌ ERROR: .convex/ is NOT ignored by git!"
    exit 1
fi

if git check-ignore convex/_generated/ > /dev/null 2>&1; then
    echo "✅ convex/_generated/ is properly ignored"
else
    echo "❌ ERROR: convex/_generated/ is NOT ignored by git!"
    exit 1
fi

# Check what's being committed
echo ""
echo "Files staged for commit:"
git status --short

echo ""
echo "✅ Security checks passed!"
echo "Safe to push to GitHub 🚀"


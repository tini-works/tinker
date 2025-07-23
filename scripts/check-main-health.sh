#!/bin/bash

# Main Branch Health Check Script
# This script can be run manually to check the health of the main branch

set -e

echo "🔍 Checking main branch health..."
echo "=================================="

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Warning: You're not on the main branch (currently on: $CURRENT_BRANCH)"
    echo "Switching to main branch..."
    git checkout main
    git pull origin main
fi

echo ""
echo "📦 Validating package.json..."
if cat package.json | jq . > /dev/null 2>&1; then
    echo "✅ package.json is valid JSON"
else
    echo "❌ package.json is invalid JSON!"
    exit 1
fi

echo ""
echo "📥 Installing dependencies..."
npm ci

echo ""
echo "🔨 Running build..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "🧹 Running linting..."
if npm run lint; then
    echo "✅ Linting successful"
else
    echo "❌ Linting failed!"
    exit 1
fi

echo ""
echo "💅 Checking formatting..."
if npm run format:check; then
    echo "✅ Formatting check successful"
else
    echo "❌ Formatting check failed!"
    echo "💡 Run 'npm run format' to fix formatting issues"
    exit 1
fi

echo ""
echo "🎉 Main branch is healthy!"
echo "All checks passed successfully."

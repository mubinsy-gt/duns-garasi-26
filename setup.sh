#!/bin/bash
# Installation & Run Script for DUN'S GARASI 26 Website

echo "🚀 DUN'S GARASI 26 & BODYREPAIR — Setup & Run"
echo "=============================================="
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
  echo "❌ npm install failed. Check Node.js & npm installation."
  exit 1
fi

echo "✅ Dependencies installed successfully!"
echo ""

# Step 2: Run development server
echo "🎨 Starting Frontend (Vite) on http://localhost:3000"
echo "📡 Press Ctrl+C to stop"
echo ""

npm run dev

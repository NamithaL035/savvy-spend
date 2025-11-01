<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1-yxMD8zHXM_2aMHnJ9-Qo1mdym8dj2kM

## Run Locally

**Prerequisites:**  Node.js

## Setup

1. Install dependencies:
   `npm install`
2. Install Tailwind CSS plugin for Vite:
   `npm install tailwindcss @tailwindcss/vite`
3. Create a `.env.local` in the project root and set your Gemini API key using Vite's env naming:
   `VITE_GEMINI_API_KEY=your_key_here`
4. Start the app:
   `npm run dev`

If you see a blank page, check:
- `vite.config.ts` has `base: './'` and includes the Tailwind plugin.
- `index.html` uses `./index.tsx` (relative path) and does not include external import maps/CDN.
- Browser DevTools console for 404s or module load errors.

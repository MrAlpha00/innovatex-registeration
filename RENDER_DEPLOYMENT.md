# Deploy InnovateX Portal to Render

This guide will help you deploy your InnovateX Registration & Certificate Portal to Render.

## Prerequisites
- A GitHub account (to connect your code to Render)
- A Render account (free - sign up at https://render.com)

## Steps to Deploy:

### 1. Push Your Code to GitHub
First, you need to push your Replit project to GitHub:

1. In Replit, go to the **Version Control** tab (left sidebar)
2. Click **"Create a Git Repo"** if you haven't already
3. Click **"Connect to GitHub"**
4. Follow the prompts to create a new GitHub repository
5. Push your code to GitHub

### 2. Create a New Web Service on Render

1. Go to https://render.com and sign in
2. Click **"New +"** → **"Static Site"**
3. Connect your GitHub repository (give Render permission if needed)
4. Select your `innovatex-portal` repository

### 3. Configure Your Render Deployment

Render will auto-detect the settings from `render.yaml`, but verify these settings:

- **Name**: `innovatex-portal` (or whatever you prefer)
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist/public`

### 4. Deploy!

1. Click **"Create Static Site"**
2. Render will start building your app (takes 2-5 minutes)
3. Once complete, you'll get a live URL like: `https://innovatex-portal.onrender.com`

## After Deployment

Your app will be live at the Render URL! Share it with your event participants.

### Auto-Deploy on Updates
Render will automatically redeploy whenever you push changes to GitHub.

### Custom Domain (Optional)
You can add your own domain in Render's settings:
1. Go to your service dashboard
2. Click **"Settings"** → **"Custom Domain"**
3. Follow the DNS configuration instructions

## Troubleshooting

**Build fails?**
- Check that Node.js version is compatible (Render uses Node 14+ by default)
- Verify all dependencies are in `package.json`

**404 errors on routes?**
- The `render.yaml` file includes route rewriting to handle client-side routing
- All routes will redirect to `index.html`

**Need help?**
- Check Render's build logs in the dashboard
- Contact Render support (they're very responsive!)

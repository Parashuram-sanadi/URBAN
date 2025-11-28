# Deployment Guide for Render

This guide will walk you through deploying your Urban Guide application (frontend + backend) to Render.

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com) (free tier available)
2. **MongoDB Database**: 
   - Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier available) for cloud database
   - OR use Render's MongoDB service
3. **GitHub Repository**: Your code should be in a GitHub repository

---

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure you have the following files in your repo:
   - `render.yaml` (already created)
   - `backend/.env.example` (template file)
   - `frontend/.env.example` (template file)

---

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
5. Save this connection string - you'll need it for the backend

### Option B: Render MongoDB Service

1. In Render dashboard, create a new MongoDB service
2. Copy the internal connection string provided

---

## Step 3: Deploy Backend Service

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** → **"Blueprint"**
3. **Connect your GitHub repository** that contains your code
4. **Render will detect `render.yaml`** and create services automatically

   OR manually:

1. **Click "New +"** → **"Web Service"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `urban-guide-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or upgrade for production)

4. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=<your-mongodb-connection-string>
   FRONTEND_URL=<will-update-after-frontend-deployment>
   JWT_SECRET=<generate-a-random-secure-string>
   ```

5. **Click "Create Web Service"**
6. **Wait for deployment** - this may take a few minutes
7. **Copy your backend URL** (e.g., `https://urban-guide-backend.onrender.com`)

---

## Step 4: Deploy Frontend Service

1. **Click "New +"** → **"Static Site"**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Name**: `urban-guide-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Instance Type**: Free (or upgrade for production)

4. **Add Environment Variable:**
   ```
   VITE_API_BASE_URL=<your-backend-render-url>
   ```
   Example: `VITE_API_BASE_URL=https://urban-guide-backend.onrender.com`

5. **Click "Create Static Site"**
6. **Wait for deployment** - this may take a few minutes
7. **Copy your frontend URL** (e.g., `https://urban-guide-frontend.onrender.com`)

---

## Step 5: Update Backend CORS

1. Go back to your **Backend Service** in Render
2. Go to **Environment** tab
3. Update `FRONTEND_URL` to your frontend Render URL:
   ```
   FRONTEND_URL=https://urban-guide-frontend.onrender.com
   ```
4. **Save Changes** - Render will automatically redeploy

---

## Step 6: Verify Deployment

1. **Test Backend**: Visit `https://your-backend.onrender.com/`
   - You should see: "🌆 Urban Guide API is running successfully!"

2. **Test Frontend**: Visit `https://your-frontend.onrender.com/`
   - You should see the login page
   - Try logging in to test the API connection

---

## Environment Variables Summary

### Backend (.env or Render Environment Variables)
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-frontend.onrender.com
JWT_SECRET=your-random-secure-string
```

### Frontend (Render Environment Variables)
```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

---

## Troubleshooting

### Backend Issues

1. **Build fails**:
   - Check build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Database connection fails**:
   - Verify `MONGO_URI` is correct
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Check database username and password

3. **CORS errors**:
   - Verify `FRONTEND_URL` in backend matches your actual frontend URL
   - Ensure URL doesn't have trailing slash

### Frontend Issues

1. **Build fails**:
   - Check build logs in Render dashboard
   - Verify `VITE_API_BASE_URL` is set correctly

2. **API calls fail**:
   - Check browser console for errors
   - Verify `VITE_API_BASE_URL` points to correct backend URL
   - Ensure backend is running and accessible

3. **404 errors on routes**:
   - This is normal for React Router
   - Render Static Sites need special configuration
   - Add a `_redirects` file (see below)

---

## Handling React Router on Render Static Sites

React Router requires server-side configuration. Create a file:

**File**: `frontend/public/_redirects`
**Content**:
```
/*    /index.html   200
```

This ensures all routes are handled by React Router.

---

## Custom Domains (Optional)

1. In Render dashboard, go to your service
2. Click "Settings" → "Custom Domains"
3. Add your domain and follow DNS configuration instructions

---

## Updating Your Application

1. **Push changes to GitHub**
2. **Render automatically redeploys** (if auto-deploy is enabled)
3. **Or manually deploy** from Render dashboard

---

## Cost Considerations

- **Free Tier**: 
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down may be slow (cold start)
  - Good for development/testing

- **Starter Plan** ($7/month per service):
  - Services stay always on
  - Better performance
  - Recommended for production

---

## Security Checklist

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use MongoDB Atlas with proper security settings
- [ ] Enable MongoDB IP whitelist (optional but recommended)
- [ ] Review and update CORS settings
- [ ] Don't commit `.env` files to Git
- [ ] Use environment variables for all sensitive data

---

## Support

- **Render Documentation**: https://render.com/docs
- **Render Status**: https://status.render.com
- **Community Forum**: https://community.render.com

---

## Notes

- Render free tier services may spin down after inactivity
- First request after spin-down can take 30-60 seconds
- For production, consider upgrading to paid plans
- Always test your deployment thoroughly before going live


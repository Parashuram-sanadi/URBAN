# Backend Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/urban-guide
# For MongoDB Atlas (production), use:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Frontend URL (for CORS)
# For local development, use: http://localhost:5173
# For production, use your Render frontend URL (e.g., https://your-app.onrender.com)
# You can specify multiple URLs separated by commas: http://localhost:5173,http://localhost:3000
FRONTEND_URL=http://localhost:5173

# JWT Secret (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Node Environment
NODE_ENV=development
```

## For Render Deployment

Set these environment variables in the Render dashboard for your backend service:

1. `NODE_ENV=production`
2. `PORT=10000` (or let Render auto-assign)
3. `MONGO_URI=<your-mongodb-connection-string>`
4. `FRONTEND_URL=<your-frontend-render-url>`
5. `JWT_SECRET=<generate-a-random-secure-string>`


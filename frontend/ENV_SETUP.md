# Frontend Environment Variables Setup

Create a `.env` file in the `frontend` directory with the following variables:

```env
# Backend API Base URL
# For local development, use: http://localhost:5000
# For production, use your Render backend URL (e.g., https://your-backend.onrender.com)
VITE_API_BASE_URL=http://localhost:5000
```

## For Render Deployment

Set this environment variable in the Render dashboard for your frontend service:

1. `VITE_API_BASE_URL=<your-backend-render-url>`

Example: `VITE_API_BASE_URL=https://urban-guide-backend.onrender.com`

**Note**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the client-side code.


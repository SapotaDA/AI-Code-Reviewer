# Deployment Guide for AI Code Reviewer

This guide provides step-by-step instructions for deploying the AI Code Reviewer SaaS application to production.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (Vercel)      │◄──►│   (Render)      │◄──►│  (Neon/Supabase)│
│                 │    │                 │    │                 │
│ React + Vite    │    │ Node.js + Express│    │  PostgreSQL     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Quick Deployment

### Option 1: One-Click Deployment (Recommended)

#### Frontend (Vercel)
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables:
   - `VITE_API_URL`: Your deployed backend URL
7. Click "Deploy"

#### Backend (Render)
1. Visit [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables (see Environment Variables section)
6. Click "Create Web Service"

#### Database (Neon)
1. Visit [neon.tech](https://neon.tech)
2. Create new project
3. Get connection string
4. Add to backend environment variables

---

## 📋 Detailed Deployment Steps

### 1. Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Database Setup

#### Neon (Recommended)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Run migrations:
   ```bash
   # In backend directory
   DATABASE_URL="your-neon-connection-string" npx prisma migrate deploy
   npx prisma generate
   ```

#### Supabase (Alternative)
1. Sign up at [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Run migrations as above

### 3. Backend Deployment (Render)

#### Manual Setup
1. Go to [render.com](https://render.com)
2. Sign up/Login
3. Click "New" → "Web Service"
4. Connect GitHub repository
5. Configure service:
   ```
   Name: ai-code-reviewer-api
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free (to start)
   ```

#### Environment Variables
Add these in Render dashboard:
```env
DATABASE_URL=your-neon-connection-string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
NODE_ENV=production
FRONTEND_URL=your-vercel-app-url
```

#### Health Check
After deployment, test:
```bash
curl https://your-app.onrender.com/health
```

### 4. Frontend Deployment (Vercel)

#### Manual Setup
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your repository
5. Configure:
   ```
   Project Name: ai-code-reviewer
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

#### Environment Variables
```env
VITE_API_URL=https://your-app.onrender.com/api
VITE_APP_NAME=AI Code Reviewer
VITE_APP_VERSION=1.0.0
```

#### Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS in backend

### 5. Post-Deployment Configuration

#### Update CORS
In `backend/server.js`, update origin:
```javascript
cors({
  origin: process.env.FRONTEND_URL || 'https://your-domain.com',
  credentials: true,
})
```

#### SSL Certificates
- Vercel provides automatic SSL
- Render provides automatic SSL
- Custom domains need manual SSL setup

---

## 🔧 Environment Variables

### Production Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/db?sslmode=require"

# JWT
JWT_SECRET="your-super-secure-jwt-secret-key-256-bits-long"
JWT_EXPIRES_IN="7d"

# AI Service
GEMINI_API_KEY="your-gemini-api-key-from-google-ai-studio"

# Server
PORT=5000
NODE_ENV="production"

# Frontend
FRONTEND_URL="https://your-domain.vercel.app"
```

### Production Frontend (.env)
```env
# API Configuration
VITE_API_URL=https://your-app.onrender.com/api

# Application Configuration
VITE_APP_NAME=AI Code Reviewer
VITE_APP_VERSION=1.0.0
```

---

## 🚦 CI/CD Pipeline

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: |
          cd backend && npm install && npm test
          cd ../frontend && npm install && npm test

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Render
        run: |
          curl -X POST https://api.render.com/v1/services/srv-xxx/deploys \
            -H "Authorization: Bearer ${{ secrets.RENDER_API_KEY }}"
```

---

## 🔍 Monitoring & Logging

### Backend Monitoring
1. Enable Render logs
2. Set up error tracking (Sentry)
3. Monitor API usage

### Frontend Monitoring
1. Enable Vercel Analytics
2. Set up performance monitoring
3. Track user behavior

### Database Monitoring
1. Neon console for database metrics
2. Monitor query performance
3. Set up alerts

---

## 🔄 Scaling Considerations

### Backend Scaling
- Upgrade Render instance type
- Add load balancer
- Implement caching (Redis)
- Use CDN for static assets

### Database Scaling
- Upgrade Neon plan
- Implement connection pooling
- Add read replicas
- Optimize queries

### Frontend Scaling
- Vercel automatically scales
- Implement edge caching
- Optimize bundle size
- Use CDN for assets

---

## 🛡️ Security Best Practices

### Production Security
1. **Environment Variables**: Never commit secrets
2. **HTTPS**: Ensure all endpoints use SSL
3. **Rate Limiting**: Configure appropriate limits
4. **CORS**: Restrict to your domain
5. **JWT Security**: Use strong secrets
6. **Database Security**: Use SSL connections

### API Security
```javascript
// Additional security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
```

---

## 📊 Performance Optimization

### Backend
1. Enable gzip compression
2. Implement caching strategies
3. Optimize database queries
4. Use connection pooling

### Frontend
1. Enable code splitting
2. Optimize images
3. Use lazy loading
4. Implement service workers

---

## 🆘 Troubleshooting

### Common Issues

#### CORS Errors
```javascript
// Check backend CORS configuration
cors({
  origin: ['https://your-domain.vercel.app', 'http://localhost:3000'],
  credentials: true,
})
```

#### Database Connection
```bash
# Test connection
psql "your-connection-string" -c "SELECT 1;"
```

#### Build Failures
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Health Checks
```bash
# Backend health
curl https://your-app.onrender.com/health

# Frontend health
curl https://your-domain.vercel.app
```

---

## 📞 Support

For deployment issues:
1. Check Render and Vercel logs
2. Verify environment variables
3. Test database connection
4. Review this documentation

---

**Happy Deploying! 🚀**

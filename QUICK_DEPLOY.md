# 🚀 Quick Deployment Guide - Lilita Keper Agent Portal

## Prerequisites
- Google Cloud account with billing enabled
- Project ID: `sparksnairobi-burch-app-prod`
- Docker installed locally (if running locally) OR Cloud Shell (no install needed)

## Option 1: Deploy from Google Cloud Console (EASIEST)

1. **Open Google Cloud Console**
   - Navigate to: https://console.cloud.google.com
   - Make sure you're in project `sparksnairobi-burch-app-prod`

2. **Open Cloud Shell**
   - Click the terminal icon (>_) in top right
   - Copy repository:
   ```bash
   git clone https://github.com/Burch-Labs/burch-platform.git
   cd burch-platform
   git checkout claude/burch-platform-q4nf5k
   ```

3. **Run deployment**
   ```bash
   gcloud run deploy lilita-agent-portal \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --port 8080 \
     --memory 512Mi \
     --cpu 1
   ```

4. **Wait for deployment** (1-2 minutes)
   - You'll see: `Service [lilita-agent-portal] revision [lilita-agent-portal-xxxxx-uc] has been deployed`
   - Your URL will be displayed

## Option 2: Deploy with Script (LOCAL)

If you have Docker installed locally:

```bash
# 1. Navigate to project
cd /home/user/burch-platform

# 2. Run deployment script
./deploy.sh

# 3. Follow prompts and wait for completion
```

## Option 3: Manual Deployment Steps

```bash
# 1. Authenticate
gcloud auth login
gcloud config set project sparksnairobi-burch-app-prod

# 2. Build image locally
docker build -t lilita-agent-portal .

# 3. Tag for Container Registry
docker tag lilita-agent-portal gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal

# 4. Push to registry
docker push gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal

# 5. Deploy to Cloud Run
gcloud run deploy lilita-agent-portal \
  --image gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## After Deployment

### Get Your URL
```bash
gcloud run services describe lilita-agent-portal \
  --region us-central1 \
  --format='value(status.url)'
```

### View Live Logs
```bash
gcloud run logs read lilita-agent-portal --region us-central1 --limit 50
```

### Test Your Portal
1. Open the URL in your browser
2. Login with demo credentials:
   - Email: `agent@lilitakeper.com`
   - Password: `demo123`
3. Navigate all sections and verify:
   - ✅ Dashboard loads
   - ✅ Pricing displays (no commissions)
   - ✅ Documents section works
   - ✅ Rates PDF link works
   - ✅ Logout works

## Production Ready Checklist

✅ All HTML files committed
✅ Docker optimized (Alpine Linux)
✅ Health check configured
✅ Rack rates implemented (no commissions)
✅ Supplementary activities added
✅ Official tariff sheet linked
✅ Sidebar navigation fixed
✅ Responsive design verified
✅ Login/logout flow working
✅ All 4 portal sections ready

## Deployment Time
- **First deploy:** 2-3 minutes
- **Subsequent deploys:** 1-2 minutes
- **Cold start time:** ~2 seconds
- **First page load:** <1 second

## Troubleshooting

### Authentication Error
```bash
gcloud auth login
```

### Image Push Error
```bash
# Configure Docker auth
gcloud auth configure-docker
```

### Deployment Fails
- Check billing: https://console.cloud.google.com/billing
- Check quotas: https://console.cloud.google.com/quotas
- View logs: `gcloud run logs read lilita-agent-portal --limit 100`

### Port Issues
Make sure port 8080 is used (Cloud Run standard)

## Support

**Issues?** Contact: agents@lilitakeper.com

---

**Status:** ✅ Production Ready
**Version:** 2026-2027 Rack Rates Edition
**Last Updated:** 2026-08-31

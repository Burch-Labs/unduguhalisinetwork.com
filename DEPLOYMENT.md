# Lilita Keper Portal - Cloud Run Deployment Guide

## Automatic Deployment (GitHub Actions)

The portal automatically deploys to Google Cloud Run when you push to:
- `claude/burch-platform-q4nf5k` (feature branch)
- `main` (production)

**Workflow:** `.github/workflows/deploy-cloud-run.yml`

### Prerequisites
1. GitHub repository secrets configured:
   - `GCP_PROJECT_ID` - Your Google Cloud project ID
   - `GCP_SA_KEY` - Service account credentials JSON
   - Other secrets (RESEND_API_KEY, etc.)

2. Google Cloud Project setup:
   - Cloud Run API enabled
   - Container Registry enabled
   - Service account with necessary permissions

### How to Trigger Deployment

**Option 1: Automatic (Recommended)**
```bash
git push origin claude/burch-platform-q4nf5k
```
→ Automatically triggers GitHub Actions workflow

**Option 2: Manual Trigger**
```bash
# From GitHub Actions UI:
# 1. Go to Actions tab
# 2. Select "Deploy to Google Cloud Run"
# 3. Click "Run workflow"
```

### Monitor Deployment

```bash
# View workflow status in GitHub
# → Go to Actions tab → Latest run

# Or check Cloud Run directly
gcloud run services describe burch-platform --region us-central1
```

---

## Local Deployment Script

If you need to deploy locally without GitHub Actions:

### Setup

```bash
# 1. Set your Google Cloud project ID
export GCP_PROJECT_ID="your-project-id"

# 2. Authenticate with Google Cloud
gcloud auth login
gcloud config set project $GCP_PROJECT_ID

# 3. Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Deploy

```bash
# Run the deployment script
./deploy-cloud-run.sh
```

This script will:
1. ✅ Authenticate to Google Cloud
2. ✅ Build Docker image
3. ✅ Push to Google Container Registry
4. ✅ Deploy to Cloud Run
5. ✅ Display live URL

### View Logs

```bash
# Stream real-time logs
gcloud run logs read burch-platform --region us-central1 --follow

# Or view last 50 log entries
gcloud run logs read burch-platform --region us-central1 --limit 50
```

---

## Current Configuration

| Component | Value |
|-----------|-------|
| **Service Name** | burch-platform |
| **Region** | us-central1 |
| **Container Registry** | gcr.io |
| **Environment** | production |
| **Authentication** | Disabled (public access) |

---

## Docker Image Details

- **Base Image:** node:22-alpine
- **Port:** 8080
- **Health Check:** /health endpoint
- **Assets:** Served from `apps/web/public/`

### Building Locally

```bash
docker build -t lilita-keper-portal:latest .
docker run -p 8080:8080 lilita-keper-portal:latest
```

Then visit: http://localhost:8080

---

## Troubleshooting

### Docker Build Fails
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t lilita-keper-portal:latest .
```

### Push to Container Registry Fails
```bash
# Re-authenticate Docker
gcloud auth configure-docker gcr.io

# Check gcloud auth status
gcloud auth list
```

### Cloud Run Deployment Fails
```bash
# Check service account permissions
gcloud iam service-accounts get-iam-policy $(gcloud config get-value account)

# View detailed error logs
gcloud run deploy burch-platform --image gcr.io/$GCP_PROJECT_ID/burch-platform:latest --region us-central1 --verbose
```

### Service Not Responding
```bash
# Check service status
gcloud run services describe burch-platform --region us-central1

# View recent logs
gcloud run logs read burch-platform --region us-central1 --limit 100

# Test health endpoint
curl https://burch-platform-xxx.run.app/health
```

---

## Rollback

To rollback to a previous version:

```bash
# List previous revisions
gcloud run revisions list --service=burch-platform --region=us-central1

# Route traffic to a previous revision
gcloud run services update-traffic burch-platform \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

---

## Environment Variables

Set via Cloud Run:

```bash
gcloud run deploy burch-platform \
  --set-env-vars \
  KEY1=value1,\
  KEY2=value2
```

Current variables in workflow:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `RESEND_API_KEY`
- `ANTHROPIC_API_KEY`
- `MPESA_*` keys
- `FLUTTERWAVE_*` keys

---

## Support

For issues or questions:
1. Check Cloud Run logs: `gcloud run logs read burch-platform`
2. Review workflow logs in GitHub Actions
3. Verify service configuration: `gcloud run services describe burch-platform`


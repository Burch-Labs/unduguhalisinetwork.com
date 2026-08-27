# Google Cloud Run Deployment Guide

This guide explains how to deploy burch-platform to Google Cloud Run.

## Prerequisites

1. **Google Cloud Account** - https://cloud.google.com
2. **Google Cloud CLI** - https://cloud.google.com/sdk/docs/install
3. **Docker** (optional - Cloud Build handles it) - https://www.docker.com

## Setup Steps

### Step 1: Create a Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project
gcloud projects create burch-platform-prod --name "Burch Platform"

# Set the project
gcloud config set project burch-platform-prod
```

### Step 2: Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable compute.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Step 3: Set Up Cloud SQL (PostgreSQL Database)

```bash
# Create Cloud SQL instance
gcloud sql instances create burch-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1

# Create database
gcloud sql databases create burch_db --instance=burch-postgres

# Create database user
gcloud sql users create app_user --instance=burch-postgres

# Get connection string
gcloud sql instances describe burch-postgres --format='get(connectionName)'
```

### Step 4: Create Service Account

```bash
# Create service account
gcloud iam service-accounts create burch-cloud-run \
  --display-name="Burch Cloud Run"

# Grant necessary permissions
gcloud projects add-iam-policy-binding burch-platform-prod \
  --member="serviceAccount:burch-cloud-run@burch-platform-prod.iam.gserviceaccount.com" \
  --role="roles/cloudsql.client"

gcloud projects add-iam-policy-binding burch-platform-prod \
  --member="serviceAccount:burch-cloud-run@burch-platform-prod.iam.gserviceaccount.com" \
  --role="roles/run.admin"
```

### Step 5: Set Environment Variables

Create a `.env.cloud-run` file with your secrets:

```env
DATABASE_URL="postgresql://app_user:PASSWORD@/burch_db?host=/cloudsql/PROJECT_ID:us-central1:burch-postgres"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-cloud-run-url.run.app"
RESEND_API_KEY="your-resend-api-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
MPESA_CONSUMER_KEY="your-mpesa-key"
MPESA_CONSUMER_SECRET="your-mpesa-secret"
MPESA_PASSKEY="your-mpesa-passkey"
MPESA_SHORTCODE="your-mpesa-shortcode"
FLUTTERWAVE_SECRET_KEY="your-flutterwave-key"
FLUTTERWAVE_SECRET_HASH="your-flutterwave-hash"
```

### Step 6: Deploy to Cloud Run

#### Option A: Using Cloud Build (Automated)

```bash
# Submit build to Cloud Build
gcloud builds submit \
  --config=cloudbuild.yaml \
  --substitutions=_DATABASE_URL="your-database-url",_NEXTAUTH_SECRET="your-secret",_NEXTAUTH_URL="https://burch-platform.run.app",_RESEND_API_KEY="your-key",_ANTHROPIC_API_KEY="your-key"
```

#### Option B: Local Docker Build & Push

```bash
# Build Docker image locally
docker build -t burch-platform:latest .

# Tag for Google Container Registry
docker tag burch-platform:latest gcr.io/burch-platform-prod/burch-platform:latest

# Authenticate with GCR
gcloud auth configure-docker

# Push to GCR
docker push gcr.io/burch-platform-prod/burch-platform:latest

# Deploy to Cloud Run
gcloud run deploy burch-platform \
  --image gcr.io/burch-platform-prod/burch-platform:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="your-database-url",NEXTAUTH_SECRET="your-secret",NEXTAUTH_URL="https://burch-platform.run.app",RESEND_API_KEY="your-key",ANTHROPIC_API_KEY="your-key" \
  --service-account burch-cloud-run@burch-platform-prod.iam.gserviceaccount.com \
  --add-cloudsql-instances burch-platform-prod:us-central1:burch-postgres
```

#### Option C: Using gcloud CLI (Simplest)

```bash
gcloud run deploy burch-platform \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars DATABASE_URL="your-database-url",NEXTAUTH_SECRET="your-secret"
```

## After Deployment

### Get Your Service URL

```bash
gcloud run services describe burch-platform --region us-central1 --format='value(status.url)'
```

### View Logs

```bash
gcloud run services logs read burch-platform --region us-central1
```

### Monitor Performance

1. Go to https://console.cloud.google.com/run
2. Click on `burch-platform` service
3. View Metrics, Logs, and Revisions

## Scaling Configuration

Cloud Run automatically scales based on traffic. To adjust:

```bash
gcloud run services update burch-platform \
  --region us-central1 \
  --min-instances 1 \
  --max-instances 100 \
  --memory 2Gi \
  --cpu 2
```

## Setting Up CI/CD

### GitHub Actions Integration

1. Create a service account key:
```bash
gcloud iam service-accounts keys create key.json \
  --iam-account=burch-cloud-run@burch-platform-prod.iam.gserviceaccount.com
```

2. Add to GitHub Secrets:
   - `GCP_PROJECT_ID`: Your project ID
   - `GCP_SA_KEY`: Contents of key.json

3. Use in GitHub Actions workflow to auto-deploy on push

## Troubleshooting

### Database Connection Issues
```bash
# Test Cloud SQL connection
gcloud sql connect burch-postgres --user=app_user
```

### Build Failures
```bash
# View detailed build logs
gcloud builds log BUILD_ID
```

### Cold Starts
- Increase `--min-instances` to 1 for faster response times
- Uses Cloud Run's built-in caching

## Pricing

- **Compute**: $0.00002400 per vCPU-second
- **Memory**: $0.00000250 per GB-second
- **Requests**: First 2M free per month
- **Cloud SQL**: ~$10-50/month depending on usage

## Next Steps

1. Test your deployment at the provided URL
2. Set up custom domain (optional)
3. Configure monitoring and alerts
4. Set up backup strategy for Cloud SQL
5. Plan for scaling as traffic increases

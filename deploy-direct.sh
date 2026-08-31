#!/bin/bash

# Lilita Keper - Direct Deployment (No Cloud Build)
# This builds locally and pushes directly to Cloud Run

set -e

PROJECT_ID="sparksnairobi-burch-app-prod"
SERVICE_NAME="lilita-agent-portal"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🦁 Lilita Keper Agent Portal - Direct Deployment"
echo "=============================================="
echo ""

# Step 1: Auth
echo "🔐 Authenticating..."
gcloud auth configure-docker gcr.io
gcloud config set project $PROJECT_ID
echo "✅ Auth configured"
echo ""

# Step 2: Build
echo "🐳 Building Docker image locally..."
docker build -t $IMAGE_NAME:latest . || {
  echo "❌ Docker build failed"
  exit 1
}
echo "✅ Image built"
echo ""

# Step 3: Push
echo "📤 Pushing to Container Registry..."
docker push $IMAGE_NAME:latest || {
  echo "❌ Push failed"
  exit 1
}
echo "✅ Image pushed to gcr.io"
echo ""

# Step 4: Deploy
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_NAME:latest \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1 \
  --timeout 3600

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🎉 Getting your URL..."
gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'
echo ""
echo "📋 Test the portal with:"
echo "  Email: agent@lilitakeper.com"
echo "  Password: demo123"

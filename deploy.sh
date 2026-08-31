#!/bin/bash

# Lilita Keper Agent Portal - Cloud Run Deployment Script
# Usage: ./deploy.sh

set -e

echo "🦁 Lilita Keper Agent Portal - Cloud Run Deployment"
echo "=================================================="
echo ""

# Configuration
PROJECT_ID="sparksnairobi-burch-app-prod"
SERVICE_NAME="lilita-agent-portal"
REGION="us-central1"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "📋 Configuration:"
echo "  Project ID: $PROJECT_ID"
echo "  Service: $SERVICE_NAME"
echo "  Region: $REGION"
echo "  Image: $IMAGE_NAME"
echo ""

# Step 1: Authenticate
echo "🔐 Step 1: Authenticating with Google Cloud..."
gcloud auth login || echo "Already authenticated"
gcloud config set project $PROJECT_ID
echo "✅ Authentication complete"
echo ""

# Step 2: Build Docker image
echo "🐳 Step 2: Building Docker image..."
docker build -t $IMAGE_NAME:latest .
echo "✅ Image built successfully"
echo ""

# Step 3: Push to Container Registry
echo "📤 Step 3: Pushing image to Container Registry..."
docker push $IMAGE_NAME:latest
echo "✅ Image pushed to gcr.io"
echo ""

# Step 4: Deploy to Cloud Run
echo "🚀 Step 4: Deploying to Cloud Run..."
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
echo "🎉 Your portal is now live!"
echo ""
echo "View your service:"
gcloud run services describe $SERVICE_NAME --region $REGION --format='value(status.url)'
echo ""
echo "Monitor logs:"
echo "  gcloud run logs read $SERVICE_NAME --region $REGION --limit 50"
echo ""

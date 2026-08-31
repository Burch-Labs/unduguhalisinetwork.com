#!/bin/bash

# 🦁 Lilita Keper Agent Portal - Google Cloud Run Deployment Script
# ================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🦁 LILITA KEPER AGENT PORTAL - CLOUD RUN DEPLOYMENT${NC}\n"

# Configuration
PROJECT_ID="${GCP_PROJECT_ID:-project-4b2a113f-494e-4e42-9cc}"
REGION="${GCP_REGION:-us-central1}"
SERVICE_NAME="lilita-keper-portal"
IMAGE_NAME="${SERVICE_NAME}"
DOCKER_REGISTRY="gcr.io"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "  Project ID: $PROJECT_ID"
echo "  Region: $REGION"
echo "  Service: $SERVICE_NAME"
echo "  Registry: $DOCKER_REGISTRY"
echo ""

# Step 1: Check gcloud authentication
echo -e "${BLUE}Step 1: Checking Google Cloud authentication...${NC}"
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &>/dev/null; then
    echo -e "${RED}❌ Not authenticated with Google Cloud${NC}"
    echo "Run: gcloud auth login"
    exit 1
fi
echo -e "${GREEN}✅ Authenticated${NC}\n"

# Step 2: Set project
echo -e "${BLUE}Step 2: Setting GCP project...${NC}"
gcloud config set project $PROJECT_ID
echo -e "${GREEN}✅ Project set to: $PROJECT_ID${NC}\n"

# Step 3: Enable required APIs
echo -e "${BLUE}Step 3: Enabling required APIs...${NC}"
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    containerregistry.googleapis.com \
    --project=$PROJECT_ID

echo -e "${GREEN}✅ APIs enabled${NC}\n"

# Step 4: Build Docker image
echo -e "${BLUE}Step 4: Building Docker image...${NC}"
echo "  Image: $DOCKER_REGISTRY/$PROJECT_ID/$IMAGE_NAME"

docker build -t "$DOCKER_REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest" .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built${NC}\n"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Step 5: Push to Container Registry
echo -e "${BLUE}Step 5: Pushing image to Container Registry...${NC}"

# Configure Docker for GCR
gcloud auth configure-docker

docker push "$DOCKER_REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Image pushed to GCR${NC}\n"
else
    echo -e "${RED}❌ Docker push failed${NC}"
    exit 1
fi

# Step 6: Deploy to Cloud Run
echo -e "${BLUE}Step 6: Deploying to Cloud Run...${NC}"

gcloud run deploy $SERVICE_NAME \
    --image "$DOCKER_REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest" \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 512Mi \
    --cpu 1 \
    --timeout 3600 \
    --set-env-vars "NODE_ENV=production" \
    --project=$PROJECT_ID

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployed to Cloud Run${NC}\n"
else
    echo -e "${RED}❌ Cloud Run deployment failed${NC}"
    exit 1
fi

# Step 7: Get service URL
echo -e "${BLUE}Step 7: Getting service URL...${NC}"

SERVICE_URL=$(gcloud run services describe $SERVICE_NAME \
    --platform managed \
    --region $REGION \
    --project=$PROJECT_ID \
    --format='value(status.url)')

echo -e "\n${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}\n"
echo -e "${BLUE}🎉 Your Lilita Keper Portal is live!${NC}\n"

echo "📊 Deployment Summary:"
echo "  Service: $SERVICE_NAME"
echo "  Region: $REGION"
echo "  Image: $DOCKER_REGISTRY/$PROJECT_ID/$IMAGE_NAME:latest"
echo ""
echo "🌐 Live URL: $SERVICE_URL"
echo ""
echo "📍 Check deployment status:"
echo "  gcloud run services describe $SERVICE_NAME --region=$REGION"
echo ""
echo "📊 View logs:"
echo "  gcloud run services logs read $SERVICE_NAME --region=$REGION"
echo ""
echo "🚀 Service ready for client!"
echo ""

# Save URL to file
echo "$SERVICE_URL" > .cloud-run-url

echo -e "${YELLOW}💡 Next steps:${NC}"
echo "  1. Test the service: curl $SERVICE_URL/health"
echo "  2. Share with client: $SERVICE_URL"
echo "  3. Monitor logs in Cloud Console"
echo ""

#!/bin/bash
# Deploy Lilita Keper Portal to Google Cloud Run

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Lilita Keper Portal - Cloud Run Deployment${NC}"
echo "================================================"

# Check for required environment variables
if [ -z "$GCP_PROJECT_ID" ]; then
    echo -e "${RED}❌ Error: GCP_PROJECT_ID not set${NC}"
    echo "Set it with: export GCP_PROJECT_ID=your-project-id"
    exit 1
fi

SERVICE_NAME="burch-platform"
IMAGE_TAG="gcr.io/${GCP_PROJECT_ID}/${SERVICE_NAME}"
REGION="us-central1"
COMMIT_SHA=$(git rev-parse --short HEAD)

echo -e "${BLUE}📋 Configuration:${NC}"
echo "  Project ID: $GCP_PROJECT_ID"
echo "  Service: $SERVICE_NAME"
echo "  Region: $REGION"
echo "  Commit: $COMMIT_SHA"
echo ""

# Step 1: Authenticate to Google Cloud
echo -e "${BLUE}1️⃣  Authenticating to Google Cloud...${NC}"
gcloud auth configure-docker gcr.io

# Step 2: Build Docker image
echo -e "${BLUE}2️⃣  Building Docker image...${NC}"
docker build \
  -t "${IMAGE_TAG}:${COMMIT_SHA}" \
  -t "${IMAGE_TAG}:latest" \
  .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Step 3: Push to Google Container Registry
echo -e "${BLUE}3️⃣  Pushing image to Google Container Registry...${NC}"
docker push "${IMAGE_TAG}:${COMMIT_SHA}"
docker push "${IMAGE_TAG}:latest"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Image pushed successfully${NC}"
else
    echo -e "${RED}❌ Docker push failed${NC}"
    exit 1
fi

# Step 4: Deploy to Cloud Run
echo -e "${BLUE}4️⃣  Deploying to Cloud Run...${NC}"
gcloud run deploy "$SERVICE_NAME" \
  --image "${IMAGE_TAG}:${COMMIT_SHA}" \
  --platform managed \
  --region "$REGION" \
  --allow-unauthenticated \
  --project "$GCP_PROJECT_ID"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful${NC}"
else
    echo -e "${RED}❌ Cloud Run deployment failed${NC}"
    exit 1
fi

# Step 5: Get service URL
echo -e "${BLUE}5️⃣  Retrieving service URL...${NC}"
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
  --region "$REGION" \
  --project "$GCP_PROJECT_ID" \
  --format='value(status.url)')

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "================================================"
echo -e "${BLUE}📍 Live URL:${NC} ${SERVICE_URL}"
echo -e "${BLUE}📊 Commit:${NC} $COMMIT_SHA"
echo ""
echo "Next steps:"
echo "  • Test the portal: $SERVICE_URL"
echo "  • View logs: gcloud run logs read $SERVICE_NAME --region $REGION --limit 50"
echo "  • Monitor service: gcloud run services describe $SERVICE_NAME --region $REGION"

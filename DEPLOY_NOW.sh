#!/bin/bash
# Lilita Keper Portal - Fixed Deployment Script

echo "🦁 Lilita Keper Agent Portal - Deployment"
echo "========================================="
echo ""
echo "📍 Location: Google Cloud Shell"
echo "🔄 Pulling latest code with fix..."
echo ""

cd ~/burch-platform
git fetch origin
git checkout claude/burch-platform-q4nf5k
git pull origin claude/burch-platform-q4nf5k

echo ""
echo "✅ Latest code pulled (package.json fix included)"
echo ""
echo "📋 Ready to deploy. Running:"
echo ""
echo "docker build -t gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest ."
echo ""

docker build -t gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest . || {
  echo "❌ Build failed. Check Docker output above."
  exit 1
}

echo ""
echo "✅ Docker build successful!"
echo ""
echo "Configuring Docker auth..."
gcloud auth configure-docker gcr.io

echo ""
echo "docker push gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest"
echo ""

docker push gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest || {
  echo "❌ Push failed. Check auth."
  exit 1
}

echo ""
echo "✅ Image pushed to Container Registry!"
echo ""
echo "🚀 Deploying to Cloud Run..."
echo ""

gcloud run deploy lilita-agent-portal \
  --image gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi \
  --cpu 1

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo ""
echo "🎉 Your Portal URL:"
gcloud run services describe lilita-agent-portal --region us-central1 --format='value(status.url)'
echo ""
echo "🧪 Test with:"
echo "   Email: agent@lilitakeper.com"
echo "   Password: demo123"

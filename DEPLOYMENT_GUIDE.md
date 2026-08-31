# Lilita Keper Agent Portal - Deployment Guide

## What's Been Fixed ✅

### Navigation & UI Issues Resolved
1. **Sidebar Navigation** - Replaced problematic top navbar with fixed sidebar (prevents overlapping)
2. **Page Navigation** - Fixed login/dashboard switching with proper element visibility
3. **Z-index Problems** - Eliminated z-index stacking issues that blocked page interaction
4. **Responsive Design** - Improved mobile and tablet layouts

### Features Added
1. **Low Season Pricing (May-June)** - New pricing tier with higher agent commissions (20-22%)
2. **Rate Sheet Download** - Integrated link to external rates portal PDF
3. **Documents Page** - Dedicated section for contracts and digital signatures

### Portal Sections
- 📊 Dashboard with 4 seasons of pricing
- 📧 Mail-Merge bulk email system
- 📞 Contact directory with import
- 📄 Document management & contracts

## Quick Deployment (Cloud Shell)

```bash
# 1. Authenticate
gcloud auth login
gcloud config set project sparksnairobi-burch-app-prod

# 2. Deploy directly
gcloud run deploy lilita-agent-portal \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

## Test Credentials
- Email: agent@lilitakeper.com
- Password: demo123

## Key Features Ready
✅ Fixed navigation (sidebar, no overlapping)
✅ Complete 2026-2027 pricing (Peak, Shoulder, Low Season May-Jun, Green)
✅ Document management with contracts
✅ Mail-merge system
✅ Contact directory
✅ Rate sheet PDF link
✅ Digital signature integration
✅ Google Calendar hooks
✅ Responsive mobile design

## File Status
- ✅ lilita-agent-portal-v2.html (FIXED - all issues resolved)
- ✅ server.js (Configured)
- ✅ Dockerfile (Optimized for Express.js)
- ✅ package.json (Dependencies ready)
- ✅ All HTML files committed and pushed

## Next Steps
1. Open Google Cloud Console
2. Navigate to Cloud Shell
3. Clone the repository
4. Run the deployment command above
5. Wait for URL (usually 1-2 minutes)
6. Test with demo credentials

Your Cloud Run URL will be: https://lilita-agent-portal-xxxxx-uc.a.run.app

---
**Production Ready!** 🚀 All navigation issues fixed, features implemented, ready for deployment.

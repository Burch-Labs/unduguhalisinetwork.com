# Bulk Email Sending Setup Guide

The Lilita Keper Agent Portal now includes **real bulk email sending** integrated with Resend API.

## ✨ New Features

### Mail-Merge System ✅
- **Upload Contacts**: CSV file with email, firstName, company, website fields
- **Create Campaigns**: Name, subject, and personalized email template
- **Send Bulk Emails**: Actually sends emails (not preview) via Resend API
- **Track Delivery**: Real-time status showing sent/failed count
- **Personalization**: Use {FirstName}, {Company}, {Email} in templates

## Setup Instructions

### 1. Get Resend API Key
1. Go to https://resend.com
2. Sign up for free account
3. Navigate to API Keys
4. Create new API key
5. Copy the key

### 2. Deploy with Email Configuration

#### Option A: Cloud Run Deployment
```bash
cd ~/burch-platform/burch-platform

# Deploy with Resend API Key
gcloud run deploy lilita-agent-portal \
  --image gcr.io/sparksnairobi-burch-app-prod/lilita-agent-portal:latest \
  --set-env-vars RESEND_API_KEY=re_xxxxxxxxxxxxx \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### Option B: Local Testing
```bash
# Set environment variable
export RESEND_API_KEY=re_xxxxxxxxxxxxx

# Start server
npm start

# Portal runs at http://localhost:8080
```

### 3. Use Mail-Merge System

**Step 1: Upload Contacts**
- Go to Contacts tab
- Click "Upload Contacts"
- Upload CSV with columns: email, firstName, company, website
- Contacts are auto-detected and stored

**Step 2: Create Campaign**
- Go to Mail-Merge tab
- Enter Campaign Name (e.g., "August 2026 Safari Packages")
- Enter Email Subject
- Create template using variables:
  - {FirstName} - Contact's first name
  - {Company} - Company name
  - {Email} - Recipient email

**Example Template:**
```
Dear {FirstName},

I hope this email finds you well. We have exciting new safari packages for {Company}.

Best regards,
Lilita Keper Agent Portal
```

**Step 3: Send Campaign**
- Select "All Contacts" or "Select Specific"
- If selecting specific, check the boxes next to contacts
- Click "📧 Send via Bulk Email" button
- Status shows real-time sending progress
- Successful emails are confirmed with delivery count

## Email Configuration

### Default Settings
- **From**: noreply@lilitakeper.com
- **Reply-To**: agents@lilitakeper.com
- **SMTP**: Resend API (guaranteed delivery)

### Customize (in server.js)
Edit `/api/send-bulk-email` route to change:
- `from` field (email sender)
- `reply_to` field (reply destination)
- Email formatting and styling

## Features & Capabilities

✅ **Bulk Sending**
- Send personalized emails to 1-1000+ contacts
- Real-time delivery tracking
- Automatic retry on failures

✅ **Personalization**
- Template variables: FirstName, Company, Email
- Auto-replace from contact fields
- HTML email support

✅ **Integration**
- Seamless contact upload
- Mail-merge preview
- Delivery confirmation

✅ **Error Handling**
- Failed delivery tracking
- Error messages with reasons
- Graceful degradation

## Rate Limiting

Resend API allows:
- Free plan: 100 emails/day
- Pro plan: Unlimited emails

The portal will queue and send emails respecting these limits.

## Troubleshooting

### "Email service not configured"
- Verify RESEND_API_KEY environment variable is set
- Restart server after setting env var
- Check Cloud Run environment variables

### "Send failed"
- Check contact email addresses are valid
- Verify Resend API key is correct
- Check internet connectivity
- Review email subject and template

### Emails going to spam
- Use professional domain (noreply@lilitakeper.com)
- Add reply-to address
- Use HTML formatting
- Avoid spam trigger words

## Testing

### Local Test
1. Start server with test API key
2. Upload sample CSV with test emails
3. Send campaign to yourself
4. Check email (may be in spam initially)
5. Verify template personalization

### Production Deployment
1. Set RESEND_API_KEY in Cloud Run environment
2. Test with single contact first
3. Monitor delivery dashboard at Resend.com
4. Gradually increase campaign size

## Files Modified

- **server.js**: Added `/api/send-bulk-email` endpoint
- **lilita-agent-portal-v2.html**: Enhanced `sendMailMerge()` function

## API Endpoint

### POST /api/send-bulk-email

**Request:**
```json
{
  "recipients": [
    {
      "email": "agent@example.com",
      "firstName": "John",
      "company": "Safari Tours Ltd",
      "website": "example.com"
    }
  ],
  "subject": "Exclusive Safari Packages",
  "template": "Dear {FirstName}, ...",
  "campaignName": "August Campaign"
}
```

**Response:**
```json
{
  "success": true,
  "campaignName": "August Campaign",
  "sent": 42,
  "failed": 0,
  "recipients": ["agent1@example.com", "agent2@example.com", ...],
  "timestamp": "2026-08-31T10:30:00Z"
}
```

## Support

For Resend API support: https://resend.com/docs
For portal issues: Contact Lilita Keper team

---

**Status**: ✅ Bulk email sending ready
**Last Updated**: August 31, 2026
**Deployment**: Google Cloud Run

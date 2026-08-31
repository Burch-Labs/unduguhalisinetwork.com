const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (index.html will be served at /)
app.use(express.static(path.join(__dirname)));

// Email sending endpoint
app.post('/api/send-bulk-email', async (req, res) => {
    try {
        const { recipients, subject, template, campaignName } = req.body;

        if (!recipients || recipients.length === 0) {
            return res.status(400).json({ error: 'No recipients provided' });
        }

        if (!subject || !template) {
            return res.status(400).json({ error: 'Subject and template are required' });
        }

        if (!RESEND_API_KEY) {
            return res.status(400).json({
                error: 'Email service not configured. Contact administrator.',
                message: 'Set RESEND_API_KEY environment variable'
            });
        }

        const sent = [];
        const failed = [];

        for (const recipient of recipients) {
            try {
                const personalized = template
                    .replace(/{FirstName}/g, recipient.firstName || '')
                    .replace(/{Company}/g, recipient.company || '')
                    .replace(/{Email}/g, recipient.email || '');

                const response = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${RESEND_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: 'Lilita Keper <noreply@lilitakeper.com>',
                        to: recipient.email,
                        subject: subject,
                        html: `<div>${personalized}</div>`,
                        reply_to: 'agents@lilitakeper.com'
                    })
                });

                if (response.ok) {
                    sent.push(recipient.email);
                } else {
                    failed.push({ email: recipient.email, reason: 'Send failed' });
                }
            } catch (err) {
                failed.push({ email: recipient.email, reason: err.message });
            }
        }

        res.json({
            success: true,
            campaignName: campaignName || 'Bulk Email Campaign',
            sent: sent.length,
            failed: failed.length,
            recipients: sent,
            errors: failed,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({
            error: 'Failed to send emails',
            message: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Lilita Keper Portal'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🦁 Lilita Keper Portal running on port ${PORT}`);
    console.log(`📍 Visit http://localhost:${PORT}`);
});

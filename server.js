const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// Serve public assets - check both locations for dev and production
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
} else {
    // Dev mode: serve from apps/web/public
    app.use(express.static(path.join(__dirname, 'apps', 'web', 'public')));
}

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'Lilita Keper Portal' });
});

app.post('/api/send-bulk-email', (req, res) => {
    res.json({ success: true, message: 'Email endpoint - configure RESEND_API_KEY for actual sending' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🦁 Lilita Keper Portal running on port ${PORT}`);
    console.log(`📍 Visit http://localhost:${PORT}`);
});

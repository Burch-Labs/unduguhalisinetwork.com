const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Determine which public directory to use
let publicDir;
const productionPath = path.join(__dirname, 'public');
const developmentPath = path.join(__dirname, 'apps', 'web', 'public');

if (fs.existsSync(productionPath)) {
    publicDir = productionPath;
} else if (fs.existsSync(developmentPath)) {
    publicDir = developmentPath;
} else {
    console.warn('Warning: Neither public directory found. Using production path as fallback.');
    publicDir = productionPath;
}

console.log(`📁 Serving static files from: ${publicDir}`);

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

// Serve public assets (logos, images, etc)
app.use(express.static(publicDir));

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

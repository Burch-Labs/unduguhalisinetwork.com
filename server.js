const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));

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

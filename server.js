const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-landing.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-login.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-dashboard.html'));
});

app.get('/agent-login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-login.html'));
});

app.get('/agent-dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-dashboard.html'));
});

app.get('/agent-portal-v2', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-portal-v2.html'));
});

app.get('/agent-portal-v2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'lilita-agent-portal-v2.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Lilita Keper Portal'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'lilita-landing.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🦁 Lilita Keper Portal running on port ${PORT}`);
    console.log(`📍 Visit http://localhost:${PORT}`);
});

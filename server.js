const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const indexPath = path.join(__dirname, 'index.html');

console.log('📍 Server starting...');
console.log('📂 Looking for index.html at:', indexPath);
console.log('📂 Current directory:', __dirname);
console.log('📂 Files in directory:', fs.readdirSync(__dirname).filter(f => f.endsWith('.html')));

let indexHtml = '';

try {
    indexHtml = fs.readFileSync(indexPath, 'utf-8');
    console.log('✅ index.html loaded successfully (' + indexHtml.length + ' bytes)');
} catch (err) {
    console.error('❌ Failed to read index.html:', err.message);
    console.log('📂 Available files:', fs.readdirSync(__dirname));
    process.exit(1);
}

const server = http.createServer((req, res) => {
    console.log('📨 Request:', req.url);

    // Health check
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy', service: 'Lilita Keper Portal' }));
        return;
    }

    // API endpoint for bulk email
    if (req.url === '/api/send-bulk-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Email endpoint - configure RESEND_API_KEY for actual sending' }));
        });
        return;
    }

    // Serve index.html for all other requests
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(indexHtml);
});

server.listen(PORT, () => {
    console.log(`🦁 Lilita Keper Portal running on port ${PORT}`);
    console.log(`📍 Visit http://localhost:${PORT}`);
});

server.on('error', (err) => {
    console.error('❌ Server error:', err);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

// Read the HTML file once on startup
const indexPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf-8');

const server = http.createServer((req, res) => {
    // Health check
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'healthy' }));
        return;
    }

    // Serve index.html for all requests
    if (req.url === '/' || req.url.endsWith('.html')) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(indexHtml);
        return;
    }

    // 404 for everything else
    res.writeHead(404);
    res.end('Not Found');
});

server.listen(PORT, () => {
    console.log(`🦁 Lilita Keper Portal running on port ${PORT}`);
});

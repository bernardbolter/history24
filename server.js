const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Allow connections from any IP
const port = process.env.PORT || 3443;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Create self-signed certificate if it doesn't exist
const certDir = path.join(__dirname, 'certs');
const keyPath = path.join(certDir, 'key.pem');
const certPath = path.join(certDir, 'cert.pem');

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir);
}

// Generate self-signed certificate if it doesn't exist
if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  const { execSync } = require('child_process');
  try {
    console.log('Generating self-signed certificate...');
    execSync(`openssl req -x509 -newkey rsa:4096 -keyout ${keyPath} -out ${certPath} -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`, { stdio: 'inherit' });
    console.log('Certificate generated successfully!');
  } catch (error) {
    console.error('Failed to generate certificate:', error.message);
    process.exit(1);
  }
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on https://localhost:${port}`);
      console.log(`> Ready on https://YOUR_LOCAL_IP:${port}`);
      console.log('\nTo find your local IP address, run: ifconfig | grep "inet " | grep -v 127.0.0.1');
    });
});
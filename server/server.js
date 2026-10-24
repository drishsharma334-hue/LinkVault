const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Store links temporarily in memory
const links = new Map();

// Check whether the backend is running
app.get('/', (req, res) => {
  res.send('LinkVault backend is running!');
});

// Create a short URL
app.post('/api/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (
    !originalUrl ||
    !/^https?:\/\/.+/i.test(originalUrl)
  ) {
    return res.status(400).json({
      error: 'Please provide a valid URL starting with http:// or https://'
    });
  }

  const code = crypto.randomBytes(4).toString('hex');

  links.set(code, {
    originalUrl,
    clicks: 0
  });

  res.status(201).json({
    shortCode: code,
    shortUrl: `http://localhost:${PORT}/${code}`,
    originalUrl,
    clicks: 0
  });
});

// Get click analytics for a short link
app.get('/api/analytics/:code', (req, res) => {
  const link = links.get(req.params.code);

  if (!link) {
    return res.status(404).json({
      error: 'Short link not found'
    });
  }

  res.json({
    originalUrl: link.originalUrl,
    clicks: link.clicks
  });
});

// Get history of all shortened links
app.get('/api/links', (req, res) => {
  const allLinks = [];

  for (const [code, link] of links.entries()) {
    allLinks.push({
      shortCode: code,
      shortUrl: `http://localhost:${PORT}/${code}`,
      originalUrl: link.originalUrl,
      clicks: link.clicks
    });
  }

  res.json(allLinks);
});

// Redirect visitors to the original URL
app.get('/:code', (req, res) => {
  const link = links.get(req.params.code);

  if (!link) {
    return res.status(404).send('Short link not found');
  }

  link.clicks += 1;
  res.redirect(link.originalUrl);
});

app.listen(PORT, () => {
  console.log(`LinkVault server running on port ${PORT}`);
});
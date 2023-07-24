// server.js (Node.js with Express)
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/rss', async (req, res) => {
  try {
    const rssFeedUrl = "https://blog.smartgoat.me/rss";
    const response = await fetch(rssFeedUrl);
    const rssText = await response.text();
    res.send(rssText);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch blog posts.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

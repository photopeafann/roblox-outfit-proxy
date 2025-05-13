const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/outfits', async (req, res) => {
  const userId = req.query.userId;
  const cursor = req.query.cursor || "";

  if (!userId) return res.status(400).send({ error: 'Missing userId param' });

  try {
    const robloxURL = `https://avatar.roblox.com/v1/users/${userId}/outfits?limit=25${cursor ? `&cursor=${cursor}` : ''}`;
    const response = await fetch(robloxURL);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch from Roblox' });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});

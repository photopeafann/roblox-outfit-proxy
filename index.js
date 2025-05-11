// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/outfits/:userId', async (req, res) => {
  const userId = req.params.userId;
  const cursor = req.query.cursor || '';
  const limit = req.query.limit || 25;

  try {
    const response = await axios.get(`https://avatar.roblox.com/v1/users/${userId}/outfits?limit=${limit}&cursor=${cursor}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch outfits' });
  }
});

app.get('/', (req, res) => {
  res.send('Roblox Outfit Proxy Active!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy running on port ${port}`);
});

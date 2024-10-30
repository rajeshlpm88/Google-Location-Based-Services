const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

const GOOGLE_MAPS_API_KEY = 'Here You have to Pass Your API Key';

app.use(cors());
app.use(express.json());

// Endpoint to handle GPS coordinates and return address
app.post('/location', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and Longitude are required' });
  }

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    );

    if (response.data.status !== 'OK') {
      return res.status(500).json({ error: 'Failed to fetch address' });
    }

    const address = response.data.results[0].formatted_address;
    res.json({ address });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the address' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

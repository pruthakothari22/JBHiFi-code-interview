import express, { Request, Response } from 'express';
import axios from 'axios';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const apiKeyMiddleware = (req: Request, res: Response, next: Function) => {
  // TODO: Check authorization, input validation, etc.

  const apiKey = req.query.apiKey as string | undefined;

  if (!apiKey || apiKey !== process.env.OPENWEATHERMAP_API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

// Endpoint to get weather data
app.get('/weather', apiKeyMiddleware, async (req: Request, res: Response) => {
  const { q } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}`
    );

    const description = response.data.weather[0].description;
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

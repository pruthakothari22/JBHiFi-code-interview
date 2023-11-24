import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import cors from 'cors';
require('dotenv').config();

const app = express();

app.use(cors());
const PORT = process.env.PORT || 5000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  handler: (_, res: Response) => {
    res
      .status(429)
      .json({ error: 'Too many requests, please try again later' });
  },
});

app.use(limiter);

// Endpoint to get weather data
app.get('/weather', async (req: Request, res: Response) => {
  const { q } = req.query;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY1;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}`
    );

    const description = response.data.weather[0].description;
    res.json({ description });
  } catch (error) {
    res.status(500).json({ error: { error: 'Error fetching weather data' } });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

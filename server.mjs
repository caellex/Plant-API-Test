import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/plants/search', async (req, res) => {
    const { q } = req.query;

    try {
        const apiKey = 'bFxe5hBZx4Mj6bk-MPbIvj-TVyt86x-1hGRPc2DAcyE';
        const apiUrl = `https://trefle.io/api/v1/plants/search?token=${apiKey}&q=${q}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Trefle API:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the Trefle API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

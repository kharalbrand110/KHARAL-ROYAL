const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// CORS allow for all
app.use(cors());
app.use(express.json());

// Serve static files (index.html)
app.use(express.static('.'));

// ===== API PROXY ROUTES =====

// 1. CNIC to Name/Address
app.get('/api/cnic/:cnic', async (req, res) => {
    try {
        const url = `https://asadmughalfoundation.online/adr/api.php?cnic=${req.params.cnic}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'CNIC API failed', details: error.message });
    }
});

// 2. Vehicle Search
app.get('/api/vehicle/:reg', async (req, res) => {
    try {
        const url = `https://ptgktmvdixeckevlnvlj.supabase.co/functions/v1/all-vehicle-search?q=${encodeURIComponent(req.params.reg)}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Vehicle API failed', details: error.message });
    }
});

// 3. SIM Database
app.get('/api/sim/:number', async (req, res) => {
    try {
        const url = `https://blacksimdetail.vercel.app/public_apis/simdetailsapi.php?number=${req.params.number}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'SIM API failed', details: error.message });
    }
});

// 4. Indian Number Info
app.get('/api/indian/:number', async (req, res) => {
    try {
        const url = `https://wasifali-indian-number-info.vercel.app/api?number=${req.params.number}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Indian API failed', details: error.message });
    }
});

// 5. Additional SIM API (Original)
app.get('/api/sim2/:number', async (req, res) => {
    try {
        const url = `https://sim-info-api.wasif-ali.workers.dev/?search=${req.params.number}`;
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'SIM2 API failed', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Proxy server running on http://localhost:${PORT}`);
    console.log(`📌 Open: http://localhost:${PORT}/index.html`);
});

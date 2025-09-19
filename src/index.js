// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// mount routes
app.use('/api', require('./routes/habitRoutes'));

// If using mock agents, mount them under /mock-agents
if (process.env.USE_MOCK_CORAL === 'true') {
  app.use('/mock-agents', require('./mockAgents'));
}

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));

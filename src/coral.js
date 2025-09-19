// src/coral.js
require('dotenv').config();
const fetch = require('node-fetch');

const USE_MOCK = process.env.USE_MOCK_CORAL === 'true';
const MOCK_URL = process.env.MOCK_CORAL_URL || 'http://localhost:3000/mock-agents';
const CORAL_API_URL = process.env.CORAL_API_URL;
const CORAL_API_KEY = process.env.CORAL_API_KEY;

async function callAgent(agentId, input) {
  if (USE_MOCK) {
    const resp = await fetch(`${MOCK_URL}/${agentId}/invoke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    return resp.json();
  } else {
    if (!CORAL_API_KEY || !CORAL_API_URL) throw new Error('CORAL_API_KEY or CORAL_API_URL not set');
    const resp = await fetch(`${CORAL_API_URL}/agents/${agentId}/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CORAL_API_KEY}`
      },
      body: JSON.stringify({ input })
    });
    return resp.json();
  }
}

module.exports = { callAgent };

// src/mockAgents.js
const express = require('express');
const { v4: uuid } = require('uuid');
const router = express.Router();

// calendar-agent
router.post('/calendar-agent/invoke', (req, res) => {
  // returns free slots for "today" in UTC ISO strings
  const slots = [
    { start: '2025-09-19T08:00:00Z', end: '2025-09-19T08:45:00Z', duration: 45 },
    { start: '2025-09-19T12:00:00Z', end: '2025-09-19T12:30:00Z', duration: 30 },
    { start: '2025-09-19T16:00:00Z', end: '2025-09-19T16:45:00Z', duration: 45 }
  ];
  res.json({ slots });
});

// weather-agent
router.post('/weather-agent/invoke', (req, res) => {
  // simple forecast: low rain probability at morning, moderate afternoon
  res.json({
    forecast: [
      { time: '2025-09-19T08:00:00Z', pop: 0.05, condition: 'clear' },
      { time: '2025-09-19T12:00:00Z', pop: 0.15, condition: 'cloudy' },
      { time: '2025-09-19T16:00:00Z', pop: 0.40, condition: 'rain' }
    ]
  });
});

// notification-agent
router.post('/notification-agent/invoke', (req, res) => {
  // simulate scheduling
  res.json({ status: 'scheduled', id: uuid(), scheduledAt: req.body.input?.time || null });
});

module.exports = router;

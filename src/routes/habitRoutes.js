// src/routes/habitRoutes.js
const express = require('express');
const router = express.Router();
const { callAgent } = require('../coral');
const db = require('../db');
const { v4: uuid } = require('uuid');

// POST /suggest-habit
router.post('/suggest-habit', async (req, res) => {
  const { userId, location } = req.body;
  try {
    // Call calendar agent to get free slots
    const cal = await callAgent('calendar-agent', { userId, range: 'today' });
    // Call weather agent
    const weather = await callAgent('weather-agent', { location, range: 'today' });

    // simple composition logic:
    const slots = (cal.slots || []);
    const forecast = (weather.forecast || []);

    // pick first slot with duration >= 30 and low rain probability
    let suggestion = null;
    for (const s of slots) {
      // find nearest forecast entry for slot.start
      const f = forecast.find(f => f.time.startsWith(s.start.slice(0,10)));
      const pop = f ? f.pop : 0;
      if (s.duration >= 30 && pop < 0.3) {
        suggestion = { start: s.start, end: s.end, reason: 'free + good weather' };
        break;
      }
    }
    if (!suggestion && slots.length) {
      suggestion = { start: slots[0].start, end: slots[0].end, reason: 'free but weather uncertain' };
    }
    res.json({ success: true, suggestion, slots, forecast });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /schedule-reminder
router.post('/schedule-reminder', async (req, res) => {
  const { userId, message, time } = req.body;
  try {
    const notify = await callAgent('notification-agent', { userId, message, time });
    // save a light record in DB (optional)
    const id = uuid();
    db.prepare('INSERT INTO habit_events(id, habit_id, timestamp, completed) VALUES (?,?,?,?)')
      .run(id, null, new Date().toISOString(), 0);
    res.json({ success: true, notify });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

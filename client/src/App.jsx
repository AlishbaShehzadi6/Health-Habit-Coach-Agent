import { useState } from 'react';
import './App.css'

function App() {
  const [suggestion, setSuggestion] = useState(null);
  const [msg, setMsg] = useState('');
  async function getSuggestion() {
    const res = await fetch('http://localhost:3000/api/suggest-habit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'u1', location: 'New York' })
    });
    const j = await res.json();
    setSuggestion(j.suggestion || null);
  }
  async function schedule() {
    await fetch('http://localhost:3000/api/schedule-reminder', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId:'u1', message: msg, time: new Date().toISOString() })
    });
    alert('Reminder scheduled (mock) ' +msg);
  }
  return (
   
    <div className="container">
  <h1 className="title">Habit Coach App (Demo)</h1>

  <div className="cards">
    {/* Suggestion Card (Left) */}
    <div className="card">
      <h2>Habit Suggestion</h2>
      <button className="btn" onClick={getSuggestion}>Get suggestion</button>
      { suggestion && (
        <div className="result">
          <strong>{suggestion.start}</strong> - <strong>{suggestion.end}</strong>
          <p>({suggestion.reason})</p>
        </div>
      )}
    </div>

    {/* Reminder Card (Right) */}
    <div className="card">
      <h2>Set Reminder</h2>
      <input 
        className="input" 
        value={msg} 
        onChange={e=>setMsg(e.target.value)} 
        placeholder="Reminder message" 
      />
      <button className="btn" onClick={schedule}>Schedule reminder</button>
    </div>
  </div>
</div>


  );
}
export default App;

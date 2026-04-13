import { useEffect, useState } from 'react';
import LandingLayout from '@/components/layouts/LandingLayout';
import http from '@/services/http';

export default function LandingPage() {
  const [prizes, setPrizes] = useState([]);
  const [winners, setWinners] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([
      http.get('/spin/prizes').catch(() => ({ data: [] })),
      http.get('/spin/winners').catch(() => ({ data: [] })),
    ]).then(([prizesRes, winnersRes]) => {
      setPrizes(prizesRes.data?.prizes || prizesRes.data || []);
      setWinners(winnersRes.data?.winners || winnersRes.data || []);
    });
  }, []);

  async function spin() {
    try {
      const { data } = await http.post('/spin/result', {});
      setMessage(data?.message || JSON.stringify(data));
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Spin failed.');
    }
  }

  return (
    <LandingLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="card-surface p-6 text-center">
          <h1 className="mb-3 text-4xl font-bold">Landing Spin</h1>
          <p className="text-sm text-gray-400">
            The original landing experience used multiple Vue spinner components. This React version keeps the API route and simplifies the interaction.
          </p>
          <button type="button" onClick={spin} className="ui-button-blue mt-5">
            Spin now
          </button>
          {message ? <p className="mt-4 text-sm text-yellow-300">{message}</p> : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface p-4">
            <h2 className="mb-3 text-xl font-semibold">Prizes</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {prizes.map((item, index) => (
                <li key={item.id || index} className="rounded-lg border border-white/10 p-3">
                  {item.name || item.title || JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-4">
            <h2 className="mb-3 text-xl font-semibold">Recent winners</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {winners.map((item, index) => (
                <li key={item.id || index} className="rounded-lg border border-white/10 p-3">
                  {item.name || item.username || JSON.stringify(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}

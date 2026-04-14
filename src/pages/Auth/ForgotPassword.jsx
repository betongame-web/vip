import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessages([]);
    setSuccess('');

    try {
      const { data } = await http.post('/auth/forget-password', { email });
      setSuccess(data?.message || 'Password reset request sent.');
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Forgot Password</h2>

        {success ? (
          <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}

        {messages.length > 0 ? (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your account email"
              className="input"
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Sending request...' : 'Send Reset Request'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Remembered your password?{' '}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
            Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [messages, setMessages] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessages([]);
    setSuccess('');
    try {
      const { data } = await http.post(`/auth/reset-password/${token}`, form);
      setSuccess(data?.message || 'Password reset complete.');
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h1 className="mb-6 text-center text-3xl font-bold">Reset Password</h1>
        {success ? <div className="mb-4 rounded-xl bg-green-500/10 p-4 text-sm text-green-200">{success}</div> : null}
        {messages.length > 0 ? (
          <div className="mb-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-200">
            {messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            required
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            type="password"
            required
            className="input"
            placeholder="New password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          <input
            type="password"
            required
            className="input"
            placeholder="Confirm password"
            value={form.password_confirmation}
            onChange={(event) => setForm((prev) => ({ ...prev, password_confirmation: event.target.value }))}
          />
          <button type="submit" disabled={loading} className="ui-button-blue w-full disabled:opacity-60">
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

import { useState } from 'react';
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
        <h1 className="mb-6 text-center text-3xl font-bold">Forgot Password</h1>
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
            placeholder="Email or phone"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" disabled={loading} className="ui-button-blue w-full disabled:opacity-60">
            {loading ? 'Submitting...' : 'Send reset link'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

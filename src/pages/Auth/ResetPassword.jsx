import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import http from '@/services/http';
import { extractErrorMessages } from '@/services/error';

export default function ResetPassword() {
  const navigate = useNavigate();
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

    if (form.password !== form.password_confirmation) {
      setMessages(['Password confirmation does not match.']);
      setLoading(false);
      return;
    }

    try {
      const { data } = await http.post('/auth/reset-password', {
        token,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
      });

      setSuccess(data?.message || 'Password reset successful.');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1200);
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Reset Password</h2>

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
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="Enter your account email"
              className="input"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">New password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              placeholder="Enter new password"
              className="input"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Confirm password</label>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }))
              }
              placeholder="Confirm new password"
              className="input"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Resetting password...' : 'Reset Password'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Back to{' '}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
            login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { extractErrorMessages } from '@/services/error';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    accept_terms: true,
    invitation_code: code || '',
  });

  const passwordsMatch = useMemo(
    () => !form.password_confirmation || form.password === form.password_confirmation,
    [form.password, form.password_confirmation]
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessages([]);

    if (!passwordsMatch) {
      setMessages(['Password confirmation does not match.']);
      setLoading(false);
      return;
    }

    try {
      await register(form);
      navigate('/');
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Register</h1>

        {messages.length > 0 ? (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            className="input"
            placeholder="Enter name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          <input
            required
            type="email"
            className="input"
            placeholder="Enter email"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            required
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          <input
            required
            type="password"
            className="input"
            placeholder="Confirm password"
            value={form.password_confirmation}
            onChange={(event) => setForm((prev) => ({ ...prev, password_confirmation: event.target.value }))}
          />
          <input
            className="input"
            placeholder="Invitation / referral code"
            value={form.invitation_code}
            onChange={(event) => setForm((prev) => ({ ...prev, invitation_code: event.target.value }))}
          />
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              checked={form.accept_terms}
              onChange={(event) => setForm((prev) => ({ ...prev, accept_terms: event.target.checked }))}
              type="checkbox"
            />
            I accept the terms
          </label>

          <button type="submit" disabled={loading} className="ui-button-blue w-full disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { extractErrorMessages } from '@/services/error';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { code } = useParams();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    accept_terms: true,
    invitation_code: code || '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const passwordsMatch = useMemo(
    () => !form.password_confirmation || form.password === form.password_confirmation,
    [form.password, form.password_confirmation],
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
      navigate('/profile', { replace: true });
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-white">Register</h2>

        {messages.length > 0 ? (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
            {messages.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">Full name</label>
            <input
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              placeholder="Enter your full name"
              className="input"
              autoComplete="name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              placeholder="Enter your email"
              className="input"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Password</label>
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Create password"
                className="input"
                autoComplete="new-password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-200 transition hover:bg-white/10"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Confirm password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password_confirmation}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }))
              }
              placeholder="Confirm password"
              className="input"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Invitation code</label>
            <input
              value={form.invitation_code}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  invitation_code: event.target.value,
                }))
              }
              placeholder="Optional invitation code"
              className="input"
            />
          </div>

          {!passwordsMatch ? (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              Password confirmation does not match.
            </div>
          ) : null}

          <label className="flex items-start gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              className="mt-1"
              checked={form.accept_terms}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  accept_terms: event.target.checked,
                }))
              }
            />
            <span>I accept the platform terms and account rules.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-300 hover:text-emerald-200">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
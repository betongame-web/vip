import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/layouts/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { extractErrorMessages } from '@/services/error';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessages([]);
    try {
      await login(form);
      const target = location.state?.from?.pathname || '/';
      navigate(target, { replace: true });
    } catch (error) {
      setMessages(extractErrorMessages(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="card-surface p-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Login</h1>

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
            type="text"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            className="input"
            placeholder="Enter email or phone"
          />

          <div className="space-y-2">
            <input
              required
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              className="input"
              placeholder="Type the password"
            />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="text-sm text-gray-400">
              {showPassword ? 'Hide password' : 'Show password'}
            </button>
          </div>

          <Link to="/forgot-password" className="block text-sm text-gray-300">
            Forgot password
          </Link>

          <button type="submit" disabled={loading} className="ui-button-blue w-full disabled:opacity-60">
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-300">
          Not have an account yet?{' '}
          <Link to="/register" className="font-semibold text-white">
            Create an account
          </Link>
        </p>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          <a href="/auth/redirect/google" className="inline-flex rounded-full border border-white/10 px-5 py-3">
            Continue with Google
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}

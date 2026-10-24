import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, User, Mail, Phone, ArrowRight, ShieldCheck, Eye, EyeOff, KeyRound, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Logo } from '../assets/Logo.jsx';

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, resetPassword } = useAuth();

  const isRegisterInit = location.pathname === '/register';
  const [authMode, setAuthMode] = useState(isRegisterInit ? 'register' : 'login'); // 'login' | 'register' | 'forgot'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    const res = await resetPassword(email, password);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Your password has been securely reset! You may now sign in.');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setAuthMode('login');
        setSuccessMsg('');
      }, 2500);
    } else {
      setError(res.error || 'Failed to reset password.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!validateEmail(email)) {
      setError('Please provide a valid email address (e.g. name@domain.com).');
      return;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setError('Password must contain at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify both fields.');
        return;
      }

      setLoading(true);
      const res = await register(name, email, password, phone);
      setLoading(false);

      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Registration failed.');
      }
    } else if (authMode === 'login') {
      if (!password) {
        setError('Please enter your account password.');
        return;
      }

      setLoading(true);
      const res = await login(email, password);
      setLoading(false);

      if (res.success) {
        if (res.user.role === 'admin') {
          navigate('/admin', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    }
  };

  return (
    <div className="bg-[#FFF8F0] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white border border-[#E8DFE5] rounded-xs p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
            <Logo variant="emblem" className="w-12 h-12 mx-auto" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#280030]">
            {authMode === 'register'
              ? 'Create Patron Account'
              : authMode === 'forgot'
              ? 'Reset Account Password'
              : 'Sign In to Sri Lakshmi Saree House'}
          </h1>
          <p className="text-xs text-[#706873]">
            {authMode === 'register'
              ? 'Join our verified patron list for order tracking, wishlist syncing, and bespoke drapes.'
              : authMode === 'forgot'
              ? 'Enter your registered email and choose your new secure password.'
              : 'Sign in to access your saved drapes, addresses, and tracking.'}
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">{error}</div>
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
            <div className="flex-1">{successMsg}</div>
          </div>
        )}

        {/* FORGOT PASSWORD FORM */}
        {authMode === 'forgot' ? (
          <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#29232A] mb-1">Registered Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#29232A] mb-1">New Secure Password (Min 6 chars) *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#706873] hover:text-[#280030]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#29232A] mb-1">Confirm New Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-[#706873] hover:text-[#280030]"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Updating Credentials...' : 'Set New Password'}</span>
              <ArrowRight className="w-4 h-4 text-[#F0C860]" />
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className="text-xs text-[#280030] font-semibold hover:underline"
              >
                ← Return to Sign In
              </button>
            </div>
          </form>
        ) : (
          /* LOGIN OR REGISTER FORM */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full legal name"
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                  />
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-[#29232A] mb-1">Email Address *</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <Mail className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">Phone Number (for Courier & Dispatch OTP)</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                  />
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-[#29232A]">Password *</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setError('');
                    }}
                    className="text-[11px] text-[#BD3D78] hover:underline font-medium cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                />
                <Lock className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#706873] hover:text-[#280030]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">Confirm Password *</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-9 pr-10 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                  />
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-[#706873] hover:text-[#280030]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : authMode === 'register' ? 'Create Patron Account' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 text-[#F0C860]" />
            </button>
          </form>
        )}

        {/* Security Assurance Badge */}
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#706873]">
          <ShieldCheck className="w-4 h-4 text-[#426B46]" />
          <span>256-bit SSL encrypted & secure credential verification</span>
        </div>

        {/* Toggle Login / Register */}
        <div className="text-center pt-3 border-t border-[#E8DFE5] text-xs text-[#706873] space-y-2">
          {authMode === 'register' ? (
            <p>
              Already an enrolled patron?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                }}
                className="text-[#280030] font-bold underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : authMode === 'login' ? (
            <p>
              New to Sri Lakshmi Saree House?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                }}
                className="text-[#280030] font-bold underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          ) : null}

          <p className="text-[10px] text-[#706873]">
            By continuing, you acknowledge our{' '}
            <Link to="/policies" className="underline hover:text-[#280030]">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/policies" className="underline hover:text-[#280030]">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

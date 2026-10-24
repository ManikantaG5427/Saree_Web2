import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, User, Mail, Phone, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Logo, FloralMotif } from '../assets/Logo.jsx';

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const isRegisterInit = location.pathname === '/register';
  const [isRegister, setIsRegister] = useState(isRegisterInit);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isRegister) {
      if (!name || !email || !password) {
        setError('Please complete all required fields.');
        setLoading(false);
        return;
      }
      const res = await register(name, email, password, phone);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.error || 'Registration failed.');
      }
    } else {
      if (!email || !password) {
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }
      const res = await login(email, password);
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
    setLoading(false);
  };

  const autofillAdmin = () => {
    setIsRegister(false);
    setEmail('admin@slshweaves.com');
    setPassword('admin123');
    setError('');
  };

  const autofillCustomer = () => {
    setIsRegister(false);
    setEmail('pooja.reddy@gmail.com');
    setPassword('customer123');
    setError('');
  };

  return (
    <div className="bg-[#FFF8F0] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-white border border-[#E8DFE5] rounded-xs p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <Logo variant="emblem" className="w-12 h-12 mx-auto" />
          </Link>
          <h1 className="font-serif text-2xl font-bold text-[#280030]">
            {isRegister ? 'Create Your Patron Account' : 'Welcome to SLSH Weaves'}
          </h1>
          <p className="text-xs text-[#706873]">
            {isRegister
              ? 'Join our patron list for order tracking and private festive drops.'
              : 'Sign in to access your saved drapes, addresses, and orders.'}
          </p>
        </div>

        {/* 1-Click Quick Demo Autofill Bar */}
        <div className="p-3 bg-[#FFF8F0] border border-[#F0C860]/50 rounded-xs flex items-center justify-between gap-2 text-xs">
          <span className="text-[11px] font-bold text-[#280030]">Quick Sign-In:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={autofillAdmin}
              className="px-2.5 py-1 bg-[#280030] text-[#F0C860] font-bold rounded-xs text-[10px] uppercase tracking-wider hover:bg-[#3b0347] cursor-pointer"
            >
              ✦ Admin Auto-Fill
            </button>
            <button
              type="button"
              onClick={autofillCustomer}
              className="px-2 py-1 bg-white border border-[#E8DFE5] text-[#280030] font-semibold rounded-xs text-[10px] hover:border-[#280030] cursor-pointer"
            >
              Customer Auto-Fill
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block font-semibold text-[#29232A] mb-1">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
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
                className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
              />
              <Mail className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block font-semibold text-[#29232A] mb-1">Phone Number (for Courier OTP)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
                />
                <Phone className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-semibold text-[#29232A] mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030]"
              />
              <Lock className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4 text-[#F0C860]" />
          </button>
        </form>

        {/* Toggle Login / Register */}
        <div className="text-center pt-2 border-t border-[#E8DFE5] text-xs text-[#706873]">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-[#280030] font-bold underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to Sri Lakshmi Saree House?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-[#280030] font-bold underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Lock, 
  User, 
  Mail, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  Send, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { Logo } from '../assets/Logo.jsx';

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, requestPasswordResetCode, verifyResetCodeAndSetPassword } = useAuth();

  const isRegisterInit = location.pathname === '/register';
  const [authMode, setAuthMode] = useState(isRegisterInit ? 'register' : 'login'); // 'login' | 'register' | 'forgot'

  // Forgot password sub-step: 1 = Email submission & check, 2 = Enter code & new password
  const [forgotStep, setForgotStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('');
  const [isNotRegisteredError, setIsNotRegisteredError] = useState(false);

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

  // Switch to Registration pre-filling the entered email
  const handleSwitchToRegister = () => {
    setAuthMode('register');
    setForgotStep(1);
    setIsNotRegisteredError(false);
    setError('');
    setSuccessMsg('Please complete your registration below. Once created, you can log in.');
  };

  // STEP 1 of Forgot Password: Request verification code (strictly for registered emails)
  const handleRequestResetCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsNotRegisteredError(false);

    if (!email || !validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    const res = await requestPasswordResetCode(email);
    setLoading(false);

    if (res.success) {
      setForgotStep(2);
      setSimulatedCode(res.code || '');
      setSuccessMsg(`Secure 6-digit verification code sent to ${email}. Check your email to proceed.`);
    } else {
      if (res.notRegistered) {
        setIsNotRegisteredError(true);
      }
      setError(res.error || 'Failed to dispatch verification code.');
    }
  };

  // STEP 2 of Forgot Password: Enter verification code and update password
  const handleVerifyAndResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!verificationCode || verificationCode.trim().length !== 6) {
      setError('Please enter the 6-digit verification code sent to your email.');
      return;
    }

    if (password.length < 6) {
      setError('New password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('New passwords do not match. Please verify both fields.');
      return;
    }

    setLoading(true);
    const res = await verifyResetCodeAndSetPassword(email, verificationCode, password);
    setLoading(false);

    if (res.success) {
      setSuccessMsg('Your password has been verified and updated! Please sign in with your new credentials.');
      setPassword('');
      setConfirmPassword('');
      setVerificationCode('');
      setSimulatedCode('');
      setForgotStep(1);
      
      // Auto-transition to login mode after 2 seconds
      setTimeout(() => {
        setAuthMode('login');
      }, 2000);
    } else {
      setError(res.error || 'Failed to verify code.');
    }
  };

  // Standard Login / Registration Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsNotRegisteredError(false);

    if (!validateEmail(email)) {
      setError('Please provide a valid email address (e.g. name@domain.com).');
      return;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full legal name.');
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
              ? forgotStep === 1
                ? 'Verify Registered Email'
                : 'Reset Account Password'
              : 'Sign In to Sri Lakshmi Saree House'}
          </h1>
          <p className="text-xs text-[#706873]">
            {authMode === 'register'
              ? 'Join our verified patron list for order tracking, wishlist syncing, and bespoke drapes.'
              : authMode === 'forgot'
              ? forgotStep === 1
                ? 'Password reset is reserved for verified registered patrons only.'
                : `Enter the 6-digit verification code sent to ${email}.`
              : 'Sign in to access your saved drapes, addresses, and tracking.'}
          </p>
        </div>

        {/* Not-Registered Prompt Card (Strictly Enforced) */}
        {isNotRegisteredError && authMode === 'forgot' && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs space-y-2.5">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-900">Email Not Registered</p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  We have no patron record for <strong className="font-semibold">{email}</strong>. Password reset is only available for registered emails.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSwitchToRegister}
              className="w-full py-2 bg-[#280030] hover:bg-[#3b0347] text-[#F0C860] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-4 h-4 text-[#F0C860]" />
              <span>Register First with This Email</span>
            </button>
          </div>
        )}

        {/* Standard Status Alerts */}
        {error && !isNotRegisteredError && (
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

        {/* Simulated Email Verification Code Alert (in demo for smooth testing) */}
        {simulatedCode && forgotStep === 2 && (
          <div className="p-3 bg-[#280030] text-[#FFF8F0] border border-[#F0C860]/40 rounded-xs text-xs space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#F0C860] font-bold uppercase tracking-wider">
              <span>Secure Inbox Simulation</span>
              <span>15m Expiry</span>
            </div>
            <p className="text-[11px] text-stone-300">
              Your 6-digit verification code is: <span className="font-mono font-bold text-base text-[#F0C860] ml-1 tracking-widest">{simulatedCode}</span>
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* FORGOT PASSWORD WORKFLOW (STRICT REGISTERED EMAIL VERIFICATION) */}
        {/* ============================================================== */}
        {authMode === 'forgot' ? (
          forgotStep === 1 ? (
            /* STEP 1: Verify Registered Email */
            <form onSubmit={handleRequestResetCode} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">Registered Patron Email *</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsNotRegisteredError(false);
                      setError('');
                    }}
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                  />
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
                </div>
                <p className="text-[11px] text-[#706873] mt-1">
                  Only enrolled email addresses will receive a secure verification link and code.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#280030] hover:bg-[#3b0347] text-[#FFF8F0] font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#F0C860]" />
                <span>{loading ? 'Verifying Registration...' : 'Send Verification Code'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                    setIsNotRegisteredError(false);
                  }}
                  className="text-xs text-[#280030] font-semibold hover:underline"
                >
                  ← Return to Sign In
                </button>
              </div>
            </form>
          ) : (
            /* STEP 2: Enter Verification Code & Set New Password */
            <form onSubmit={handleVerifyAndResetPassword} className="space-y-4 text-xs">
              <div className="p-2.5 bg-[#FFF8F0] border border-[#E8DFE5] rounded-xs flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate">
                  <Mail className="w-4 h-4 text-[#280030] shrink-0" />
                  <span className="font-semibold text-[#280030] truncate">{email}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForgotStep(1);
                    setError('');
                  }}
                  className="text-[11px] text-[#BD3D78] hover:underline shrink-0 font-medium"
                >
                  Change Email
                </button>
              </div>

              <div>
                <label className="block font-semibold text-[#29232A] mb-1">6-Digit Verification Code *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 123456"
                    className="w-full pl-9 pr-3 py-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none font-mono text-base tracking-widest text-[#280030]"
                  />
                  <KeyRound className="absolute left-3 top-3 w-4 h-4 text-[#706873]" />
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
                <span>{loading ? 'Verifying & Updating...' : 'Verify Code & Set Password'}</span>
                <ArrowRight className="w-4 h-4 text-[#F0C860]" />
              </button>

              <div className="flex items-center justify-between pt-2 text-xs">
                <button
                  type="button"
                  onClick={handleRequestResetCode}
                  className="text-[#280030] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Code</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setForgotStep(1);
                    setError('');
                  }}
                  className="text-[#706873] hover:text-[#280030] hover:underline"
                >
                  Return to Sign In
                </button>
              </div>
            </form>
          )
        ) : (
          /* ============================================================== */
          /* STANDARD SIGN IN OR REGISTRATION FORM                         */
          /* ============================================================== */
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <div>
                <label className="block font-semibold text-[#29232A] mb-1">Full Legal Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
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
                      setForgotStep(1);
                      setIsNotRegisteredError(false);
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
          <span>256-bit SSL encrypted • Registered emails only</span>
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
                  setIsNotRegisteredError(false);
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
                  setIsNotRegisteredError(false);
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

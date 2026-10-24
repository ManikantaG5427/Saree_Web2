import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'slsh_weaves_auth_user';

const PATRONS_KEY = 'slsh_registered_patrons_v2';
const LOCKOUT_KEY = 'slsh_auth_lockout';

const DEFAULT_PATRONS = [
  {
    id: 'admin-001',
    name: 'Venkateshwarlu (Proprietor)',
    email: 'admin@slshweaves.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 94902 14533',
    addresses: [
      {
        id: 'addr-store',
        name: 'Sri Lakshmi Saree House',
        phone: '+91 98482 02134',
        addressLine1: 'H.No. 12-118 & 124, P&T Colony Main Road',
        city: 'Dilsukhnagar, Hyderabad',
        state: 'Telangana',
        postalCode: '500060',
        isDefault: true,
      },
    ],
  },
  {
    id: 'cust-001',
    name: 'Pooja Reddy',
    email: 'pooja.reddy@gmail.com',
    password: 'customer123',
    role: 'customer',
    phone: '+91 98765 43210',
    addresses: [
      {
        id: 'addr-1',
        name: 'Pooja Reddy',
        phone: '+91 98765 43210',
        addressLine1: 'Plot 42, Jubilee Hills Road No 10',
        city: 'Hyderabad',
        state: 'Telangana',
        postalCode: '500033',
        isDefault: true,
      },
    ],
  },
];

function getStoredPatrons() {
  try {
    const raw = localStorage.getItem(PATRONS_KEY);
    if (!raw) {
      localStorage.setItem(PATRONS_KEY, JSON.stringify(DEFAULT_PATRONS));
      return DEFAULT_PATRONS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PATRONS;
  }
}

function saveStoredPatrons(patrons) {
  try {
    localStorage.setItem(PATRONS_KEY, JSON.stringify(patrons));
  } catch (err) {
    console.error('Failed to persist patrons', err);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const checkRateLimit = () => {
    try {
      const lockoutRaw = localStorage.getItem(LOCKOUT_KEY);
      if (lockoutRaw) {
        const lockout = JSON.parse(lockoutRaw);
        if (lockout.lockedUntil && Date.now() < lockout.lockedUntil) {
          const remainingSecs = Math.ceil((lockout.lockedUntil - Date.now()) / 1000);
          return `Security lockout in effect. Too many failed attempts. Please retry in ${remainingSecs}s.`;
        }
      }
    } catch {
      // ignore
    }
    return null;
  };

  const recordFailedAttempt = () => {
    try {
      const lockoutRaw = localStorage.getItem(LOCKOUT_KEY);
      const data = lockoutRaw ? JSON.parse(lockoutRaw) : { attempts: 0, lockedUntil: null };
      const attempts = (data.attempts || 0) + 1;
      if (attempts >= 5) {
        const lockedUntil = Date.now() + 60 * 1000; // 60s cooldown
        localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts: 0, lockedUntil }));
        return 'Too many consecutive failed attempts. Login locked for 60 seconds for security.';
      } else {
        localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ attempts, lockedUntil: null }));
      }
    } catch {
      // ignore
    }
    return null;
  };

  const clearFailedAttempts = () => {
    try {
      localStorage.removeItem(LOCKOUT_KEY);
    } catch {
      // ignore
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Check rate limiting
    const rateLimitError = checkRateLimit();
    if (rateLimitError) {
      setIsLoading(false);
      return { success: false, error: rateLimitError };
    }

    try {
      const patrons = getStoredPatrons();
      const matched = patrons.find((p) => p.email.toLowerCase() === cleanEmail);

      if (!matched) {
        const lockoutMsg = recordFailedAttempt();
        setIsLoading(false);
        return {
          success: false,
          error: lockoutMsg || 'No patron account registered with this email. Please create an account.',
        };
      }

      if (matched.password !== cleanPass) {
        const lockoutMsg = recordFailedAttempt();
        setIsLoading(false);
        return {
          success: false,
          error: lockoutMsg || 'Incorrect password entered. Please verify or use Forgot Password.',
        };
      }

      // Successful authentication
      clearFailedAttempts();
      const { password: _, ...safeUser } = matched;
      setUser(safeUser);
      setIsLoading(false);
      return { success: true, user: safeUser };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Authentication error.' };
    }
  };

  const register = async (name, email, password, phone) => {
    setIsLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanEmail || !cleanPass || !name) {
      setIsLoading(false);
      return { success: false, error: 'Full name, email, and password are required.' };
    }

    if (cleanPass.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'Password must contain at least 6 characters.' };
    }

    try {
      const patrons = getStoredPatrons();
      const existing = patrons.find((p) => p.email.toLowerCase() === cleanEmail);

      if (existing) {
        setIsLoading(false);
        return {
          success: false,
          error: 'An account with this email address already exists. Please sign in instead.',
        };
      }

      const newPatron = {
        id: 'cust-' + Date.now(),
        name: name.trim(),
        email: cleanEmail,
        password: cleanPass,
        phone: phone ? phone.trim() : '+91 98765 43210',
        role: 'customer',
        createdAt: new Date().toISOString(),
        addresses: [],
      };

      const updated = [...patrons, newPatron];
      saveStoredPatrons(updated);

      clearFailedAttempts();
      const { password: _, ...safeUser } = newPatron;
      setUser(safeUser);
      setIsLoading(false);
      return { success: true, user: safeUser };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Account registration failed.' };
    }
  };

  const resetPassword = async (email, newPassword) => {
    setIsLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (newPassword || '').trim();

    if (cleanPass.length < 6) {
      setIsLoading(false);
      return { success: false, error: 'New password must be at least 6 characters long.' };
    }

    try {
      const patrons = getStoredPatrons();
      const index = patrons.findIndex((p) => p.email.toLowerCase() === cleanEmail);

      if (index === -1) {
        setIsLoading(false);
        return { success: false, error: 'No account registered with this email address.' };
      }

      patrons[index].password = cleanPass;
      saveStoredPatrons(patrons);
      clearFailedAttempts();

      setIsLoading(false);
      return { success: true, message: 'Password has been securely reset. You can now sign in.' };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Failed to reset password.' };
    }
  };

  const deleteAccount = async () => {
    if (!user) return { success: false, error: 'Not logged in.' };
    try {
      const patrons = getStoredPatrons();
      const filtered = patrons.filter((p) => p.id !== user.id && p.email !== user.email);
      saveStoredPatrons(filtered);
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (data) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);

    // Sync to stored patrons
    const patrons = getStoredPatrons();
    const index = patrons.findIndex((p) => p.id === user.id);
    if (index !== -1) {
      patrons[index] = { ...patrons[index], ...data };
      saveStoredPatrons(patrons);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!user) return { success: false, error: 'Not logged in.' };
    const cleanNew = (newPassword || '').trim();
    if (cleanNew.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }

    const patrons = getStoredPatrons();
    const matched = patrons.find((p) => p.id === user.id);
    if (!matched || matched.password !== currentPassword.trim()) {
      return { success: false, error: 'Current password is incorrect.' };
    }

    matched.password = cleanNew;
    saveStoredPatrons(patrons);
    return { success: true, message: 'Password updated successfully.' };
  };

  const addAddress = (newAddress) => {
    if (!user) return;
    const addressWithId = {
      ...newAddress,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses?.length === 0 ? true : !!newAddress.isDefault,
    };
    const updated = [...(user.addresses || []), addressWithId];
    updateProfile({ addresses: updated });
  };

  const deleteAddress = (addressId) => {
    if (!user) return;
    const filtered = (user.addresses || []).filter((a) => a.id !== addressId);
    updateProfile({ addresses: filtered });
  };

  const setDefaultAddress = (addressId) => {
    if (!user) return;
    const updated = (user.addresses || []).map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    updateProfile({ addresses: updated });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        resetPassword,
        deleteAccount,
        changePassword,
        updateProfile,
        addAddress,
        deleteAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

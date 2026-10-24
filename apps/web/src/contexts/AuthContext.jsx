import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'slsh_weaves_auth_user';

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

  const login = async (email, password) => {
    setIsLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    try {
      // Direct Admin Credentials Check
      if (cleanEmail === 'admin@slshweaves.com' && cleanPass === 'admin123') {
        const adminUser = {
          id: 'admin-001',
          name: 'Venkateshwarlu (Proprietor)',
          email: 'admin@slshweaves.com',
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
        };
        setUser(adminUser);
        setIsLoading(false);
        return { success: true, user: adminUser };
      }

      // Customer check or offline demo customer
      const customerUser = {
        id: 'cust-' + Date.now(),
        name: cleanEmail.split('@')[0].toUpperCase(),
        email: cleanEmail,
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
      };
      setUser(customerUser);
      setIsLoading(false);
      return { success: true, user: customerUser };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (name, email, password, phone) => {
    setIsLoading(true);
    try {
      const newUser = {
        id: 'cust-' + Date.now(),
        name,
        email: email.trim().toLowerCase(),
        phone: phone || '+91 98765 43210',
        role: 'customer',
        addresses: [],
      };
      setUser(newUser);
      setIsLoading(false);
      return { success: true, user: newUser };
    } catch (err) {
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (data) => {
    if (!user) return;
    setUser((prev) => ({ ...prev, ...data }));
  };

  const addAddress = (newAddress) => {
    if (!user) return;
    const addressWithId = {
      ...newAddress,
      id: 'addr-' + Date.now(),
      isDefault: user.addresses?.length === 0 ? true : !!newAddress.isDefault,
    };
    const updated = [...(user.addresses || []), addressWithId];
    setUser((prev) => ({ ...prev, addresses: updated }));
  };

  const deleteAddress = (addressId) => {
    if (!user) return;
    const filtered = (user.addresses || []).filter((a) => a.id !== addressId);
    setUser((prev) => ({ ...prev, addresses: filtered }));
  };

  const setDefaultAddress = (addressId) => {
    if (!user) return;
    const updated = (user.addresses || []).map((a) => ({
      ...a,
      isDefault: a.id === addressId,
    }));
    setUser((prev) => ({ ...prev, addresses: updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
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

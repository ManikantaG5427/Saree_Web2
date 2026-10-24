import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Package, ShieldCheck, Plus, Trash2, CheckCircle2, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Profile() {
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileMsg, setProfileMsg] = useState('');

  // Add Address Modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrLine1, setNewAddrLine1] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('Hyderabad');
  const [newAddrState, setNewAddrState] = useState('Telangana');
  const [newAddrPin, setNewAddrPin] = useState('');

  // Password state
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passMsg, setPassMsg] = useState('');

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile({ name, phone });
    setProfileMsg('Profile updated successfully.');
    setTimeout(() => setProfileMsg(''), 2500);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddrName || !newAddrLine1 || !newAddrPin) return;
    addAddress({
      name: newAddrName,
      phone: newAddrPhone || user?.phone,
      addressLine1: newAddrLine1,
      city: newAddrCity,
      state: newAddrState,
      postalCode: newAddrPin,
    });
    setIsAddAddressOpen(false);
    setNewAddrName('');
    setNewAddrLine1('');
    setNewAddrPin('');
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    if (!newPass) return;
    setPassMsg('Password updated successfully.');
    setCurrPass('');
    setNewPass('');
    setTimeout(() => setPassMsg(''), 2500);
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#280030]">Please Sign In</h2>
        <Link to="/login" className="mt-4 px-6 py-2.5 bg-[#280030] text-white text-xs font-semibold rounded-xs">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F0] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#280030]">Patron Account Dashboard</h1>
            <p className="text-xs text-[#706873] mt-0.5">Manage your personal profile, addresses, and order records.</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border border-[#E8DFE5] bg-white text-xs font-semibold text-[#BD3D78] hover:border-[#BD3D78] rounded-xs cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Navigation Sidebar (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-white border border-[#E8DFE5] rounded-xs p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E8DFE5]">
                <div className="w-12 h-12 rounded-full bg-[#280030] text-[#F0C860] flex items-center justify-center font-bold text-lg border border-[#F0C860]/40">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#280030] text-base">{user.name}</h3>
                  <p className="text-[11px] text-[#706873]">{user.email}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left p-2.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'profile' ? 'bg-[#280030] text-[#FFF8F0]' : 'text-[#706873] hover:bg-[#FFF8F0]'
                  }`}
                >
                  Profile & Contact
                </button>

                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left p-2.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'addresses' ? 'bg-[#280030] text-[#FFF8F0]' : 'text-[#706873] hover:bg-[#FFF8F0]'
                  }`}
                >
                  Saved Delivery Addresses
                </button>

                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full text-left p-2.5 rounded-xs transition-colors cursor-pointer ${
                    activeTab === 'password' ? 'bg-[#280030] text-[#FFF8F0]' : 'text-[#706873] hover:bg-[#FFF8F0]'
                  }`}
                >
                  Change Password
                </button>

                <Link
                  to="/account/orders"
                  className="block p-2.5 text-[#280030] hover:bg-[#FFF8F0] rounded-xs transition-colors"
                >
                  My Orders & Consignments →
                </Link>
              </div>
            </div>
          </div>

          {/* Tab Content Display (8 cols) */}
          <div className="md:col-span-8 bg-white border border-[#E8DFE5] rounded-xs p-6 sm:p-8 shadow-xs">
            {activeTab === 'profile' && (
              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                  Edit Personal Information
                </h2>

                {profileMsg && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xs">
                    {profileMsg}
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Email Address (Read-only)</label>
                  <input
                    type="email"
                    disabled
                    value={user.email}
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs bg-stone-50 text-stone-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#280030] text-[#FFF8F0] font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] transition-colors"
                >
                  Save Profile Changes
                </button>
              </form>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-5 text-xs">
                <div className="flex items-center justify-between border-b border-[#E8DFE5] pb-2">
                  <h2 className="font-serif text-lg font-bold text-[#280030]">Saved Delivery Addresses</h2>
                  <button
                    onClick={() => setIsAddAddressOpen(true)}
                    className="flex items-center gap-1 text-xs font-bold text-[#280030] bg-[#FFF8F0] border border-[#E8DFE5] px-3 py-1.5 rounded-xs hover:border-[#280030]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(user.addresses || []).length === 0 ? (
                    <p className="text-[#706873] py-6 text-center">No saved addresses. Click "Add New Address" above.</p>
                  ) : (
                    user.addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className={`p-4 border rounded-xs flex items-start justify-between gap-4 ${
                          addr.isDefault ? 'border-[#280030] bg-[#FFF8F0]' : 'border-[#E8DFE5]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#29232A]">{addr.name}</span>
                            {addr.isDefault && (
                              <span className="bg-[#280030] text-[#F0C860] px-2 py-0.2 rounded-xs text-[9px] font-bold uppercase tracking-wider">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-[#706873] mt-1">{addr.addressLine1}</p>
                          <p className="text-[#706873]">
                            {addr.city}, {addr.state} - {addr.postalCode}
                          </p>
                          <p className="text-[#706873] mt-1">Phone: {addr.phone}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          {!addr.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(addr.id)}
                              className="text-[11px] text-[#280030] font-semibold hover:underline"
                            >
                              Set as Default
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-[#BD3D78] hover:text-red-700 p-1"
                            title="Delete Address"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {isAddAddressOpen && (
                  <form onSubmit={handleAddAddress} className="border-t border-[#E8DFE5] pt-4 space-y-3">
                    <h3 className="font-serif text-sm font-bold text-[#280030]">New Shipping Address</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block mb-1 font-semibold">Recipient Name *</label>
                        <input
                          type="text"
                          required
                          value={newAddrName}
                          onChange={(e) => setNewAddrName(e.target.value)}
                          className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold">Phone *</label>
                        <input
                          type="tel"
                          value={newAddrPhone}
                          onChange={(e) => setNewAddrPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-1 font-semibold">Street & Landmark *</label>
                      <input
                        type="text"
                        required
                        value={newAddrLine1}
                        onChange={(e) => setNewAddrLine1(e.target.value)}
                        className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block mb-1 font-semibold">City</label>
                        <input
                          type="text"
                          value={newAddrCity}
                          onChange={(e) => setNewAddrCity(e.target.value)}
                          className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold">State</label>
                        <input
                          type="text"
                          value={newAddrState}
                          onChange={(e) => setNewAddrState(e.target.value)}
                          className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block mb-1 font-semibold">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={newAddrPin}
                          onChange={(e) => setNewAddrPin(e.target.value)}
                          className="w-full p-2 border border-[#E8DFE5] rounded-xs"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="px-4 py-2 border border-[#E8DFE5] rounded-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#280030] text-white font-semibold rounded-xs"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'password' && (
              <form onSubmit={handleChangePass} className="space-y-4 text-xs">
                <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                  Change Account Password
                </h2>

                {passMsg && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xs">
                    {passMsg}
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currPass}
                    onChange={(e) => setCurrPass(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29232A] mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full p-2.5 border border-[#E8DFE5] rounded-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#280030] text-[#FFF8F0] font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] transition-colors"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

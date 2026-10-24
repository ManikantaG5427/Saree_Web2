import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Package, ShieldCheck, Plus, Trash2, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, addAddress, deleteAddress, setDefaultAddress, logout, changePassword, deleteAccount } = useAuth();

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
  const [passError, setPassError] = useState('');

  // Delete Account Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteError, setDeleteError] = useState('');

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

  const handleChangePass = async (e) => {
    e.preventDefault();
    setPassMsg('');
    setPassError('');

    if (!currPass || !newPass) {
      setPassError('Please fill in both current and new passwords.');
      return;
    }

    if (newPass.length < 6) {
      setPassError('New password must contain at least 6 characters.');
      return;
    }

    const res = await changePassword(currPass, newPass);
    if (res.success) {
      setPassMsg('Account password has been successfully updated.');
      setCurrPass('');
      setNewPass('');
      setTimeout(() => setPassMsg(''), 3000);
    } else {
      setPassError(res.error || 'Failed to update password.');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toLowerCase() !== 'delete') {
      setDeleteError('Please type DELETE to confirm account removal.');
      return;
    }

    const res = await deleteAccount();
    if (res.success) {
      navigate('/', { replace: true });
    } else {
      setDeleteError(res.error || 'Failed to delete account.');
    }
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
              <div className="space-y-8">
                <form onSubmit={handleChangePass} className="space-y-4 text-xs bg-white border border-[#E8DFE5] p-5 rounded-xs">
                  <h2 className="font-serif text-lg font-bold text-[#280030] border-b border-[#E8DFE5] pb-2">
                    Change Account Password
                  </h2>

                  {passMsg && (
                    <div className="p-3 bg-green-50 border border-green-200 text-green-800 rounded-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      <span>{passMsg}</span>
                    </div>
                  )}

                  {passError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xs flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{passError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      placeholder="Enter existing password"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#29232A] mb-1">New Password (Min 6 chars) *</label>
                    <input
                      type="password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new secure password"
                      className="w-full p-2.5 border border-[#E8DFE5] rounded-xs focus:border-[#280030] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#280030] text-[#FFF8F0] font-bold uppercase tracking-wider rounded-xs hover:bg-[#3b0347] transition-colors cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>

                {/* Privacy & Account Deletion Zone */}
                <div className="bg-red-50/40 border border-red-200 p-5 rounded-xs space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <h3 className="font-serif font-bold text-red-900 text-sm">Danger Zone: Delete Patron Account</h3>
                      <p className="text-xs text-red-700">
                        Permanently deletes your registered patron credentials, saved delivery addresses, and personal profile from Sri Lakshmi Saree House records. This operation cannot be reversed.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setDeleteError('');
                      setDeleteConfirmText('');
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                  >
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full border border-red-300 rounded-xs p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-serif text-lg font-bold text-[#280030]">Confirm Account Deletion</h3>
            </div>

            <p className="text-xs text-[#706873]">
              Are you sure you want to permanently erase your patron account (<strong className="text-[#280030]">{user.email}</strong>)? All saved addresses and active sessions will be terminated immediately.
            </p>

            {deleteError && (
              <div className="p-2.5 bg-red-100 text-red-800 text-xs rounded-xs font-medium">
                {deleteError}
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#29232A]">
                To proceed, type <span className="font-mono text-red-600 font-bold">DELETE</span> below:
              </label>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full p-2.5 border border-[#E8DFE5] rounded-xs text-xs focus:border-red-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-[#E8DFE5] text-xs font-semibold rounded-xs hover:bg-[#FFF8F0] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xs cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

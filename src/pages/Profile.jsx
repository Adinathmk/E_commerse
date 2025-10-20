import React, { useState, useEffect } from 'react';
import {
  User, Mail, Phone, Edit, Camera, Check,
  ShoppingBag, HelpCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    orders: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user data from JSON Server
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosInstance.get(`/users?id=${currentUser.id}`);
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        toast.error('Failed to load user data');
      }
    };
    if (currentUser?.id) fetchUser();
  }, [currentUser?.id]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save changes to JSON Server
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await axiosInstance.patch(`/users/${currentUser.id}`, userData);
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      toast.error('Failed to update profile');
    }
  };

  // Get color for order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // User initials
  const getUserInitials = () => {
    const name = currentUser?.name || 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and order history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Personal Information
                </h2>
                <button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  {isEditing ? (
                    <>
                      <Check size={16} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit size={16} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-3xl">
                      {getUserInitials()}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                      <Camera size={16} className="text-gray-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {userData.name || 'User'}
                    </h3>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData.name || ''}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <User size={20} className="text-gray-400" />
                        <span className="text-gray-900">
                          {userData.name || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                      <Mail size={20} className="text-gray-400" />
                      <span className="text-gray-900">
                        {userData.email || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData.phone || ''}
                        onChange={(e) =>
                          handleInputChange('phone', e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    ) : (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <Phone size={20} className="text-gray-400" />
                        <span className="text-gray-900">
                          {userData.phone || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag size={20} className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
              </div>

              <div className="space-y-4">
                {userData.orders?.length > 0 ? (
                  userData.orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <ShoppingBag size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {order.orderId}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Placed on {new Date(order.date).toISOString().split("T")[0]}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ₹{order.totalAmount}
                        </p>
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No recent orders found
                  </p>
                )}
              </div>

              <button className="w-full mt-6 py-3 text-center text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
                View All Orders
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Account Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold text-gray-900">
                    {userData.orders?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Pending Orders</span>
                  <span className="font-semibold text-yellow-600">
                    {
                      userData.orders?.filter(
                        (o) => o.status === 'Processing'
                      ).length || 0
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                  <span className="text-gray-600">Loyalty Points</span>
                  <span className="font-semibold text-blue-600">1,250</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle size={20} className="text-blue-600" />
                <h3 className="font-semibold text-gray-900">Need Help?</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Our support team is here to help you with any questions.
              </p>
              <button className="w-full bg-white text-gray-900 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 border border-blue-200 shadow-sm">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

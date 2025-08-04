import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Save, 
  Camera, 
  Edit2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'notifications' | 'privacy'>('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    newCourses: true,
    certificateEarnedAlerts: true,
    achievements: true,
    reminders: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    allowMessages: false,
    allowNotifications: true,
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Password change failed:', error);
      toast.error('Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationUpdate = async (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success('Notification preferences updated');
  };

  const handlePrivacyUpdate = async (key: keyof typeof privacy, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast.success('Privacy settings updated');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4">
              {/* Mobile: Horizontal scroll tabs */}
              <div className="lg:hidden">
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'profile' | 'account' | 'notifications' | 'privacy')}
                        className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'bg-purple-100 text-purple-600 border border-purple-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Desktop: Vertical nav */}
              <nav className="hidden lg:block space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'profile' | 'account' | 'notifications' | 'privacy')}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-purple-50 text-purple-600 border border-purple-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Profile Information</h2>
                <p className="text-sm sm:text-base text-gray-600">Update your personal information and profile picture</p>
              </div>

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Profile Header with Avatar and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-4 sm:space-y-0 mb-8">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center">
                        {profileData.avatar ? (
                          <img 
                            src={profileData.avatar} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-2xl font-bold">
                            {profileData.firstName?.[0] || 'J'}
                          </span>
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                        <Camera className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {profileData.firstName || 'John'} {profileData.lastName || 'Doe'}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600">{profileData.email || 'johndoe@gmail.com'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <button
                      type="button"
                      className="px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                    >
                      Mark as Completed
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="johndoe@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="+233 123 4567"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              {/* Change Password */}
              <div className="card p-4 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Change Password</h2>
                  <p className="text-sm sm:text-base text-gray-600">Update your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="confirm new password"
                    />
                  </div>

                  <div className="bg-blue-600 border border-blue-600 rounded-lg p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                      <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Password requirements:</p>
                        <ul className="text-xs sm:text-sm text-white mt-1 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Contains uppercase and lowercase letters</li>
                          <li>• Contains at least one number</li>
                          <li>• Contains at least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto px-6 py-2 sm:py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Updating...
                        </>
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Account Actions */}
              <div className="card p-4 sm:p-6">
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Account action</h2>
                  <p className="text-sm sm:text-base text-gray-600">Manage your account settings and data</p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-3 sm:space-y-0">
                    <div>
                      <h3 className="font-medium text-gray-900">Delete Account</h3>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors text-sm sm:text-base">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="card p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Notification Preferences</h2>
                <p className="text-sm sm:text-base text-gray-600">Choose what notifications you want to receive</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Course Updates</h3>
                    <p className="text-sm text-gray-600">
                      Get notified about course updates and new contentUpdates
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationUpdate('courseUpdates', !notifications.courseUpdates)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      notifications.courseUpdates ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.courseUpdates ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">New Courses</h3>
                    <p className="text-sm text-gray-600">
                      Be the first to know about new courses
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationUpdate('newCourses', !notifications.newCourses)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      notifications.newCourses ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.newCourses ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Certificate Earned Alerts</h3>
                    <p className="text-sm text-gray-600">
                      Get notified when you complete a course and your certificate is available.
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationUpdate('certificateEarnedAlerts', !notifications.certificateEarnedAlerts)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      notifications.certificateEarnedAlerts ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.certificateEarnedAlerts ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Achievements</h3>
                    <p className="text-sm text-gray-600">
                      Celebrate your progress and achievements
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationUpdate('achievements', !notifications.achievements)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      notifications.achievements ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.achievements ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Reminders</h3>
                    <p className="text-sm text-gray-600">
                      Helpful reminders to continue your learning
                    </p>
                  </div>
                  <button
                    onClick={() => handleNotificationUpdate('reminders', !notifications.reminders)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      notifications.reminders ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="card p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Privacy Settings</h2>
                <p className="text-sm sm:text-base text-gray-600">Control your privacy and data sharing preferences</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Allow Notifications</h3>
                    <p className="text-sm text-gray-600">
                      Receive browser notifications for important updates
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyUpdate('allowNotifications', !privacy.allowNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      privacy.allowNotifications ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.allowNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">Allow Messages</h3>
                    <p className="text-sm text-gray-600">
                      Let other users send you messages
                    </p>
                  </div>
                  <button
                    onClick={() => handlePrivacyUpdate('allowMessages', !privacy.allowMessages)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      privacy.allowMessages ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        privacy.allowMessages ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default SettingsPage;
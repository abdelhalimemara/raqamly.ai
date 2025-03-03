import React, { useState } from 'react';
import { User, Lock, Bell, Globe } from 'lucide-react';
import { User as UserType, updateUser } from '../utils/auth';

interface SettingsProps {
  user: UserType | null;
  onUpdateUser: (updatedUser: UserType) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [settings, setSettings] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    businessName: user?.businessName || '',
    language: 'English',
    notifications: true,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (user) {
      const updatedUser: UserType = {
        ...user,
        name: settings.fullName,
        email: settings.email,
        businessName: settings.businessName,
      };
      const response = updateUser(updatedUser);
      if (response.success && response.user) {
        onUpdateUser(response.user);
        alert('Settings updated successfully');
      } else {
        alert('Failed to update settings');
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Settings</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <User size={24} className="mr-2 text-highlight" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={settings.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={settings.businessName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>
            <div>
              <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
              <input
                type="text"
                id="subscriptionPlan"
                name="subscriptionPlan"
                value={user?.subscriptionPlan || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Lock size={24} className="mr-2 text-highlight" />
            Security
          </h3>
          <button type="button" className="bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors">
            Change Password
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Bell size={24} className="mr-2 text-highlight" />
            Notifications
          </h3>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={settings.notifications}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="notifications" className="text-sm font-medium text-gray-700">Receive email notifications</label>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Globe size={24} className="mr-2 text-highlight" />
            Language
          </h3>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleInputChange}
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
        <button type="submit" className="bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
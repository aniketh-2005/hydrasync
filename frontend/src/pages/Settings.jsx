import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GoalEditor from '../components/GoalEditor';
import { Settings as SettingsIcon, User, Target, LogOut } from 'lucide-react';

const Settings = () => {
  const { user, logout, updateGoal } = useAuth();
  const [goalLoading, setGoalLoading] = useState(false);

  const handleGoalUpdate = async (newGoal) => {
    setGoalLoading(true);
    try {
      const result = await updateGoal(newGoal);
      if (!result.success) {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error;
    } finally {
      setGoalLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 md:hidden">
              <SettingsIcon className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Goal Settings */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Water Goal</h2>
            <p className="text-gray-600 mb-4">
              Set your daily water intake goal. This helps track your hydration progress and motivates you to stay healthy.
            </p>
            <GoalEditor
              currentGoal={user?.daily_goal || 2000}
              onUpdateGoal={handleGoalUpdate}
              loading={goalLoading}
            />
            
            <div className="mt-4 p-3 bg-primary-50 rounded-lg">
              <h3 className="font-medium text-primary-800 mb-2">Recommended Daily Intake</h3>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Adults: 2000-2500ml (8-10 cups)</li>
                <li>• Active individuals: 2500-3000ml (10-12 cups)</li>
                <li>• Hot weather: Add 500-750ml extra</li>
              </ul>
            </div>
          </div>

          {/* App Information */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About HydraSync</h2>
            <div className="space-y-2 text-gray-600">
              <p>Version 1.0.0</p>
              <p>Track your water intake and stay connected with friends for motivation.</p>
              <p className="text-sm">
                Features: Real-time updates, friend tracking, progress visualization, and goal setting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
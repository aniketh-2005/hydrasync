import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { waterAPI } from '../services/api';
import socketService from '../services/socket';
import ProgressBar from '../components/ProgressBar';
import WaterLogButton from '../components/WaterLogButton';
import GoalEditor from '../components/GoalEditor';
import { Droplets, Plus, Clock, LogOut, Settings } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, updateGoal } = useAuth();
  const [progress, setProgress] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [goalLoading, setGoalLoading] = useState(false);
  const [recentLogs, setRecentLogs] = useState([]);

  useEffect(() => {
    fetchProgress();
    
    // Listen for WebSocket updates
    const handleWaterUpdate = (data) => {
      // If it's an update from a friend, we don't need to refresh our own progress
      // But we could show a notification here
      console.log('Friend water update:', data);
    };

    socketService.on('waterUpdate', handleWaterUpdate);
    
    return () => {
      socketService.off('waterUpdate', handleWaterUpdate);
    };
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await waterAPI.getProgress();
      setProgress(response.data);
      setRecentLogs(response.data.logs.slice(0, 5)); // Show last 5 logs
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const logWater = async (amount) => {
    if (loading) return;
    
    setLoading(true);
    try {
      await waterAPI.logWater(amount);
      await fetchProgress(); // Refresh progress
      setCustomAmount(''); // Clear custom input
    } catch (error) {
      console.error('Error logging water:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomLog = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0 && amount <= 2000) {
      logWater(amount);
    }
  };

  const handleGoalUpdate = async (newGoal) => {
    setGoalLoading(true);
    try {
      const result = await updateGoal(newGoal);
      if (result.success) {
        // Refresh progress to reflect new goal
        await fetchProgress();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      throw error; // Re-throw to let GoalEditor handle the error display
    } finally {
      setGoalLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 md:hidden">
              <Droplets className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <Link
                to="/settings"
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Progress</h2>
              <ProgressBar
                current={progress.total_intake}
                goal={progress.daily_goal}
                className="mb-6"
              />
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary-600">
                  {progress.total_intake}ml
                </p>
                <p className="text-gray-600">of {progress.daily_goal}ml goal</p>
              </div>
              
              {/* Goal Editor */}
              <GoalEditor
                currentGoal={user?.daily_goal || 2000}
                onUpdateGoal={handleGoalUpdate}
                loading={goalLoading}
              />
            </div>

            {/* Water Logging Buttons */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Water Intake</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <WaterLogButton amount={100} onClick={logWater} loading={loading} />
                <WaterLogButton amount={250} onClick={logWater} loading={loading} />
                <WaterLogButton amount={500} onClick={logWater} loading={loading} />
              </div>
              
              {/* Custom Amount */}
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Custom amount (ml)"
                  className="input-field flex-1"
                  min="1"
                  max="2000"
                />
                <button
                  onClick={handleCustomLog}
                  disabled={loading || !customAmount}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              {recentLogs.length > 0 ? (
                <div className="space-y-3">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{log.amount}ml</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(log.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No water logged today</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Logs Today</span>
                  <span className="font-medium">{recentLogs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average per Log</span>
                  <span className="font-medium">
                    {recentLogs.length > 0 
                      ? Math.round(progress.total_intake / recentLogs.length)
                      : 0}ml
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-medium">
                    {Math.max(0, progress.daily_goal - progress.total_intake)}ml
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
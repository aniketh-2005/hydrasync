import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { friendsAPI } from '../services/api';
import socketService from '../services/socket';
import FriendCard from '../components/FriendCard';
import { Users, UserPlus, Mail, AlertCircle, CheckCircle } from 'lucide-react';

const Friends = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [friendsStatus, setFriendsStatus] = useState([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFriends();
    fetchFriendsStatus();
    
    // Listen for real-time updates
    const handleWaterUpdate = (data) => {
      // Update friend's status in real-time
      setFriendsStatus(prevStatus => 
        prevStatus.map(friendStatus => {
          if (friendStatus.friend.id === data.user_id) {
            return {
              ...friendStatus,
              current_intake: data.total,
              percentage: data.percentage,
              status: data.percentage >= 100 ? 'goal_reached' : 
                      data.percentage >= 50 ? 'halfway' : 'low'
            };
          }
          return friendStatus;
        })
      );
      
      // Show notification
      setMessage({
        type: 'info',
        text: `${data.user_name} logged water! Total: ${data.total}ml`
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    socketService.on('waterUpdate', handleWaterUpdate);
    
    return () => {
      socketService.off('waterUpdate', handleWaterUpdate);
    };
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await friendsAPI.getFriends();
      setFriends(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchFriendsStatus = async () => {
    try {
      const response = await friendsAPI.getFriendsStatus();
      setFriendsStatus(response.data);
    } catch (error) {
      console.error('Error fetching friends status:', error);
    }
  };

  const addFriend = async (e) => {
    e.preventDefault();
    if (!newFriendEmail.trim()) return;
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await friendsAPI.addFriend(newFriendEmail);
      setNewFriendEmail('');
      setMessage({ type: 'success', text: 'Friend added successfully!' });
      await fetchFriends();
      await fetchFriendsStatus();
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.detail || 'Failed to add friend' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 md:hidden">
              <Users className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-bold text-gray-900">Friends</h1>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">Friends</h1>
            </div>
            <div className="text-gray-600">
              {friends.length} friend{friends.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Friend Section */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Friend</h2>
          
          {message.text && (
            <div className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
              message.type === 'success' 
                ? 'bg-success-50 border border-success-200' 
                : message.type === 'error'
                ? 'bg-danger-50 border border-danger-200'
                : 'bg-primary-50 border border-primary-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-success-600" />
              ) : message.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-danger-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-primary-600" />
              )}
              <span className={`text-sm ${
                message.type === 'success' 
                  ? 'text-success-700' 
                  : message.type === 'error'
                  ? 'text-danger-700'
                  : 'text-primary-700'
              }`}>
                {message.text}
              </span>
            </div>
          )}
          
          <form onSubmit={addFriend} className="flex space-x-2">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                placeholder="Enter friend's email"
                className="input-field pl-10"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <UserPlus className="w-4 h-4" />
              <span>{loading ? 'Adding...' : 'Add Friend'}</span>
            </button>
          </form>
        </div>

        {/* Friends List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Friends</h2>
          
          {friendsStatus.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friendsStatus.map((friendStatus) => (
                <FriendCard
                  key={friendStatus.friend.id}
                  friend={friendStatus.friend}
                  currentIntake={friendStatus.current_intake}
                  dailyGoal={friendStatus.daily_goal}
                  status={friendStatus.status}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No friends yet</h3>
              <p className="text-gray-600 mb-4">
                Add friends to see their hydration progress and stay motivated together!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Friends;
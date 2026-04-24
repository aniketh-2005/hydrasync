import React from 'react';
import { User, Droplets } from 'lucide-react';

const FriendCard = ({ friend, currentIntake, dailyGoal, status }) => {
  const percentage = Math.min((currentIntake / dailyGoal) * 100, 100);
  
  const getStatusColor = () => {
    switch (status) {
      case 'goal_reached':
        return 'text-success-600 bg-success-50 border-success-200';
      case 'halfway':
        return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'low':
        return 'text-danger-600 bg-danger-50 border-danger-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'goal_reached':
        return 'Goal Reached!';
      case 'halfway':
        return 'Halfway There';
      case 'low':
        return 'Just Started';
      default:
        return 'No Data';
    }
  };

  const getProgressColor = () => {
    if (percentage >= 100) return 'bg-success-500';
    if (percentage >= 50) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{friend.name}</h3>
            <p className="text-sm text-gray-500">{friend.email}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Droplets className="w-4 h-4 text-primary-500" />
            <span className="text-gray-600">Progress</span>
          </div>
          <span className="font-medium text-gray-900">
            {currentIntake}ml / {dailyGoal}ml
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {percentage.toFixed(1)}% Complete
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
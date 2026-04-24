import React from 'react';

const ProgressBar = ({ current, goal, className = '' }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  const getColor = () => {
    if (percentage >= 100) return 'bg-success-500';
    if (percentage >= 50) return 'bg-warning-500';
    return 'bg-danger-500';
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>{current}ml</span>
        <span>{goal}ml</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`h-4 rounded-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center mt-2 text-sm font-medium text-gray-700">
        {percentage.toFixed(1)}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;
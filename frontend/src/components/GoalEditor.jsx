import React, { useState } from 'react';
import { Target, Check, X, Edit3 } from 'lucide-react';

const GoalEditor = ({ currentGoal, onUpdateGoal, loading = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(currentGoal);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (newGoal < 500 || newGoal > 5000) {
      setError('Goal must be between 500ml and 5000ml');
      return;
    }

    try {
      await onUpdateGoal(newGoal);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update goal');
    }
  };

  const handleCancel = () => {
    setNewGoal(currentGoal);
    setIsEditing(false);
    setError('');
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Target className="w-5 h-5 text-primary-600" />
          <span className="text-gray-700">Daily Goal: {currentGoal}ml</span>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2 mb-2">
        <Target className="w-5 h-5 text-primary-600" />
        <span className="text-gray-700 font-medium">Update Daily Goal</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={newGoal}
          onChange={(e) => setNewGoal(parseInt(e.target.value) || 0)}
          className="input-field flex-1"
          min="500"
          max="5000"
          step="50"
          placeholder="Enter goal in ml"
        />
        <span className="text-gray-500 text-sm">ml</span>
        
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary px-3 py-1 text-sm disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
        </button>
        
        <button
          onClick={handleCancel}
          disabled={loading}
          className="btn-secondary px-3 py-1 text-sm disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {error && (
        <p className="text-danger-600 text-sm mt-2">{error}</p>
      )}
      
      <p className="text-gray-500 text-xs mt-1">
        Goal should be between 500ml and 5000ml
      </p>
    </div>
  );
};

export default GoalEditor;
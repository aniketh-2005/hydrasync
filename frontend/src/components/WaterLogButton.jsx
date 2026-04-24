import React from 'react';
import { Droplets } from 'lucide-react';

const WaterLogButton = ({ amount, onClick, loading = false }) => {
  return (
    <button
      onClick={() => onClick(amount)}
      disabled={loading}
      className="flex flex-col items-center justify-center p-4 bg-primary-50 hover:bg-primary-100 border-2 border-primary-200 hover:border-primary-300 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Droplets className="w-8 h-8 text-primary-600 mb-2" />
      <span className="text-lg font-semibold text-primary-700">
        {amount}ml
      </span>
    </button>
  );
};

export default WaterLogButton;
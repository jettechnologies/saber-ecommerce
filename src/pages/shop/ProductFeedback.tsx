import React from 'react';
import FeedbackForm from '@/components/FeedbackForm';

const ProductFeedback: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Product Feedback</h1>
        <FeedbackForm />
      </div>
    </div>
  );
};

export default ProductFeedback;

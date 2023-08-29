import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';
import { createApplication, getAuthInstance } from '../../Services/FirebaseService';

function Apply() {
  const [helpText, setHelpText] = useState('');
  const [visionGoalsText, setVisionGoalsText] = useState('');

  const handleHelpTextChange = (e) => {
    setHelpText(e.target.value);
  };

  const handleVisionGoalsTextChange = (e) => {
    setVisionGoalsText(e.target.value);
  };

  const handleSubmit = () => {
    createApplication(getAuthInstance().currentUser.uid, helpText, visionGoalsText)
  };

  const isFormValid = () => {
    const minWordCount = 25;
    return (
      helpText.split(/\s+/).filter(Boolean).length >= minWordCount &&
      visionGoalsText.split(/\s+/).filter(Boolean).length >= minWordCount
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Join Our Movement</h2>
        <label className="block mb-2 text-gray-700">How will you help us?</label>
        <textarea
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Tell us how you'll contribute..."
          value={helpText}
          onChange={handleHelpTextChange}
        ></textarea>
        <p className="text-gray-500 text-sm mt-1">
          Minimum {isFormValid() ? '' : '25 '}word{isFormValid() ? '' : 's'} required.
        </p>
        <label className="block mt-4 mb-2 text-gray-700">What's your vision and goals?</label>
        <textarea
          className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
          rows="4"
          placeholder="Share your aspirations..."
          value={visionGoalsText}
          onChange={handleVisionGoalsTextChange}
        ></textarea>
        <p className="text-gray-500 text-sm mt-1">
          Minimum {isFormValid() ? '' : '25 '}word{isFormValid() ? '' : 's'} required.
        </p>
        <button
          className={`mt-6 w-full py-3 rounded-md font-semibold text-white ${
            isFormValid() ? 'bg-blue-500 hover:bg-blue-600 focus:ring focus:ring-blue-300' : 'bg-gray-300 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Submit Application
        </button>
        <BackButton />
      </div>
    </div>
  );
}

export default Apply;

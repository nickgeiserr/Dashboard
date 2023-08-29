import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";

const ChapterApplication = () => {
  const [chapterId, setChapterId] = useState("");
  const [applicationText, setApplicationText] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Call your function to submit the application here

    setChapterId("");
    setApplicationText("");
    setSubmitMessage("Application submitted successfully!");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Apply for Chapter Membership
        </h2>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="chapterId" className="block text-sm font-medium text-gray-700">
              Chapter ID
            </label>
            <input
              type="text"
              id="chapterId"
              className="mt-1 p-2 border rounded w-full"
              value={chapterId}
              onChange={(e) => setChapterId(e.target.value)}
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Confused?{" "}
              <a
                href="https://theacyu.com/blog/posts/what-is-a-chapter/"
                className="text-blue-500"
              >
                Learn more
              </a>
            </p>
          </div>
          <div>
            <label
              htmlFor="applicationText"
              className="block text-sm font-medium text-gray-700"
            >
              Tell us why you should be accepted
            </label>
            <textarea
              id="applicationText"
              className="mt-1 p-2 border rounded w-full h-24"
              value={applicationText}
              onChange={(e) => setApplicationText(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors"
          >
            Submit Application
          </button>
          {submitMessage && (
            <p className="mt-2 text-center text-gray-600">{submitMessage}</p>
          )}
        </form>
        <p className="mt-4 text-center text-gray-500 text-xs">
          Please note that submitting an application does not guarantee membership.
        </p>
        <div className="mt-4 text-center">
            <BackButton />
        </div>
      </div>
    </div>
  );
};

export default ChapterApplication;

import React, { useState } from "react";
import fetchChapterById from "../../Services/FirebaseService.js";
import { Link } from "react-router-dom";
import BackButton from "../BackButton";

const ChapterLookup = () => {
  const [chapterId, setChapterId] = useState("");
  const [chapterData, setChapterData] = useState(null);

  const handleLookup = async () => {
    if (chapterId) {
      const data = await fetchChapterById(chapterId);
      setChapterData(data);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Chapter Lookup
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="chapterId"
              className="block text-sm font-medium text-gray-700"
            >
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
          </div>
          <button
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors w-full"
            onClick={handleLookup}
          >
            Look Up Chapter
          </button>
          {chapterData && (
            <div className="border-t mt-4 pt-4">
              <h3 className="text-lg font-semibold mb-2">Chapter Information</h3>
              <p>
                <strong>Chapter ID:</strong> {chapterId}
              </p>
              <p>
                <strong>Name:</strong> {chapterData.name}
              </p>
              <p>
                <strong>City:</strong> {chapterData.city}
              </p>
              <p>
                <strong>State:</strong> {chapterData.state}
              </p>
              <p>
                <strong>Description:</strong> {chapterData.description}
              </p>
            </div>
          )}
          <button
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition-colors w-full mt-4"
            onClick={() => setChapterData(null)}
          >
            Clear Results
          </button>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default ChapterLookup;

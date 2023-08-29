import React, { useState, useEffect } from 'react';
import { fetchAnnouncements } from '../../Services/FirebaseService.js';
import BackButton from '../BackButton';

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchAnnouncements().then(data => {
      setAnnouncements(data);
    });
  }, []);

  const visibleAnnouncements = showAll ? announcements : announcements.slice(0, 2);

  return (
    <div className="bg-gray-900 min-h-screen p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Announcements</h2>
        {visibleAnnouncements.map(announcement => (
          <div key={announcement.id} className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{announcement.title}</h3>
            <p className="text-gray-600 mb-2">{announcement.content}</p>
            <p className="text-gray-400 text-sm">
              {announcement.date.toDate().toLocaleString()} by {announcement.author}
            </p>
          </div>
        ))}
        {!showAll && announcements.length > 2 && (
          <button
            className="text-blue-500 hover:underline focus:outline-none"
            onClick={() => setShowAll(true)}
          >
            Show More
          </button>
        )}

        <BackButton />
      </div>
    </div>
  );
};

export default AnnouncementsPage;

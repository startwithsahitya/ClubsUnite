import React from "react";

const ClubAnnouncement = ({ title, date, content, author }) => {
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
        <p className="text-base leading-relaxed">{content}</p>
        <div className="mt-4 text-right">
          <span className="text-sm text-gray-300">- {author}</span>
        </div>
      </div>
    </div>
  );
};

export default ClubAnnouncement;

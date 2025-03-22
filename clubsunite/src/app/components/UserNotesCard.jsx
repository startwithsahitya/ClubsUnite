import React, { useState } from "react";

/**
 * @param {string} avatar - The URL of the user's avatar image
 * @param {string} name - The user's name
 * @param {string} role - The user's role or designation
 * @param {string} content - The user's note/message
 */
const UserNotesCard = ({ avatar, name, role, content }) => {
  const [driveLink, setDriveLink] = useState("");

  // Ask the user for a Google Drive link
  const handleUploadClick = () => {
    const link = prompt("Please enter your Google Drive link:");
    if (link) {
      setDriveLink(link);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 text-white p-4 rounded-lg flex items-start">
      {/* Avatar */}
      <img
        src={avatar}
        alt="User Avatar"
        className="w-12 h-12 rounded-full mr-4 object-cover"
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header: Name & Role, plus Upload Icon */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-base">{name}</h3>
            <p className="text-xs text-gray-400">{role}</p>
          </div>

          {/* Upload Icon Button */}
          <button
            onClick={handleUploadClick}
            className="p-2 text-gray-400 hover:text-gray-200"
            aria-label="Enter Google Drive Link"
          >
            {/* Simple upload icon (SVG) */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 
2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>

        {/* Content / Notes */}
        <p className="mt-2 text-sm">{content}</p>

        {/* Display Google Drive link if provided */}
        {driveLink && (
          <div className="mt-2 text-xs text-gray-300">
            Google Drive Link:{" "}
            <a
              href={driveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              {driveLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotesCard;

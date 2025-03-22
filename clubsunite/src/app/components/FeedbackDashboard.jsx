"use client";

import React, { useState, useEffect } from "react";

// Define the feedback categories (headers in your Google Sheet)
const categories = [
  "Organisation & Management",
  "Venue & Accessibility",
  "Hospitality & Comfort",
  "Networking Opportunities",
  "Value for Time & Money",
  "Overall Event Experience"
];

function GoogleFormLink() {
  const [formLink, setFormLink] = useState("");

  useEffect(() => {
    // Set the Google Form URL.
    // Replace this URL with your actual Google Form URL if needed.
    setFormLink("https://forms.gle/tj9sPp9Cw11dYnSe7");
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(formLink)
      .then(() => alert("Form URL copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold text-white">Google Form</span>
        <input
          type="text"
          value={formLink}
          readOnly
          className="bg-gray-700 text-white px-3 py-1 rounded-md w-full ml-4"
        />
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit"
        >
          Copy URL
        </button>
        <a
          href={formLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline w-fit"
        >
          Open Form
        </a>
      </div>
    </div>
  );
}

export default function FeedbackDashboard() {
  const [ratings, setRatings] = useState([]);
  const [responseCount, setResponseCount] = useState(0);

  // Your Sheet.best API endpoint (make sure your sheet is configured correctly)
  const API_URL =
    "https://api.sheetbest.com/sheets/146fa77a-f414-454f-a2ba-b6905e04c8e8";

  const fetchData = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // Calculate average ratings for each category
        const averages = categories.map((category) => {
          const total = data.reduce(
            (acc, row) => acc + Number(row[category] || 0),
            0
          );
          return data.length ? (total / data.length).toFixed(1) : "-";
        });
        setRatings(averages);
        setResponseCount(data.length);
      })
      .catch((error) =>
        console.error("Error fetching sheet data:", error)
      );
  };

  useEffect(() => {
    // Initial fetch and then poll every 10 seconds for real-time updates
    fetchData();
    const intervalId = setInterval(fetchData, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Google Form Link Section */}
      <GoogleFormLink />

      {/* Ratings Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">
          {responseCount} Responses
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-gray-800 text-white p-4 rounded">
              <p className="font-semibold text-sm">{category}</p>
              <p className="text-xl font-bold">
                {ratings[index] || "-"}/5
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">Reviews</h2>
        <div className="bg-gray-800 p-4 rounded text-sm text-gray-200">
          {/* Map user comments here if available */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Curabitur ornare pretium interdum...
          </p>
        </div>
      </div>
    </div>
  );
}

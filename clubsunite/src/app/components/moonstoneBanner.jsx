import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MoonstoneCard = () => {
  // Format for direct image access from Google Drive
  const ieeeLogoUrl = "https://drive.google.com/uc?export=view&id=FILE_ID_FOR_IEEE_LOGO";
  const autumnLeavesUrl = "https://drive.google.com/uc?export=view&id=FILE_ID_FOR_AUTUMN_IMAGE";

  return (
    // Container with horizontal padding and rounded corners
    <div className="border border-gray-800 bg-gray-900 text-white w-full max-w-2xl mx-auto px-4 rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b border-gray-800">
        {/* IEEE Logo */}
        <div className="relative w-12 h-12">
          <Image
            src={ieeeLogoUrl}
            alt="IEEE Logo"
            fill
            sizes="48px"
            style={{ objectFit: 'contain' }}
            unoptimized={true}
          />
        </div>
        {/* IEEE Text */}
        <div>
          <div className="text-sm">IEEE</div>
          <div className="text-xs text-gray-400">Medicaps University</div>
        </div>

        {/* Moonstone Text */}
        <div className="font-semibold pl-6">Moonstone 2025</div>
      </div>

      {/* Content Section */}
      <div className="flex">
        {/* Image Section */}
        <div className="relative w-1/3">
          <div className="relative h-28">
            <Image
              src={autumnLeavesUrl}
              alt="Autumn leaves"
              fill
              sizes="33vw"
              style={{ objectFit: 'cover' }}
              unoptimized={true}
            />
          </div>
        </div>

        {/* Text and Button Section */}
        <div className="p-4 flex-1">
          <p className="text-xs leading-relaxed mb-4 max-h-24 overflow-hidden">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vel sodales lorem. Curabitur ornare pretium interdum. Mauris molestie nibh vitae sem volutpat, fringilla venenatis metus finibus. In eu risus at nulla pulvinar pellentesque.
          </p>

          <div className="flex justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 text-sm rounded">
              View Participation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoonstoneCard;

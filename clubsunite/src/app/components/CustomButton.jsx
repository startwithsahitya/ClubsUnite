import React from 'react';

const CustomButton = ({
  width = '120px',
  height = '40px',
  text = 'Click Me',
  color = '#16a34a', // default green color
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        width,
        height,
        backgroundColor: color,
      }}
      className="text-white font-semibold rounded hover:opacity-90 transition"
    >
      {text}
    </button>
  );
};

export default CustomButton;

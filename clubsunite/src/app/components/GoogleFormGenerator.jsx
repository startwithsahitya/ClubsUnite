import React, { useState } from "react";
import CustomButton from "./CustomButton";

const GoogleFormGenerator = () => {
  const [formLink, setFormLink] = useState("https://forms.gle/FakeEventReview123");

  const handleGenerateForm = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxNrm8AAJ8jg7DtS3C0pPaHLrqovR2YEVN-t6N3kQTJnwRYbn43g5UcvKaZvaUlwaPRXQ/exec",
        { method: "GET" }
      );
      const result = await response.json();
      setFormLink(result.formLink || "Form created successfully");
      alert("Form Created Successfully!");
    } catch (error) {
      console.error("Form creation failed", error);
      alert("Failed to create form. Please try again.");
    }
  };

  return (
    <div className="bg-gray-800 p-3 rounded-xl flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="font-semibold">Google Form</span>
        <input
          type="text"
          value={formLink}
          readOnly
          className="bg-gray-700 text-white px-3 py-1 rounded-md w-full ml-4"
        />
      </div>
      <CustomButton onClick={handleGenerateForm} className="w-fit">
        Generate Form
      </CustomButton>
    </div>
  );
};

export default GoogleFormGenerator;

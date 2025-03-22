"use client";

import LeftNav from "../components/LeftNav";
import { useState } from "react";
import { useParams } from "next/navigation";
import React from "react";

export default function StartWithSmallLayout({ children }) {
  const { slug } = useParams();
  const [activeItem, setActiveItem] = useState(null);
  const [activeDropdownItem, setActiveDropdownItem] =
    useState("StartwithSmall");
  const [rightSelectedItem, setRightSelectedItem] = useState(null);

  console.log("Layout State:", {
    activeItem,
    activeDropdownItem,
    rightSelectedItem,
  });

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="h-screen sticky top-0">
        <LeftNav
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          activeDropdownItem={activeDropdownItem}
          setActiveDropdownItem={setActiveDropdownItem}
        />
      </div>

      <main className="flex-1 overflow-auto">
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                activeItem,
                activeDropdownItem,
                rightSelectedItem,
              })
            : child
        )}
      </main>

      <div className="h-screen sticky top-0"></div>
    </div>
  );
}

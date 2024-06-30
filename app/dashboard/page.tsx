"use client";
import React, { useRef } from "react";

const Dashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const array = [1, 2, 3, 4, 5, 6,7,8];

  const scrollLeftButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRightButton = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <button onClick={scrollLeftButton}>left</button>
      <button onClick={scrollRightButton}>right</button>
      <div
        className="snap-x grid grid-flow-col overflow-x-auto md:auto-cols-[25%] auto-cols-[50%] lg:auto-cols-[16.66%]"
        ref={containerRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {array.map((item) => (
          <div className="snap-end">
            <img
              className="w-full"
              src="https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=160&q=80"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

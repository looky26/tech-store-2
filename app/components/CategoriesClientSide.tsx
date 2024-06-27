"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";

const CategoriesClientSide = ({ cat }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
    <div
      className="max-w-7xl mx-auto flex space-x-5 overflow-x-auto relative"
      style={{ userSelect: "none" }}
    >
      <button
        className="relative flex items-center justify-center"
        onClick={scrollLeftButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div
        className="flex overflow-x-auto space-x-5"
        ref={containerRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Ensure dragging stops if the mouse leaves the container
      >
        {cat.map((item: any) => (
          <Link
            className="bg-orange-300 border border-orange-300 rounded-md"
            key={item.id}
            style={{ scrollSnapAlign: "center" }}
            href={`/collection/${item.name}`}
            draggable="false"
          >
            <p
              className="text-sm w-[200px] text-center text-black"
              draggable="false"
              style={{ userSelect: "none" }}
            >
              {item.name?.toUpperCase()}
            </p>
            {item && item.image && item.image[0] && item.image[0].url && (
              <img
                className="h-52 object-cover rounded-md"
                src={item.image[0].url}
                alt=""
                draggable="false"
              />
            )}
          </Link>
        ))}
      </div>
      <button onClick={scrollRightButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default CategoriesClientSide;

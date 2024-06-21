"use client";
import Link from "next/link";
import React, { useRef } from "react";

const CategoriesClientSide = ({ cat }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex space-x-5 overflow-hidden relative">
      <button
        className="relative flex items-center justify-center"
        onClick={scrollLeft}
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
      >
        {cat.map((item: any) => (
          <Link
            className="bg-orange-300 border border-orange-300 rounded-md"
            key={item.id}
            style={{ scrollSnapAlign: "end" }}
            href={`/collection/${item.name}`}
          >
            <p className="text-sm w-[200px] text-center text-black">
              {item.name?.toUpperCase()}
            </p>
            {item && item.image && item.image[0] && item.image[0].url && (
              <img
                className="h-52 object-cover rounded-md"
                src={item.image[0].url}
                alt=""
              />
            )}
          </Link>
        ))}
      </div>
      <button onClick={scrollRight}>
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

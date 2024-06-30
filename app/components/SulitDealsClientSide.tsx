"use client";
import Link from "next/link";
import React, { useRef } from "react";

const SulitDealsClientSide = ({ discountedProducts }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
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
    <div>
      <div className="flex justify-end space-x-5 my-3">
        <button
          onClick={scrollLeftButton}
          className="bg-orange-300 p-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
            />
          </svg>
        </button>
        <button
          onClick={scrollRightButton}
          className="bg-orange-300 p-1 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <div
        className="snap-x grid grid-flow-col overflow-x-auto md:auto-cols-[25%] auto-cols-[50%] lg:auto-cols-[16.66%]"
        ref={containerRef}
      >
        {discountedProducts.map((item: any) => (
          <Link
            className="snap-end px-2"
            key={item.id}
            href={`/collection/sulit-deals/${item.slug}`}
          >
            <div className="flex justify-between ">
              <p className="text-sm">
                SAVE {item.price - item.discountedprice}
              </p>
              <p className="text-sm">TEAM ELITE</p>
            </div>
            <img src={item.images[0].url} alt="" />
            <div className="relative group">
              <p className="truncate text-sm">{item.name}</p>
              <div className="absolute w-full left-1/2 transform -translate-x-1/2 translate-y-[-110%] hidden group-hover:block px-2 py-1 bg-gray-700 text-white text-sm rounded z-10">
                {item.name}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <p className="text-sm">EASY FIX</p>
              <p className="text-sm">No reviews</p>
            </div>
            <p className="line-through">{item.price}</p>
            <p>{item.discountedprice}</p>
            <div className="flex item-center">
              <button>BUY NOW</button>
              <button className="item center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SulitDealsClientSide;

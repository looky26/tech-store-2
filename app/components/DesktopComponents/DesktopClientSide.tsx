"use client";
import React, { useRef } from "react";

const DesktopClientSide = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const array = [1, 2, 3, 4, 5];

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
    <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 gap-x-10 p-2 lg:p-10">
      <div className="lg:p-10 p-2 bg-teal-900 rounded-xl">
        <div className="flex justify-between px-2 mb-2">
          <h1>DESKTOPS</h1>
          <div className="flex justify-center space-x-2">
            <button onClick={scrollLeftButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                />
              </svg>
            </button>
            <button onClick={scrollRightButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <h1>SEE MORE</h1>
        </div>

        <div
          className="snap-x grid grid-flow-col overflow-x-auto auto-cols-[50%]"
          ref={containerRef}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
          }}
        >
          {array.map((item) => (
            <div className="snap-end px-2 w-full">
              <div className="p-5 bg-white rounded-md">
                <p className="text-right text-black ">INTEL</p>
                <img
                  src="https://easypc.com.ph/cdn/shop/files/Core_i3_12100_H610_8GB_DDR4_240GB_SSD_PC_Case_M-ATX_with_700W_540x.jpg?v=1710913833"
                  alt=""
                />
                <p className="text-black text-sm">Core i3 12100 / H610 / 16GB DDR4</p>
                <p className="text-black">18795</p>
                <div className="flex items-center justify-between space-x-5">
                  <button className="bg-gray-500 flex-1 rounded-md py-2">
                    BUY NOW
                  </button>
                  <button className="bg-gray-500 items-center rounded-md py-2 px-2">
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
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-10 bg-gray-700 rounded-xl">
        <div className="flex justify-between">
          <h1>LAPTOPS</h1>
          <h1>SEE MORE</h1>
        </div>

        <div className="flex justify-center gap-5">
          <div className="p-5 bg-white rounded-md">
            <p className="text-right text-black ">INTEL</p>
            <img
              src="https://easypc.com.ph/cdn/shop/files/Core_i3_12100_H610_8GB_DDR4_240GB_SSD_PC_Case_M-ATX_with_700W_540x.jpg?v=1710913833"
              alt=""
            />
            <p className="text-black">Core i3 12100 / H610 / 16GB DDR4</p>
            <p className="text-black">18795</p>
            <div className="flex items-center justify-between space-x-5">
              <button className="bg-gray-500 flex-1 rounded-md py-2">
                BUY NOW
              </button>
              <button className="bg-gray-500 items-center rounded-md py-2 px-2">
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
          </div>
          <div className="p-5 bg-white rounded-md">
            <p className="text-right text-black ">INTEL</p>
            <img
              src="https://easypc.com.ph/cdn/shop/files/Core_i3_12100_H610_8GB_DDR4_240GB_SSD_PC_Case_M-ATX_with_700W_540x.jpg?v=1710913833"
              alt=""
            />
            <p className="text-black">Core i3 12100 / H610 / 16GB DDR4</p>
            <p className="text-black">18795</p>
            <div className="flex items-center justify-between space-x-5">
              <button className="bg-gray-500 flex-1 rounded-md py-2">
                BUY NOW
              </button>
              <button className="bg-gray-500 items-center rounded-md py-2 px-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopClientSide;

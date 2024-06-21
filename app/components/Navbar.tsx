"use client";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const cart = useCartStore((state: any) => state.cart);
  const addToCart = useCartStore((state: any) => state.addToCart);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const router = useRouter();
  const session = useSession();
  //console.log(session);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalQuantity = cart.reduce(
    (total: any, item: any) => total + item.quantity,
    0
  );

  // My account dropdown
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    //console.log(session);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-between items-center py-4">
          <Link href={"/"}>
            <h1 className="lg:text-4xl text-lg md:text-3xl font-bold">
              SLD TECHSTORE
            </h1>
          </Link>

          <input
            className="w-[400px] p-2 rounded-full hidden lg:block"
            type="text"
            placeholder="Search"
          />
          <div className="flex items-center space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hidden lg:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hidden lg:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer hidden lg:block"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            <div className="flex">
              <svg
                onClick={() => router.push("/cart")}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p>{totalQuantity}</p>
            </div>

            {/* log in log out */}
            {session.status === "loading" ? (
              <div>...</div>
            ) : session.status === "unauthenticated" ? (
              <button onClick={() => signIn()}>Sign In</button>
            ) : (
              <div className="relative">
                <div
                  onClick={toggleDropdown}
                  className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Hi, {session.data?.user?.name}
                </div>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                    <Link
                      onClick={() => setIsOpen(false)}
                      href="/account"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      My Account
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <svg
          onClick={toggleMenu}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 lg:hidden block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <div className="lg:flex justify-center space-x-5 py-5 hidden">
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            HOME
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            PRODUCTS
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            DESKTOP
          </h1>
          <Link href={"/collection/laptop"}>
            <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
              LAPTOP
            </h1>
          </Link>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            BUILD A PC
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            RAKK
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            PRICELIST
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            EASYFIX
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            REWARDS
          </h1>
          <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
            BRANDS
          </h1>
        </div>

        {/* small screen */}
        {menuOpen ? (
          <div className={` ${menuOpen ? "block" : "hidden"}`}>
            <input
              className="w-full mx-auto p-1 rounded-full mt-3"
              type="text"
              placeholder="Search"
            />
            <div className="mt-3">
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                HOME
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                PRODUCTS
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                DESKTOP
              </h1>
              <Link href={"/collection/laptop"}>
                <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                  LAPTOP
                </h1>
              </Link>

              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                BUILD A PC
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                RAKK
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                PRICELIST
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                EASYFIX
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                REWARDS
              </h1>
              <h1 className="hover:bg-orange-300 px-2 rounded-md cursor-pointer">
                BRANDS
              </h1>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

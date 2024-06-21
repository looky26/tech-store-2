"use client";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const cart = useCartStore((state: any) => state.cart);
  const addToCart = useCartStore((state: any) => state.addToCart);
  const clearCart = useCartStore((state: any) => state.clearCart);

  function createStars(rating: number, maxRating = 5) {
    // Calculate the number of filled stars
    const filledStars = Math.round(rating); // Round the rating to the nearest integer
    // Ensure filled stars are within range
    const clampedFilledStars = Math.min(maxRating, Math.max(0, filledStars));

    // Create the star string
    const stars =
      "★".repeat(clampedFilledStars) +
      "☆".repeat(maxRating - clampedFilledStars);

    return stars;
  }

  const totalQuantity = cart.reduce(
    (total: any, item: any) => total + item.quantity,
    0
  );

  console.log(cart);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <nav className="flex mt-10" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              href={"/"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              HOME
            </Link>
          </li>
          <li className="inline-flex items-center">
            <Link
              href={"/cart"}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              YOUR SHOPPING CART
            </Link>
          </li>
        </ol>
      </nav>

      {cart.length === 0 ? (
        <div className="flex justify-center flex-col text-center space-y-3 mt-20">
          <h1 className="text-4xl">Shopping Cart</h1>
          <p>Your shopping cart is empty.</p>
          <div>
            <Link href={"/collection/all"}>
              <button className="bg-gray-500 px-4 py-2 rounded-full w-fit">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between mt-20">
          <div className="flex flex-col flex-1 gap-y-5 lg:mr-10">
            {cart.map((item: any) => (
              <div className="flex space-x-5 border  border-white p-2">
                <img
                  className="lg:h-[200px] h-[100px]"
                  src={item.image}
                  alt=""
                />
                <div className="space-y-5">
                  <div>
                    <p className="lg:w-[500px] w-fit">{item.name}</p>
                    <p className="text-yellow-500">
                      {createStars(item.ratings)}{" "}
                      {item.ratings === 0 ? "No reviews" : ""}
                    </p>
                  </div>

                  <p>{item.price}</p>
                  <div className="flex lg:space-x-5 space-x-1 items-center">
                    <p className="">Quantity</p>
                    <button className="bg-red-500 h-10 w-10 rounded-lg">
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button className="bg-green-500 h-10 w-10 rounded-lg">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border border- p-2 mt-5 lg:mt-0  h-fit">
            <p className="pb-2">Add a note to your order</p>
            <textarea name="" id="" className="w-full h-36"></textarea>
            <p>Order Summary</p>
            <p>
              Subtotal ({totalQuantity + " items"}) : &#8369;{" "}
              {cart
                .reduce(
                  (total: any, item: any) => total + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </p>
            <button className="bg-orange-300 w-full rounded-full text-gray-800 mb-2">
              Proceed to checkout
            </button>
            <button
              className="bg-red-500 w-full rounded-full"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

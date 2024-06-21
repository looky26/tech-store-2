"use client";
import { useCartStore } from "@/store/cart";
import { sign } from "crypto";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProductDetailsPage = ({ singleRecord }: any) => {
  const [quantity, setQuantity] = useState(1);

  const cart = useCartStore((state: any) => state.cart);
  const addToCart = useCartStore((state: any) => state.addToCart);
  const clearCart = useCartStore((state: any) => state.clearCart);
  const router = useRouter();

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

  const pageSpecification = singleRecord.specification;

  const specificationLines = pageSpecification.split("\n");

  const specificationList = specificationLines.map((line: any, index: any) => (
    <li key={index}>{line}</li>
  ));

  //console.log(cart);

  return (
    <div>
      <div className="mt-20 grid grid-cols-2 lg:grid-cols-3">
        {singleRecord.images && singleRecord.images[0] ? (
          <img className="w-80" src={singleRecord.images[0].url} alt="" />
        ) : null}
        <div>
          <p>{singleRecord.name}</p>
          <p className="text-yellow-500">
            {createStars(singleRecord.ratings)}{" "}
            {singleRecord.ratings === 0 ? "No reviews" : ""}
          </p>

          <p>
            Available: {singleRecord.available ? "In Stock" : " Not available"}
          </p>
          <p className="text-xl">&#x20B1; {singleRecord.discountedprice === null ? singleRecord.price : singleRecord.discountedprice}</p>

          <div className="mt-5 space-y-5">
            <div className="flex lg:space-x-5 space-x-1 items-center">
              <p className="">Quantity</p>
              <button
                onClick={() => setQuantity((prev) => prev - 1)}
                className="bg-red-500 h-10 w-10 rounded-lg"
                disabled={quantity === 1} // Disable button when quantity is 1
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="bg-green-500 h-10 w-10 rounded-lg"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                addToCart({
                  name: singleRecord.name,
                  price: singleRecord.discountedprice === null ? singleRecord.price : singleRecord.discountedprice,
                  image: singleRecord.images[0].url,
                  ratings: singleRecord.ratings,
                  quantity: quantity,
                  id: singleRecord.id,
                })
              }
              className="bg-blue-300 text-black mr-5 p-3 rounded-md"
            >
              Add to Cart
            </button>
            <button
              onClick={() => router.push("/cart")}
              className="bg-orange-300 text-white p-3 rounded-md"
            >
              But It Now
            </button>
          </div>
        </div>
        <div className="w-full border border-white p-2">
          <p>Delivery Options</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex space-x-5">
          <h1>Description</h1>
          <h1>Reviews</h1>
        </div>

        <div className="space-y-3">
          <h1 className="text-xl font-bold">{singleRecord.name}</h1>
          <p className="text-lg font-bold ">Product Description</p>
          <p>{singleRecord.productdescription}</p>
          <p className="text-lg font-bold ">Product Specification</p>
          <ul>{specificationList}</ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;

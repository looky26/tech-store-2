"use client";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SuccessPageClientSide = ({ expiredSessions }: any) => {
  

  const clearCart = useCartStore((state: any) => state.clearCart);
  
  const isDevMode = process.env.NODE_ENV === "development";

  //redirect to orders page if there is no new orders found
  // useEffect(() => {
  //   if (expiredSessions.length > 0) {
  //     const redirectTimeout = setTimeout(() => {
  //       router.push("/account");
  //     }, 7000);

  //     return () => clearTimeout(redirectTimeout);
  //   }
  // }, [expiredSessions]);

  if (expiredSessions.length > 0) {
    return (
      <div className="flex justify-center pt-40  h-[100vh]">
        <div className="">
          <h1 className="text-2xl">
            The session has expired! This is Dev Mode
          </h1>
          <p>Click the link below to see your purchased orders</p>
          <Link href={"/account"}>
            <button className="bg-orange-300 py-2 w-full rounded-md mt-10">
              Go to your orders
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    console.log("No expired sessions.");
  }

  if (isDevMode) {
    clearCart()
    return (
      <div className="flex justify-center pt-40  h-[100vh]">
        <div className="">
          <h1 className="text-2xl">
            Thank you, your order has been confirmed! This is Dev Mode
          </h1>
          <p>Click the link below to see your purchased orders</p>
          <Link href={"/account"}>
            <button
           
              className="bg-orange-300 py-2 w-full rounded-md mt-10"
            >
              Go to your orders
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    clearCart()
    return (
      <div className="flex justify-center pt-40  h-[100vh]">
        <div className="">
          <h1 className="text-2xl">Thank you, your order has been confirmed!</h1>
          <p>Click the link below to see your purchased orders</p>
          <Link href={"/account"}>
            <button
             
              className="bg-orange-300 py-2 w-full rounded-md mt-10"
            >
              Go to your orders
            </button>
          </Link>
        </div>
      </div>
    );
  }


};

export default SuccessPageClientSide;

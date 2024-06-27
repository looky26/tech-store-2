'use client'
import Link from 'next/link'
import React from 'react'

const SulitDealsClientSide = ({discountedProducts}:any) => {

    const truncateText = (text: any, maxLength: any) => {
        if (text.length > maxLength) {
          return text.slice(0, maxLength) + "...";
        } else {
          return text;
        }
      };


  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-x-5 pb-20">
    {discountedProducts.map((item: any) => (
      <Link key={item.id} href={`/collection/sulit-deals/${item.slug}`}>
        <div className="flex justify-between">
          <p>save {item.price - item.discountedprice}</p>
          <p>TEAM ELITE</p>
        </div>
        <img src={item.images[0].url} alt="" />
        <p className='text-wrap'>{truncateText(item.name, 50)}</p>
        <div className="flex justify-between mt-3">
          <p>EASY FIX</p>
          <p>No reviews</p>
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
  )
}

export default SulitDealsClientSide
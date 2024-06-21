import { getXataClient } from "@/src/xata";
import { exists } from "@xata.io/client";
import Link from "next/link";

const xata = getXataClient();

const SulitDeals = async () => {
  const discountedProducts = await xata.db.products
    .filter(exists("discountedprice"))
    .select([
      "name",
      "ratings",
      "available",
      "images",
      "quantity",
      "wishlist",
      "productdescription",
      "specification",
      "price",
      "slug",
      "discountedprice",
    ])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  //console.log(discountedProducts);

  return (
    <div className="max-w-[1800px] mx-auto mt-20">
      <div className="flex justify-between">
        <button>SULIT DEALS</button>
        <Link href={"/collection/sulit-deals"}>SEE MORE</Link>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-6 gap-x-5">
          {discountedProducts.records.map((item: any) => (
            <Link href={`/collection/sulit-deals/${item.slug}`}>
              <div className="flex justify-between">
                <p>save {item.price - item.discountedprice}</p>
                <p>TEAM ELITE</p>
              </div>
              <img src={item.images[0].url} alt="" />
              <p>{item.name}</p>
              <div className="flex">
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
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SulitDeals;

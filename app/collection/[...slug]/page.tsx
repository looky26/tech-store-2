import ProductDetailsPage from "@/app/components/ProductDetailsPage";
import { getXataClient } from "@/src/xata";
import { exists } from "@xata.io/client";
import Link from "next/link";
import React from "react";

const xata = getXataClient();

const CollectionPage = async ({ params }: { params: { slug: string } }) => {
  const allProducts = await xata.db.products
    .select([
      "name",
      "ratings",
      "images",
      "available",
      "quantity",
      "wishlist",
      "productdescription",
      "specification",
      "price",
      "slug",
      "discountedprice",
      "brand", // Explicitly select the brand name
      "category",
    ])
    .getPaginated();

  const allRecords = await xata.db.products
    .select([
      "name",
      "ratings",
      "images",
      "available",
      "quantity",
      "wishlist",
      "productdescription",
      "specification",
      "price",
      "slug",
      "discountedprice",
      "brand", // Explicitly select the brand name
      "category",
    ])
    .filter("category.name", params.slug)
    .getMany();

  const singleRecord = await xata.db.products
    .select([
      "name",
      "ratings",
      "images",
      "available",
      "quantity",
      "wishlist",
      "productdescription",
      "specification",
      "price",
      "slug",
      "brand",
      "discountedprice",
      "category",
    ])
    .filter({ slug: params.slug[1] })
    .getFirst();

  const sulitDealsRecords = await xata.db.products
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
      "brand",
      "discountedprice",
    ])
    .getPaginated({
      pagination: {
        size: 15,
      },
    });

  const serializedSingleRecords = singleRecord?.toSerializable();

  //console.log(params.slug[1])
  // console.log('SINGLERECORD', singleRecord?.category?.name)

  //console.log('laptop', allRecords);

  //console.log(params.slug);

  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  function createStars(rating: any, maxRating = 5) {
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
          <li>
            <div className="flex items-center">
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
              <Link
                href={`/collection/${params.slug[0]}`}
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
              >
                {decodeURIComponent(params.slug[0]).toUpperCase()}
              </Link>
            </div>
          </li>
          {params.slug[1] && (
            <li>
              <div className="flex items-center">
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
                <p className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                  {decodeURIComponent(singleRecord?.name ?? "").toUpperCase()}
                </p>
              </div>
            </li>
          )}
        </ol>
      </nav>

      {/* single item */}

      {params.slug[1] && serializedSingleRecords ? (
        <ProductDetailsPage singleRecord={serializedSingleRecords} />
      ) : (
        <div></div>
      )}

      <div className="flex mt-40">
        {/* left */}
        {params.slug[1] && singleRecord ? null : (
          <div className="w-[900px] hidden lg:block">left</div>
        )}

        {/* right */}
        {params.slug[0] === "sulit-deals" && !params.slug[1] ? (
          // Show products for sulit-deals
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {sulitDealsRecords.records.map((item: any) => (
                <Link
                  href={`/collection/${params.slug}/${item.slug}`}
                  className="space-y-2 text-sm"
                  key={item.slug}
                >
                  {item.images && item.images[0] && item.images[0].url ? (
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="w-[360px] h-fit md:w-full"
                    />
                  ) : null}
                  <p className=" text-justify truncate">{item.name}</p>
                  <p>{item.brand.name}</p>
                  <p className="text-yellow-500">
                    {createStars(item.ratings)}{" "}
                    {item.ratings === 0 ? "No reviews" : ""}
                  </p>
                  <p>&#x20B1; {item.discountedprice}</p>
                  <div className="flex justify-center">
                    <button className="bg-orange-300 text-black border border-white w-full rounded-lg ">
                      BUY NOW
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : params.slug[0] === "all" && !params.slug[1] ? (
          // Show all products
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {allProducts.records.map((item) => (
                <Link
                  href={`/collection/${params.slug}/${item.slug}`}
                  className="space-y-2 text-sm "
                  key={item.slug}
                >
                  {item.images && item.images[0] && item.images[0].url ? (
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="w-[360px] h-fit md:w-full"
                    />
                  ) : null}
                  <p className=" text-justify truncate">{item.name}</p>
                  {item.brand?.name}
                  <p className="text-yellow-500">
                    {createStars(item.ratings)}{" "}
                    {item.ratings === 0 ? "No reviews" : ""}
                  </p>
                  <p>
                    &#x20B1;{" "}
                    {item.discountedprice === null
                      ? item.price
                      : item.discountedprice}
                  </p>
                  <div className="flex justify-center">
                    <button className="bg-orange-300 text-black border border-white w-full rounded-lg ">
                      BUY NOW
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          // Show products based on slug
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 ">
              {allRecords.map((item) => (
                <Link
                  href={`/collection/${params.slug}/${item.slug}`}
                  className="space-y-2 text-sm"
                  key={item.slug}
                >
                  {item.images && item.images[0] && item.images[0].url ? (
                    <img
                      src={item.images[0].url}
                      alt=""
                      className="w-[360px] h-fit md:w-full"
                    />
                  ) : null}
                  <p className=" text-justify truncate">{item.name}</p>
                  <p>{item.brand?.name}</p>
                  <p className="text-yellow-500">
                    {createStars(item.ratings)}{" "}
                    {item.ratings === 0 ? "No reviews" : ""}
                  </p>
                  <p>&#x20B1; {item.price}</p>
                  <div className="flex justify-center">
                    <button className="bg-orange-300 text-black border border-white w-full rounded-lg ">
                      BUY NOW
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;

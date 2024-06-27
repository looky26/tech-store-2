import { getXataClient } from "@/src/xata";
import { exists } from "@xata.io/client";
import Link from "next/link";
import SulitDealsClientSide from "./SulitDealsClientSide";

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

    const serializedRecords = discountedProducts.records.toSerializable();

  //console.log(discountedProducts);

  return (
    <div className="max-w-[1800px] mx-auto mt-20">
      <div className="flex justify-between">
        <button>SULIT DEALS</button>
        <Link href={"/collection/sulit-deals"}>SEE MORE</Link>
      </div>

      <div className="mt-10">
        <SulitDealsClientSide discountedProducts={serializedRecords}/>
      </div>
    </div>
  );
};

export default SulitDeals;

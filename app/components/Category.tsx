import { getXataClient } from "@/src/xata";
import React from "react";
import CategoriesClientSide from "./CategoriesClientSide";

const xata = getXataClient();

const Category = async () => {
  const categories = await xata.db.categories.getMany();

  const serializedRecords = categories.toSerializable();
  //console.log(serializedRecords)

  return (
    <div>
      <CategoriesClientSide cat={serializedRecords} />
    </div>
  );
};

export default Category;

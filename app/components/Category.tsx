import { getXataClient } from "@/src/xata";
import React from "react";
import CategoriesClientSide from "./CategoriesClientSide";

const xata = getXataClient();

const Category = async () => {
  const categories = await xata.db.categories.getMany();

  const serializedRecords = categories.toSerializable();
  //console.log(serializedRecords)

  return (
    <div
      className="max-w-7xl mx-auto flex space-x-5 overflow-x-auto mt-5"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <CategoriesClientSide cat={serializedRecords} />
    </div>
  );
};

export default Category;

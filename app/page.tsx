import { getXataClient } from "@/src/xata";
import Image from "next/image";
import Banner from "./components/Banner";
import Category from "./components/Category";
import SulitDeals from "./components/SulitDeals";
import { auth } from "@/auth";
import Desktop from "./components/DesktopComponents/Desktop";




const xata = getXataClient();

export default async function Home() {


  // const page = await xata.db.products.getPaginated();
  // console.log(page.records[0].specification)

  // const pageSpecification = page.records[0].specification

  // const specificationLines = pageSpecification.split('\n');

  // const specificationList = specificationLines.map((line:any, index:any) => (
  //   <li key={index}>{line}</li>
  // ));



  return (
    <main className="px-5 ">
      {/* <p>{specificationList}</p> */}
      <Banner/>
      <Category/>
      <Desktop/>
      <SulitDeals/>
    </main>
  );
}

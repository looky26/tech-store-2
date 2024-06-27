import React from "react";
import AccountClientSide from "./components/AccountClientSide";
import { getXataClient } from "@/src/xata";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import OrderHistory from "../components/OrderHistory";

const xata = getXataClient();

const Accounts = async () => {
  const session = await auth();

  //console.log(session)

  const xata = getXataClient();

  const records = await xata.db.nextauth_users_sessions
    .select(["user.name", "user.email", "user.image", "user.mobile", 'user.address1', 'user.city'])
    .filter("user.id", session?.user?.id)
    .getAll();

  //console.log(records);

  //console.log('session', session?.user?.id)

  const serializedRecords = records.toSerializable();

  //console.log(session)

  if (!session) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl mx-auto px-5">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* First Grid Item */}
      <div className="flex flex-col items-center lg:items-start">
        <AccountClientSide records={serializedRecords} />
      </div>
      
      {/* Second Grid Item */}
      <div className="flex flex-col items-center lg:items-start mt-10 lg:mt-24">
        <h1 className="text-center lg:text-left">Order History</h1>
        <OrderHistory />
      </div>
    </div>
  </div>
  
  );
};

export default Accounts;

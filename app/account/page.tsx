import React from "react";
import AccountClientSide from "./components/AccountClientSide";
import { getXataClient } from "@/src/xata";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const xata = getXataClient();

const Accounts = async () => {
  const session = await auth();

  const xata = getXataClient();

  const records = await xata.db.nextauth_users_sessions
    .select(["user.name", "user.email", "user.image", 'user.mobile'])
    .getAll();

  //console.log(records);

  const serializedRecords = records.toSerializable();

  //console.log(session)

  if (!session) {
    redirect('/')
    
  }

  return (
    <div>
      <AccountClientSide records={serializedRecords} />
    </div>
  );
};

export default Accounts;

import React from "react";
import AccountClientSide from "./components/AccountClientSide";
import { getXataClient } from "@/src/xata";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const xata = getXataClient();

const Accounts = async () => {
  const session = await auth();

  //console.log(session)

  const xata = getXataClient();

  const records = await xata.db.nextauth_users_sessions
    .select(["user.name", "user.email", "user.image", 'user.mobile'])
    .filter("user.id", session?.user?.id)
    .getAll();

  
    //console.log(records);

    //console.log('session', session?.user?.id)

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

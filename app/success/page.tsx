import { auth } from "@/auth";
import { getXataClient } from "@/src/xata";
import { redirect } from "next/navigation";

import React from "react";
import SuccessPageClientSide from "../components/SuccessPageClientSide";

const SuccessPage = async () => {
  const session = await auth();

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const sessions = await stripe.checkout.sessions.list({
    limit: 1,
  });

  const expirationTimeInMilliseconds = 1 * 60 * 1000; // 3 minutes

  const expiredSessions = sessions.data.filter((session: any) => {
    const currentTime = new Date().getTime();
    const sessionCreateTime = new Date(session.created * 1000).getTime();
    return currentTime - sessionCreateTime > expirationTimeInMilliseconds;
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <SuccessPageClientSide expiredSessions={expiredSessions} />
    </div>
  );
};

export default SuccessPage;

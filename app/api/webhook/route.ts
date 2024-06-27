import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getXataClient } from "@/src/xata";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SIGNING_SECRET!
    );
    //console.log("event", event);
  } catch (error) {
    return new NextResponse("invalid signature", { status: 400 });
  }

  // const session = event.data.object as Stripe.Checkout.Session;
  // console.log("session", session);

  //handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    console.log("Payment was successfull for user");
    const session = event.data.object as Stripe.Checkout.Session;
    //console.log("session", session);
    const imageUrlsArray = session?.metadata?.images.split(",");
    const itemsTitleArray = session?.metadata?.itemNames.split(",");
    const itemPricesArray = session?.metadata?.itemPrices.split(",");
    //console.log(imageUrlsArray);
    //console.log(itemsTitleArray);
    console.log(itemPricesArray)

  
    const result = imageUrlsArray?.map((url, index) => ({
      image: url,
      name: itemsTitleArray![index],
      price: itemPricesArray![index],
    }));

    //console.log(result)



    const xata = getXataClient();

    xata.db.orders.create({
      orders: {items: result},
      email: session?.metadata?.email,
      datepurchase: new Date(),
    })
  }
  return new NextResponse("Ok", { status: 200 });
}

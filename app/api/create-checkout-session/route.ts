// app/api/create-checkout-session/route.ts
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { cart, email } = await request.json();
    const itemNames = await Promise.all(cart.map((item:any) => item.name));
    const itemImages = await Promise.all(cart.map((item:any) => item.image));
    const itemPrices = await Promise.all(cart.map((item: any) => item.price));

    //console.log(itemNames)
    //console.log(itemImages)

    const transformedItems = cart.map((item: any) => ({
      description: item.name,
      quantity: item.quantity,
      price_data: {
        currency: "php",
        unit_amount: item.price * 100,
        product_data: {
          name: item.name,
          images: [item.image],
        },
      },
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: transformedItems.map((item:any) => ({
        price_data: item.price_data,
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cart',
      metadata: {
        email,
        itemNames: itemNames.join(','),
        images: itemImages.join(','),
        itemPrices: itemPrices.join(',') 
      }
    });

    //console.log(session.metadata)

    //console.log(session)

    // console.log(cart);
    // console.log(email);

    return NextResponse.json({ id:session.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

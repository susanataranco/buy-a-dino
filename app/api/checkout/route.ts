import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(
  req: Request,
  {}: {
    params: {
      dinoId: string;
      price: string;
      startDate: Date;
      endDate: Date;
      dinoName: string;
    };
  }
) {
  const { userId } = auth();
  const { dinoId, price, startDate, endDate, dinoName } = await req.json();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!dinoId) {
    return new NextResponse("dino id are required", { status: 400 });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const numberOfDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const totalAmount = Number(price) * numberOfDays;
  const totalAmountStripe = Number(price) * 100 * numberOfDays;

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity: 1,
      price_data: {
        currency: "JPY",
        product_data: {
          name: dinoName,
        },
        unit_amount: totalAmountStripe,
      },
    },
  ];

  const order = await db.order.create({
    data: {
      dinoId,
      dinoName: dinoName,
      userId: userId,
      status: "confirmed",
      totalAmount: totalAmount.toString(),
      orderDate: startDate
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-confirmation`,
    cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_STORE_URL}/order-error`,
    metadata: {
      orderId: order.id,
      dinoId: dinoId,
      startDate,
      endDate,
      numberOfDays,
    },
  });

  return NextResponse.json(
    { url: session.url },
    {
      headers: corsHeaders,
    }
  );
}
import { db } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (
    !signature ||
    !process.env.STRIPE_WEBHOOK_SECRET ||
    !process.env.STRIPE_SECRET_KEY
  ) {
    return NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid": {
      const { customer, subscription, subscription_details } =
        event.data.object;
      const userId = subscription_details?.metadata?.userId;
      if (!userId || !customer || !subscription) {
        return NextResponse.error();
      }

      const newSubscription = await db.subscription.create({
        data: {
          userId,
          stripeCustomerId: customer as string,
          stripeSubscriptionId: subscription as string,
        },
      });

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          subscriptionId: newSubscription.id,
        },
      });

      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const userId = subscription.metadata?.userId;
      if (!userId) {
        return NextResponse.error();
      }

      const user = await db.user.findUnique({ where: { id: userId } });
      if (!user) {
        return NextResponse.error();
      }
      if (user.subscriptionId) {
        await db.subscription.update({
          where: {
            id: user.subscriptionId,
          },
          data: {
            active: false,
            inativationDate: new Date(),
          },
        });

        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            subscriptionId: null,
          },
        });
      }
      break;
    }
  }
  return NextResponse.json({ received: true });
};

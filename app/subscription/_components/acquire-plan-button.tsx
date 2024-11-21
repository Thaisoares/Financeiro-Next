"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_action/create-stripe-checkout";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";

interface props {
  userIsPremium: boolean;
  userEmail: string;
}

const AcquirePlanButton = ({ userIsPremium, userEmail }: props) => {
  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not foud");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Could not load Stripe");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  if (userIsPremium) {
    return (
      <Button className="w-[300px] rounded-full" variant={"link"}>
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${userEmail}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }
  return (
    <Button className="w-[300px] rounded-full" onClick={handleAcquirePlanClick}>
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;

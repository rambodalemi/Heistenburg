"use client";

import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/components/shared/nav/basket";
import { useUser } from "@clerk/nextjs";

export function CheckoutForm({ cart }: { cart: CartItem[] }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser(); // Retrieve the current user
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirmation`,
        payment_method_data: {
          billing_details: {
            name: userInfo.name,
            email: userInfo.email,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
      setIsProcessing(false);
    }
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      {!user && (
        <div className="space-y-4">
          <input
            type="text"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        {isProcessing ? "Processing..." : `Pay $${totalAmount.toFixed(2)}`}
      </Button>
      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </form>
  );
}

import dotenv from 'dotenv';
dotenv.config();

import Stripe from 'stripe';
import userModel from '../models/userModel.js'; // Optional: for admin-level use later

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("Stripe KEY at controller:", process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { plan, userId } = req.body;
 console.log("Received plan:", plan, " and userId:", userId);
  const prices = {
    Basic: { amount: 1000, credits: 100 },
    Advanced: { amount: 5000, credits: 500 },
    Business: { amount: 25000, credits: 5000 },
  };

  const selected = prices[plan];
  console.log("Selected plan details:", selected);        
  if (!selected) {
    return res.status(400).json({ success: false, message: 'Invalid plan selected' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan} Plan - ${selected.credits} credits`,
            },
            unit_amount: selected.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:5173/result',
      cancel_url: 'http://localhost:5173/',
      metadata: {
        userId: userId,
        credits: selected.credits.toString(), // Store as string for metadata
      },
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ success: false, message: 'Stripe session creation failed' });
  }
};

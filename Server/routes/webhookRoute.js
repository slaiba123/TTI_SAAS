import express from 'express';
import Stripe from 'stripe';
import userModel from '../models/userModel.js'; // adjust path as needed

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const creditsToAdd = parseInt(session.metadata.credits);

    try {
      const user = await userModel.findById(userId);
      if (user) {
        user.creditBalance += creditsToAdd;
        await user.save();
        console.log(`Added ${creditsToAdd} credits to user ${user.email}`);
      }
    } catch (err) {
      console.error('Failed to update user credits:', err);
    }
  }

  res.status(200).json({ received: true });
});

export default router;

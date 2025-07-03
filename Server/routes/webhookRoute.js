import Stripe from 'stripe';
import userModel from '../models/userModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const webhookHandler = async (req, res) => {
  console.log('Webhook HIT'); // now this should show

  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const credits = parseInt(session.metadata.credits);

    try {
      const user = await userModel.findById(userId);
      console.log('User found:', userId, user);
      if (user) {
        user.creditBalance += credits;
        await user.save();
        console.log(`Added ${credits} credits to user ${user.email}`);
      }
    } catch (err) {
      console.error('User credit update failed:', err.message);
    }
  }

  res.status(200).json({ received: true });
};

export default webhookHandler;

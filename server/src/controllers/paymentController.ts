import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {} as any);

export async function createPayment(req: Request, res: Response) {
  const { amount, currency } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: amount,
            product_data: { name: 'Linora order' },
          },
          quantity: 1,
        },
      ],
      success_url:
        process.env.PAYMENT_SUCCESS_URL || 'https://example.com/success',
      cancel_url:
        process.env.PAYMENT_CANCEL_URL || 'https://example.com/cancel',
    });
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Payment failed' });
  }
}

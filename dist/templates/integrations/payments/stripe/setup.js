"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSetup = void 0;
exports.stripeSetup = {
    files: {
        'src/lib/stripe.ts': `
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});
`,
        'src/app/api/payments/stripe/webhook/route.ts': `
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
      // Add other event handlers
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
}
`
    },
    envVars: {
        'STRIPE_SECRET_KEY': 'your-stripe-secret-key-here',
        'STRIPE_PUBLISHABLE_KEY': 'your-stripe-publishable-key-here',
        'STRIPE_WEBHOOK_SECRET': 'your-stripe-webhook-secret-here'
    },
    dependencies: {}
};

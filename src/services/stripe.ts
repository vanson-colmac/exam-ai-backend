// Stripe integration service

import stripe from 'stripe'

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const createCustomer = async (email: string, name: string) => {
  try {
    const customer = await stripeClient.customers.create({
      email,
      name,
      metadata: {
        created_via: 'exam_ai_signup',
      },
    })
    return customer.id
  } catch (error) {
    console.error('Failed to create Stripe customer:', error)
    throw error
  }
}

export const createCheckoutSession = async (customerId: string, priceId: string, successUrl: string) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: successUrl,
    })
    return session
  } catch (error) {
    console.error('Failed to create checkout session:', error)
    throw error
  }
}

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    await stripeClient.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })
  } catch (error) {
    console.error('Failed to cancel subscription:', error)
    throw error
  }
}

export const updateSubscription = async (subscriptionId: string, newPriceId: string) => {
  try {
    const subscription = await stripeClient.subscriptions.retrieve(subscriptionId)
    await stripeClient.subscriptions.update(subscriptionId, {
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],
    })
  } catch (error) {
    console.error('Failed to update subscription:', error)
    throw error
  }
}

export const getInvoices = async (customerId: string) => {
  try {
    const invoices = await stripeClient.invoices.list({
      customer: customerId,
      limit: 10,
    })
    return invoices.data
  } catch (error) {
    console.error('Failed to get invoices:', error)
    throw error
  }
}

export const verifyWebhookSignature = (body: string, signature: string) => {
  try {
    return stripeClient.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw error
  }
}

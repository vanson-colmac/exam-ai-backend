import { Router, Request, Response } from 'express'

const router = Router()

// Middleware to verify auth token
const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  // In production: verify JWT token
  next()
}

// Middleware to check subscription
const checkSubscription = (req: Request, res: Response, next: Function) => {
  // In production: verify user has active subscription
  next()
}

// Get subscription details
router.get('/subscription', verifyToken, (req: Request, res: Response) => {
  res.json({
    tier: 'free',
    status: 'active',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    questions_remaining: 3,
    daily_limit: 5,
  })
})

// Create checkout session (Stripe)
router.post('/checkout-session', verifyToken, async (req: Request, res: Response) => {
  try {
    const { plan } = req.body

    // Map plan to Stripe price ID
    const priceMap: Record<string, string> = {
      pro: 'price_pro_monthly',
      elite: 'price_elite_monthly',
      master: 'price_master_monthly',
    }

    const priceId = priceMap[plan] || 'price_pro_monthly'

    // In production: Create Stripe session
    res.json({
      sessionId: 'cs_test_' + Date.now(),
      url: `https://checkout.stripe.com/pay/cs_test_${Date.now()}`,
      plan,
      amount: plan === 'pro' ? 999 : plan === 'elite' ? 1999 : 2999,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' })
  }
})

// Update subscription
router.put('/subscription', verifyToken, async (req: Request, res: Response) => {
  try {
    const { new_tier } = req.body
    // In production: Call Stripe API
    res.json({
      message: 'Subscription updated',
      old_tier: 'free',
      new_tier,
      effective_immediately: true,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subscription' })
  }
})

// Cancel subscription
router.delete('/subscription', verifyToken, async (req: Request, res: Response) => {
  try {
    // In production: Call Stripe API
    res.json({
      message: 'Subscription cancelled',
      cancellation_date: new Date(),
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel subscription' })
  }
})

// Get invoices
router.get('/invoices', verifyToken, (req: Request, res: Response) => {
  res.json({
    invoices: [
      {
        id: 'inv_1234',
        amount: 999,
        date: new Date(),
        status: 'paid',
        pdf_url: 'https://...',
      },
    ],
  })
})

// Webhook handler for Stripe events
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body

    // Handle different webhook events
    switch (type) {
      case 'checkout.session.completed':
        // User payment successful
        console.log('Payment successful:', data)
        break
      case 'customer.subscription.updated':
        // Subscription updated
        console.log('Subscription updated:', data)
        break
      case 'invoice.payment_failed':
        // Payment failed
        console.log('Payment failed:', data)
        break
    }

    res.json({ received: true })
  } catch (error) {
    res.status(500).json({ error: 'Webhook processing failed' })
  }
})

export default router

import { Router, Request, Response } from 'express'

const router = Router()

// Create checkout session
router.post('/checkout-session', (req: Request, res: Response) => {
  res.json({
    sessionId: 'cs_test_123',
    url: 'https://checkout.stripe.com/...',
  })
})

// Get subscription status
router.get('/subscription', (req: Request, res: Response) => {
  res.json({
    tier: 'free',
    status: 'active',
    questions_remaining: 3,
  })
})

// Update subscription
router.put('/subscription', (req: Request, res: Response) => {
  res.json({ updated: true })
})

// Cancel subscription
router.delete('/subscription', (req: Request, res: Response) => {
  res.json({ cancelled: true })
})

// Get invoices
router.get('/invoices', (req: Request, res: Response) => {
  res.json({ invoices: [] })
})

// Webhook handler (Stripe)
router.post('/webhook', (req: Request, res: Response) => {
  res.json({ received: true })
})

export default router

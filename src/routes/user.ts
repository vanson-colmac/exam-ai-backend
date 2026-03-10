import { Router, Request, Response } from 'express'

const router = Router()

// Get current user profile
router.get('/me', (req: Request, res: Response) => {
  res.json({
    user: {
      id: 'user-123',
      email: 'user@example.com',
      name: 'User',
      avatar_url: null,
      subscription_tier: 'free',
    },
  })
})

// Update user profile
router.put('/me', (req: Request, res: Response) => {
  res.json({ updated: true })
})

// Get public profile
router.get('/:id', (req: Request, res: Response) => {
  res.json({
    id: req.params.id,
    name: 'User',
    avatar_url: null,
  })
})

// Upload avatar
router.post('/me/avatar', (req: Request, res: Response) => {
  res.json({ uploaded: true, url: '/avatars/default.png' })
})

// Get preferences
router.get('/me/preferences', (req: Request, res: Response) => {
  res.json({
    theme: 'light',
    notifications: true,
  })
})

// Update preferences
router.put('/me/preferences', (req: Request, res: Response) => {
  res.json({ updated: true })
})

export default router

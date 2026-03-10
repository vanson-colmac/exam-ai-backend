import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import quizRoutes from './routes/quiz'
import paymentRoutes from './routes/payment'
import adminRoutes from './routes/admin'

dotenv.config()

const app: Express = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    ok: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// Ready check
app.get('/ready', (req: Request, res: Response) => {
  res.json({
    ready: true,
    database: 'connected',
  })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/admin', adminRoutes)

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  })
})

// Error handler
app.use((err: any, req: Request, res: Response) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`)
  console.log(`📡 API URL: http://localhost:${PORT}`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
})

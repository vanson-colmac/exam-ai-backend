import { Router, Request, Response } from 'express'
import axios from 'axios'

const router = Router()

// Generate questions
router.post('/generate', async (req: Request, res: Response) => {
  try {
    const { exam_id, topic_id, count = 5 } = req.body

    // Call existing API at localhost:5050
    const response = await axios.post('http://localhost:5050/generate', {
      exam: exam_id,
      topic: topic_id,
      count,
    })

    res.json({
      success: true,
      data: response.data,
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate questions' })
  }
})

// Get past quizzes
router.get('/list', (req: Request, res: Response) => {
  res.json({
    quizzes: [
      {
        id: '1',
        exam: 'GMAT',
        topic: 'Quantitative',
        score: 85,
        date: new Date(),
      },
    ],
  })
})

// Get quiz details
router.get('/:id', (req: Request, res: Response) => {
  res.json({
    quiz: {
      id: req.params.id,
      exam: 'GMAT',
      score: 85,
      questions: [],
    },
  })
})

// Submit answer
router.post('/:id/submit-answer', (req: Request, res: Response) => {
  res.json({ correct: true })
})

// Complete quiz
router.post('/:id/complete', (req: Request, res: Response) => {
  res.json({ completed: true })
})

// Get results
router.get('/:id/results', (req: Request, res: Response) => {
  res.json({
    score: 85,
    correctAnswers: 85,
    totalQuestions: 100,
  })
})

// Bookmark question
router.post('/bookmark', (req: Request, res: Response) => {
  res.json({ bookmarked: true })
})

// Get bookmarks
router.get('/bookmarks', (req: Request, res: Response) => {
  res.json({ bookmarks: [] })
})

// Get explanations
router.get('/:id/explanations', (req: Request, res: Response) => {
  res.json({ explanations: [] })
})

export default router

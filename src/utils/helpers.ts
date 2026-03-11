// Utility functions

export const generateToken = (userId: string, email: string): string => {
  const jwt = require('jsonwebtoken')
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  })
}

export const generateRefreshToken = (userId: string): string => {
  const jwt = require('jsonwebtoken')
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  })
}

export const hashPassword = async (password: string): Promise<string> => {
  const bcryptjs = require('bcryptjs')
  return bcryptjs.hash(password, 10)
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const bcryptjs = require('bcryptjs')
  return bcryptjs.compare(password, hash)
}

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const formatCurrency = (amount: number): string => {
  return '$' + (amount / 100).toFixed(2)
}

export const calculateStreak = (quizzes: any[]): number => {
  // Calculate daily streak based on quiz history
  let streak = 0
  let currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  for (const quiz of quizzes) {
    const quizDate = new Date(quiz.created_at)
    quizDate.setHours(0, 0, 0, 0)

    if (quizDate.getTime() === currentDate.getTime()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else if (quizDate.getTime() < currentDate.getTime()) {
      break
    }
  }

  return streak
}

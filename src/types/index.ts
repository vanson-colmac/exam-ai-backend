// Export types for TypeScript

export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  theme: string
  subscription_tier: string
  created_at: Date
}

export interface Quiz {
  id: string
  user_id: string
  exam_id: string
  topic_id: string
  score: number
  total_questions: number
  created_at: Date
}

export interface Subscription {
  id: string
  user_id: string
  tier: 'free' | 'pro' | 'elite' | 'master'
  status: 'active' | 'cancelled' | 'past_due'
  current_period_end: Date
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  correct_index: number
  explanation: string
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  timestamp: Date
}

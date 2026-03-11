// Analytics service for tracking metrics

export interface UserMetrics {
  total_users: number
  active_users: number
  paid_users: number
  free_users: number
  churn_rate: number
}

export interface RevenueMetrics {
  total_revenue: number
  monthly_recurring_revenue: number
  average_customer_value: number
  lifetime_value: number
}

export interface QuizMetrics {
  total_quizzes: number
  average_score: number
  most_popular_topic: string
  questions_per_day: number
}

// In production: Connect to analytics database
export const getUserMetrics = async (): Promise<UserMetrics> => {
  return {
    total_users: 1234,
    active_users: 567,
    paid_users: 234,
    free_users: 1000,
    churn_rate: 0.05,
  }
}

export const getRevenueMetrics = async (): Promise<RevenueMetrics> => {
  return {
    total_revenue: 12340,
    monthly_recurring_revenue: 2340,
    average_customer_value: 52.5,
    lifetime_value: 215.3,
  }
}

export const getQuizMetrics = async (): Promise<QuizMetrics> => {
  return {
    total_quizzes: 5678,
    average_score: 78.5,
    most_popular_topic: 'Quantitative Reasoning',
    questions_per_day: 450,
  }
}

export const getConversionFunnel = async () => {
  return {
    signups: 1234,
    email_verified: 1100,
    took_first_quiz: 950,
    viewed_pricing: 450,
    purchased: 234,
    conversion_rate: 0.189,
  }
}

export const getDailyCohortMetrics = async (date: Date) => {
  return {
    date: date.toISOString().split('T')[0],
    signups: 45,
    day_1_retention: 0.78,
    day_7_retention: 0.45,
    day_30_retention: 0.23,
    upgraded_within_30_days: 12,
  }
}

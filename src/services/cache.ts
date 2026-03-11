// Redis caching service

import redis from 'redis'

let client: any

export const initializeCache = async () => {
  try {
    client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    })
    await client.connect()
    console.log('✅ Redis cache connected')
  } catch (error) {
    console.error('Failed to connect to Redis:', error)
  }
}

export const setCacheValue = async (key: string, value: any, expireSeconds = 3600) => {
  try {
    await client.setEx(key, expireSeconds, JSON.stringify(value))
  } catch (error) {
    console.error('Cache SET error:', error)
  }
}

export const getCacheValue = async (key: string) => {
  try {
    const cached = await client.get(key)
    return cached ? JSON.parse(cached) : null
  } catch (error) {
    console.error('Cache GET error:', error)
    return null
  }
}

export const deleteCacheValue = async (key: string) => {
  try {
    await client.del(key)
  } catch (error) {
    console.error('Cache DELETE error:', error)
  }
}

export const clearAllCache = async () => {
  try {
    await client.flushDb()
    console.log('✅ Cache cleared')
  } catch (error) {
    console.error('Cache FLUSH error:', error)
  }
}

// Cache key generators
export const CACHE_KEYS = {
  USER: (userId: string) => `user:${userId}`,
  USER_STATS: (userId: string) => `user:stats:${userId}`,
  QUIZ: (quizId: string) => `quiz:${quizId}`,
  SUBSCRIPTION: (userId: string) => `subscription:${userId}`,
  ADMIN_STATS: 'admin:stats',
  REVENUE_METRICS: 'revenue:metrics',
  QUESTIONS: (exam: string, topic: string) => `questions:${exam}:${topic}`,
}

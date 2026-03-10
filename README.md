# Exam AI Backend API

Professional Express.js backend for Exam AI SaaS platform.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

## Database

```bash
npx prisma migrate dev --name init
```

## API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile
- `GET /api/users/:id` - Get public profile
- `POST /api/users/me/avatar` - Upload avatar
- `GET /api/users/me/preferences` - Get preferences
- `PUT /api/users/me/preferences` - Update preferences

### Quizzes
- `POST /api/quizzes/generate` - Generate questions
- `GET /api/quizzes/list` - Get past quizzes
- `GET /api/quizzes/:id` - Get quiz details
- `POST /api/quizzes/:id/submit-answer` - Submit answer
- `POST /api/quizzes/:id/complete` - Complete quiz
- `GET /api/quizzes/:id/results` - Get results

### Payments
- `POST /api/payments/checkout-session` - Create Stripe session
- `GET /api/payments/subscription` - Get subscription status
- `PUT /api/payments/subscription` - Update subscription
- `DELETE /api/payments/subscription` - Cancel subscription
- `GET /api/payments/invoices` - Get invoices
- `POST /api/payments/webhook` - Stripe webhook

### Admin
- `GET /api/admin/users` - Get user statistics
- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/revenue` - Get revenue metrics
- `GET /api/admin/quizzes-per-day` - Get quiz statistics

## Health Checks

- `GET /health` - Service health status
- `GET /ready` - Service readiness

## Documentation

See API_REFERENCE.md for detailed endpoint documentation.

## License

MIT

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get all users (admin)
router.get('/users', function (req, res) {
    res.json({
        total_users: 1234,
        active_users: 567,
        paid_users: 234,
    });
});
// Get system stats
router.get('/stats', function (req, res) {
    res.json({
        total_quizzes: 5678,
        avg_score: 78.5,
        total_revenue: 12340,
    });
});
// Get revenue metrics
router.get('/revenue', function (req, res) {
    res.json({
        monthly_revenue: 3000,
        annual_revenue: 36000,
        mrr: 3000,
    });
});
// Get quizzes per day
router.get('/quizzes-per-day', function (req, res) {
    res.json({
        today: 450,
        week_avg: 380,
        month_avg: 350,
    });
});
exports.default = router;

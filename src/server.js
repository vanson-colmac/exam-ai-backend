"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var auth_1 = require("./routes/auth");
var user_1 = require("./routes/user");
var quiz_1 = require("./routes/quiz");
var payment_1 = require("./routes/payment");
var admin_1 = require("./routes/admin");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: ((_a = process.env.CORS_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request logging
app.use(function (req, res, next) {
    console.log("[".concat(new Date().toISOString(), "] ").concat(req.method, " ").concat(req.path));
    next();
});
// Health check
app.get('/health', function (req, res) {
    res.json({
        ok: true,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// Ready check
app.get('/ready', function (req, res) {
    res.json({
        ready: true,
        database: 'connected',
    });
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/quizzes', quiz_1.default);
app.use('/api/payments', payment_1.default);
app.use('/api/admin', admin_1.default);
// 404 handler
app.use(function (req, res) {
    res.status(404).json({
        error: 'Not found',
        path: req.path,
    });
});
// Error handler
app.use(function (err, req, res) {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
    });
});
// Start server
app.listen(PORT, function () {
    console.log("\u2705 Backend running on port ".concat(PORT));
    console.log("\uD83D\uDCE1 API URL: http://localhost:".concat(PORT));
    console.log("\uD83C\uDFE5 Health check: http://localhost:".concat(PORT, "/health"));
});

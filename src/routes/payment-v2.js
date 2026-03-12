"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Middleware to verify auth token
var verifyToken = function (req, res, next) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // In production: verify JWT token
    next();
};
// Middleware to check subscription
var checkSubscription = function (req, res, next) {
    // In production: verify user has active subscription
    next();
};
// Get subscription details
router.get('/subscription', verifyToken, function (req, res) {
    res.json({
        tier: 'free',
        status: 'active',
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        questions_remaining: 3,
        daily_limit: 5,
    });
});
// Create checkout session (Stripe)
router.post('/checkout-session', verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var plan, priceMap, priceId;
    return __generator(this, function (_a) {
        try {
            plan = req.body.plan;
            priceMap = {
                pro: 'price_pro_monthly',
                elite: 'price_elite_monthly',
                master: 'price_master_monthly',
            };
            priceId = priceMap[plan] || 'price_pro_monthly';
            // In production: Create Stripe session
            res.json({
                sessionId: 'cs_test_' + Date.now(),
                url: "https://checkout.stripe.com/pay/cs_test_".concat(Date.now()),
                plan: plan,
                amount: plan === 'pro' ? 999 : plan === 'elite' ? 1999 : 2999,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to create checkout session' });
        }
        return [2 /*return*/];
    });
}); });
// Update subscription
router.put('/subscription', verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var new_tier;
    return __generator(this, function (_a) {
        try {
            new_tier = req.body.new_tier;
            // In production: Call Stripe API
            res.json({
                message: 'Subscription updated',
                old_tier: 'free',
                new_tier: new_tier,
                effective_immediately: true,
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to update subscription' });
        }
        return [2 /*return*/];
    });
}); });
// Cancel subscription
router.delete('/subscription', verifyToken, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            // In production: Call Stripe API
            res.json({
                message: 'Subscription cancelled',
                cancellation_date: new Date(),
            });
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to cancel subscription' });
        }
        return [2 /*return*/];
    });
}); });
// Get invoices
router.get('/invoices', verifyToken, function (req, res) {
    res.json({
        invoices: [
            {
                id: 'inv_1234',
                amount: 999,
                date: new Date(),
                status: 'paid',
                pdf_url: 'https://...',
            },
        ],
    });
});
// Webhook handler for Stripe events
router.post('/webhook', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, type, data;
    return __generator(this, function (_b) {
        try {
            _a = req.body, type = _a.type, data = _a.data;
            // Handle different webhook events
            switch (type) {
                case 'checkout.session.completed':
                    // User payment successful
                    console.log('Payment successful:', data);
                    break;
                case 'customer.subscription.updated':
                    // Subscription updated
                    console.log('Subscription updated:', data);
                    break;
                case 'invoice.payment_failed':
                    // Payment failed
                    console.log('Payment failed:', data);
                    break;
            }
            res.json({ received: true });
        }
        catch (error) {
            res.status(500).json({ error: 'Webhook processing failed' });
        }
        return [2 /*return*/];
    });
}); });
exports.default = router;

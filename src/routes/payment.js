"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Create checkout session
router.post('/checkout-session', function (req, res) {
    res.json({
        sessionId: 'cs_test_123',
        url: 'https://checkout.stripe.com/...',
    });
});
// Get subscription status
router.get('/subscription', function (req, res) {
    res.json({
        tier: 'free',
        status: 'active',
        questions_remaining: 3,
    });
});
// Update subscription
router.put('/subscription', function (req, res) {
    res.json({ updated: true });
});
// Cancel subscription
router.delete('/subscription', function (req, res) {
    res.json({ cancelled: true });
});
// Get invoices
router.get('/invoices', function (req, res) {
    res.json({ invoices: [] });
});
// Webhook handler (Stripe)
router.post('/webhook', function (req, res) {
    res.json({ received: true });
});
exports.default = router;

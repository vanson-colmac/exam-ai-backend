"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
// Get current user profile
router.get('/me', function (req, res) {
    res.json({
        user: {
            id: 'user-123',
            email: 'user@example.com',
            name: 'User',
            avatar_url: null,
            subscription_tier: 'free',
        },
    });
});
// Update user profile
router.put('/me', function (req, res) {
    res.json({ updated: true });
});
// Get public profile
router.get('/:id', function (req, res) {
    res.json({
        id: req.params.id,
        name: 'User',
        avatar_url: null,
    });
});
// Upload avatar
router.post('/me/avatar', function (req, res) {
    res.json({ uploaded: true, url: '/avatars/default.png' });
});
// Get preferences
router.get('/me/preferences', function (req, res) {
    res.json({
        theme: 'light',
        notifications: true,
    });
});
// Update preferences
router.put('/me/preferences', function (req, res) {
    res.json({ updated: true });
});
exports.default = router;

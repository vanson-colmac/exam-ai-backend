"use strict";
// Stripe integration service
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
exports.verifyWebhookSignature = exports.getInvoices = exports.updateSubscription = exports.cancelSubscription = exports.createCheckoutSession = exports.createCustomer = void 0;
var stripe_1 = require("stripe");
var stripeClient = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16',
});
var createCustomer = function (email, name) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, stripeClient.customers.create({
                        email: email,
                        name: name,
                        metadata: {
                            created_via: 'exam_ai_signup',
                        },
                    })];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, customer.id];
            case 2:
                error_1 = _a.sent();
                console.error('Failed to create Stripe customer:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCustomer = createCustomer;
var createCheckoutSession = function (customerId, priceId, successUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var session, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, stripeClient.checkout.sessions.create({
                        customer: customerId,
                        payment_method_types: ['card'],
                        line_items: [
                            {
                                price: priceId,
                                quantity: 1,
                            },
                        ],
                        mode: 'subscription',
                        success_url: successUrl,
                        cancel_url: successUrl,
                    })];
            case 1:
                session = _a.sent();
                return [2 /*return*/, session];
            case 2:
                error_2 = _a.sent();
                console.error('Failed to create checkout session:', error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCheckoutSession = createCheckoutSession;
var cancelSubscription = function (subscriptionId) { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, stripeClient.subscriptions.update(subscriptionId, {
                        cancel_at_period_end: true,
                    })];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('Failed to cancel subscription:', error_3);
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.cancelSubscription = cancelSubscription;
var updateSubscription = function (subscriptionId, newPriceId) { return __awaiter(void 0, void 0, void 0, function () {
    var subscription, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, stripeClient.subscriptions.retrieve(subscriptionId)];
            case 1:
                subscription = _a.sent();
                return [4 /*yield*/, stripeClient.subscriptions.update(subscriptionId, {
                        items: [
                            {
                                id: subscription.items.data[0].id,
                                price: newPriceId,
                            },
                        ],
                    })];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error('Failed to update subscription:', error_4);
                throw error_4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateSubscription = updateSubscription;
var getInvoices = function (customerId) { return __awaiter(void 0, void 0, void 0, function () {
    var invoices, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, stripeClient.invoices.list({
                        customer: customerId,
                        limit: 10,
                    })];
            case 1:
                invoices = _a.sent();
                return [2 /*return*/, invoices.data];
            case 2:
                error_5 = _a.sent();
                console.error('Failed to get invoices:', error_5);
                throw error_5;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getInvoices = getInvoices;
var verifyWebhookSignature = function (body, signature) {
    try {
        return stripeClient.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || '');
    }
    catch (error) {
        console.error('Webhook signature verification failed:', error);
        throw error;
    }
};
exports.verifyWebhookSignature = verifyWebhookSignature;

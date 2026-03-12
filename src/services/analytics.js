"use strict";
// Analytics service for tracking metrics
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
exports.getDailyCohortMetrics = exports.getConversionFunnel = exports.getQuizMetrics = exports.getRevenueMetrics = exports.getUserMetrics = void 0;
// In production: Connect to analytics database
var getUserMetrics = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                total_users: 1234,
                active_users: 567,
                paid_users: 234,
                free_users: 1000,
                churn_rate: 0.05,
            }];
    });
}); };
exports.getUserMetrics = getUserMetrics;
var getRevenueMetrics = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                total_revenue: 12340,
                monthly_recurring_revenue: 2340,
                average_customer_value: 52.5,
                lifetime_value: 215.3,
            }];
    });
}); };
exports.getRevenueMetrics = getRevenueMetrics;
var getQuizMetrics = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                total_quizzes: 5678,
                average_score: 78.5,
                most_popular_topic: 'Quantitative Reasoning',
                questions_per_day: 450,
            }];
    });
}); };
exports.getQuizMetrics = getQuizMetrics;
var getConversionFunnel = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                signups: 1234,
                email_verified: 1100,
                took_first_quiz: 950,
                viewed_pricing: 450,
                purchased: 234,
                conversion_rate: 0.189,
            }];
    });
}); };
exports.getConversionFunnel = getConversionFunnel;
var getDailyCohortMetrics = function (date) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, {
                date: date.toISOString().split('T')[0],
                signups: 45,
                day_1_retention: 0.78,
                day_7_retention: 0.45,
                day_30_retention: 0.23,
                upgraded_within_30_days: 12,
            }];
    });
}); };
exports.getDailyCohortMetrics = getDailyCohortMetrics;

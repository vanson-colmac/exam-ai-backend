"use strict";
// Email service for sending notifications
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
exports.sendUpgradeConfirmation = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
var nodemailer_1 = require("nodemailer");
var transporter = nodemailer_1.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});
var sendVerificationEmail = function (email, code) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailOptions = {
                    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
                    to: email,
                    subject: 'Verify your Exam AI account',
                    html: "\n      <h2>Welcome to Exam AI!</h2>\n      <p>Please use this code to verify your email address:</p>\n      <h1 style=\"color: #3B82F6; font-size: 32px; letter-spacing: 2px;\">".concat(code, "</h1>\n      <p>This code expires in 10 minutes.</p>\n      <p>If you didn't create this account, please ignore this email.</p>\n    "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 2:
                _a.sent();
                console.log("Verification email sent to ".concat(email));
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Failed to send verification email:', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendVerificationEmail = sendVerificationEmail;
var sendWelcomeEmail = function (email, name) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailOptions = {
                    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
                    to: email,
                    subject: 'Welcome to Exam AI',
                    html: "\n      <h2>Welcome, ".concat(name, "!</h2>\n      <p>We're excited to have you on Exam AI.</p>\n      <p>Start generating AI-powered exam questions in seconds.</p>\n      <a href=\"https://exam-ai.vercel.app/dashboard\" style=\"background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;\">Go to Dashboard</a>\n      <p style=\"margin-top: 20px; font-size: 12px; color: #999;\">\n        Need help? <a href=\"https://exam-ai.vercel.app/support\">Contact Support</a>\n      </p>\n    "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 2:
                _a.sent();
                console.log("Welcome email sent to ".concat(email));
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Failed to send welcome email:', error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendWelcomeEmail = sendWelcomeEmail;
var sendPasswordResetEmail = function (email, resetLink) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailOptions = {
                    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
                    to: email,
                    subject: 'Reset your Exam AI password',
                    html: "\n      <h2>Password Reset Request</h2>\n      <p>We received a request to reset your password.</p>\n      <a href=\"".concat(resetLink, "\" style=\"background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;\">Reset Password</a>\n      <p>This link expires in 1 hour.</p>\n      <p>If you didn't request this, please ignore this email.</p>\n    "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 2:
                _a.sent();
                console.log("Password reset email sent to ".concat(email));
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Failed to send password reset email:', error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendPasswordResetEmail = sendPasswordResetEmail;
var sendUpgradeConfirmation = function (email, plan, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var mailOptions, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mailOptions = {
                    from: process.env.SMTP_FROM || 'noreply@exam-ai.com',
                    to: email,
                    subject: 'Upgrade Confirmation - Exam AI',
                    html: "\n      <h2>Thank you for upgrading!</h2>\n      <p>Your account has been upgraded to the <strong>".concat(plan, " plan</strong>.</p>\n      <p>Amount: <strong>$").concat((amount / 100).toFixed(2), "</strong></p>\n      <p>You now have:</p>\n      <ul>\n        <li>Unlimited questions per day</li>\n        <li>Access to all topics</li>\n        <li>Advanced analytics</li>\n        <li>Priority support</li>\n      </ul>\n      <a href=\"https://exam-ai.vercel.app/dashboard\" style=\"background-color: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;\">Go to Dashboard</a>\n    "),
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, transporter.sendMail(mailOptions)];
            case 2:
                _a.sent();
                console.log("Upgrade confirmation email sent to ".concat(email));
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                console.error('Failed to send upgrade confirmation:', error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.sendUpgradeConfirmation = sendUpgradeConfirmation;

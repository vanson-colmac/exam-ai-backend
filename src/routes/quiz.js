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
var axios_1 = require("axios");
var router = (0, express_1.Router)();
// Generate questions
router.post('/generate', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, exam_id, topic_id, _b, count, response, error_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                _a = req.body, exam_id = _a.exam_id, topic_id = _a.topic_id, _b = _a.count, count = _b === void 0 ? 5 : _b;
                return [4 /*yield*/, axios_1.default.post('http://localhost:5050/generate', {
                        exam: exam_id,
                        topic: topic_id,
                        count: count,
                    })];
            case 1:
                response = _c.sent();
                res.json({
                    success: true,
                    data: response.data,
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _c.sent();
                res.status(500).json({ error: 'Failed to generate questions' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get past quizzes
router.get('/list', function (req, res) {
    res.json({
        quizzes: [
            {
                id: '1',
                exam: 'GMAT',
                topic: 'Quantitative',
                score: 85,
                date: new Date(),
            },
        ],
    });
});
// Get quiz details
router.get('/:id', function (req, res) {
    res.json({
        quiz: {
            id: req.params.id,
            exam: 'GMAT',
            score: 85,
            questions: [],
        },
    });
});
// Submit answer
router.post('/:id/submit-answer', function (req, res) {
    res.json({ correct: true });
});
// Complete quiz
router.post('/:id/complete', function (req, res) {
    res.json({ completed: true });
});
// Get results
router.get('/:id/results', function (req, res) {
    res.json({
        score: 85,
        correctAnswers: 85,
        totalQuestions: 100,
    });
});
// Bookmark question
router.post('/bookmark', function (req, res) {
    res.json({ bookmarked: true });
});
// Get bookmarks
router.get('/bookmarks', function (req, res) {
    res.json({ bookmarks: [] });
});
// Get explanations
router.get('/:id/explanations', function (req, res) {
    res.json({ explanations: [] });
});
exports.default = router;

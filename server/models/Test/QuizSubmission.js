const QuizSubmissionSchema = new mongoose.Schema({
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    answers: [Number], // selected index
    score: Number,
    passed: Boolean,

    submittedAt: { type: Date, default: Date.now }
});

const RoundSchema = new mongoose.Schema({
    evaluationFlow: { type: mongoose.Schema.Types.ObjectId, ref: 'EvaluationFlow' },

    title: String,
    description: String,
    order: Number,

    type: {
        type: String,
        enum: ['quiz', 'dsa', 'assignment', 'interview', 'form', 'presentation'],
        required: true
    },

    quizRef: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, // Optional for quiz rounds
    startTime: Date,
    endTime: Date,
    durationMinutes: Number,

    createdAt: { type: Date, default: Date.now }
});

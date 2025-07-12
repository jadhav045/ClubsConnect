import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    questionText: String,
    options: [String],               // MCQ options
    correctOptionIndex: Number,     // Index of correct option
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Student / Faculty / Alumni

    role: { type: String, enum: ['student', 'faculty', 'alumni'] },   // for filtering / admin stats

    durationMinutes: Number,
    totalMarks: Number,

    questions: [QuestionSchema],
    autoEvaluate: { type: Boolean, default: true },

    // Context type: "opportunity", "club", "course", "general"
    contextType: {
        type: String,
        enum: ['opportunity', 'club', 'course', 'general'],
        default: 'general'
    },

    contextRef: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'contextType'
    },

    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', QuizSchema);

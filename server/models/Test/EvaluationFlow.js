const EvaluationFlowSchema = new mongoose.Schema({
    title: String,
    description: String,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['student', 'faculty', 'alumni'], required: true },

    purpose: {
        type: String,
        enum: ['hiring', 'hackathon', 'tech_event', 'assignment', 'practice', 'research_selection', 'other'],
        required: true
    },

    contextType: { type: String, enum: ['club', 'course', 'opportunity', 'general'], default: 'general' },
    contextRef: { type: mongoose.Schema.Types.ObjectId, refPath: 'contextType' },

    rounds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Round' }],
    startDate: Date,
    endDate: Date,
    isPublic: { type: Boolean, default: true },

    metadata: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: Date
    }
});

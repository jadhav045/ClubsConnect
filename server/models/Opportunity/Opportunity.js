const OpportunitySchema = new mongoose.Schema({
    title: String,
    description: String,

    type: {
        type: String,
        enum: [
            "Internship", "Job", "Industry Project", "Research", "Workshop",
            "Scholarship", "Mentorship", "Freelance", "Startup Collaboration", "Other"
        ],
        required: true
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['alumni', 'faculty'], required: true },

    department: String,
    domainTags: [String],
    deadline: Date,

    // Link to EvaluationFlow
    evaluationFlow: { type: mongoose.Schema.Types.ObjectId, ref: 'EvaluationFlow' },

    createdAt: { type: Date, default: Date.now }
});

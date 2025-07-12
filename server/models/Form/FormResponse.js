// models/FormResponse.js
import mongoose from "mongoose";

const formResponseSchema = new mongoose.Schema(
    {
        form: { type: mongoose.Schema.Types.ObjectId, ref: "DynamicForm", required: true },

        submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        isGroup: { type: Boolean, default: false },
        groupMembers: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                role: String
            }
        ],

        answers: mongoose.Schema.Types.Mixed, // key-value pair: { "collegeId": "221034", ... }

        submittedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Optional index to prevent duplicate
formResponseSchema.index({ form: 1, submittedBy: 1 }, { unique: true });

export default mongoose.model("FormResponse", formResponseSchema);

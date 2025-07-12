// models/DynamicForm.js
import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema({
    label: { type: String, required: true },
    type: {
        type: String,
        enum: ["text", "textarea", "number", "email", "dropdown", "checkbox", "radio", "file", "date", "rating"],
        required: true
    },
    name: { type: String, required: true }, // e.g., "collegeId", "portfolio"
    options: [String], // For dropdown/radio/checkbox
    required: { type: Boolean, default: false },
    placeholder: String,
    min: Number,
    max: Number
}, { _id: false });

const dynamicFormSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,

        purpose: {
            type: String,
            enum: ["event_registration", "event_feedback", "survey", "suggestion", "custom"],
            default: "custom"
        },

        linkedEvent: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // optional

        createdBy: {
            id: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "createdBy.role" },
            role: { type: String, enum: ["Club", "Faculty", "Admin"], required: true }
        },

        isGroupForm: { type: Boolean, default: false },

        fields: [fieldSchema],

        openFrom: { type: Date, default: Date.now },
        openUntil: { type: Date },

        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
);

export default mongoose.model("DynamicForm", dynamicFormSchema);

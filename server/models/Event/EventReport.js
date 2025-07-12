// models/EventReport.js
import mongoose from "mongoose";

const eventReportSchema = new mongoose.Schema(
    {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, unique: true },

        generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        highlights: String,
        challengesFaced: String,
        outcomes: String,

        feedbackSummary: mongoose.Schema.Types.Mixed, // e.g., avg ratings, suggestions, etc.
        attendanceSummary: {
            totalRegistrations: Number,
            totalAttendance: Number,
            attendancePercentage: Number
        },

        photos: [String], // image URLs (cloud or local path)
        attachments: [String], // e.g., zip files, PDFs, certificates

        submittedToFaculty: { type: Boolean, default: false },
        submissionDate: { type: Date },

        generatedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model("EventReport", eventReportSchema);

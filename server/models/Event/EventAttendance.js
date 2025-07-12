// models/EventAttendance.js
import mongoose from "mongoose";

const eventAttendanceSchema = new mongoose.Schema(
    {
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

        student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        method: {
            type: String,
            enum: ["manual", "self", "qr", "otp"],
            default: "manual"
        },

        session: {
            type: String,
            default: "main" // or "Day 1 Morning", "Session A", etc.
        },

        markedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // organizer/faculty who marked attendance

        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Ensure one attendance per session per student
eventAttendanceSchema.index({ event: 1, session: 1, student: 1 }, { unique: true });

export default mongoose.model("EventAttendance", eventAttendanceSchema);

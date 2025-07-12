import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        discussionId: { type: mongoose.Schema.Types.ObjectId, ref: "Discussion" },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: "DiscussionComment" },
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        reason: { type: String, required: true },
    },
    { timestamps: true }
);

export const DiscussionReport = mongoose.model("DiscussionReport", reportSchema);

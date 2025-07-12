import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    },
    { _id: true }
);

const commentSchema = new mongoose.Schema(
    {
        sourceType: {
            type: String,
            enum: ["Post", "Discussion"],
            required: true,
        },
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "sourceType",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        replies: [replySchema],
        upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        isReported: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

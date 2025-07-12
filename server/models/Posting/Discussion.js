import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		category: {
			type: String,
			enum: [
				"Interview Experience",
				"Roadmap",
				"Career",
				"Q&A",
				"Events",
				"Project Showcase",
				"Hackathons",
				"General Advice",
				"Placement",
				"Other",
			],
			required: true,
		},
		tags: [{ type: String, lowercase: true, trim: true }], // e.g., "dp", "greedy"
		createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
		appreciations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
		viewCount: { type: Number, default: 0 },
		isPinned: { type: Boolean, default: false },
		isClosed: { type: Boolean, default: false },
		visibility: {
			type: String,
			enum: ["public", "college-only"],
			default: "college-only",
		},
	},
	{ timestamps: true }
);

export const Discussion = mongoose.model("Discussion", discussionSchema);

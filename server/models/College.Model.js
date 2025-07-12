import mongoose from "mongoose";
const { Schema } = mongoose;

const CollegeSchema = new Schema(
	{
		// Identity & Branding
		name: { type: String, required: true, unique: true },
		collegeCode: { type: String, unique: true },
		universityAffiliation: { type: String },
		description: { type: String },
		logo: { type: String },
		banner: { type: String },
		establishedYear: { type: Number },
		ranking: { type: Number },
		accreditationDetails: {
			body: { type: String },
			grade: { type: String },
		},

		// Address & Contact
		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipCode: { type: String },
		},
		contactInfo: {
			phoneNumber: { type: String },
			email: { type: String },
			website: { type: String },
		},
		socialLinks: {
			linkedIn: { type: String },
			twitter: { type: String },
			facebook: { type: String },
			instagram: { type: String },
		},

		// User Management
		faculties: [{ type: Schema.Types.ObjectId, ref: "Faculty" }],
		students: [{ type: Schema.Types.ObjectId, ref: "User" }],
		clubs: [{ type: Schema.Types.ObjectId, ref: "Club" }],
		collegeAdmins: [{ type: Schema.Types.ObjectId, ref: "User" }],
		adminDetails: { type: Schema.Types.ObjectId, ref: "User" }, // main super-admin if any

		studentCount: { type: Number, default: 0 },
		facultyCount: { type: Number, default: 0 },

		// Infrastructure
		campusArea: { type: Number },
		hostelsAvailable: { type: Boolean, default: false },
		libraryDetails: {
			booksCount: { type: Number },
			digitalAccess: { type: Boolean },
		},
		labs: [{ type: String }],

		// Announcements
		announcements: [
			{
				title: { type: String },
				content: { type: String },
				createdBy: { type: Schema.Types.ObjectId, ref: "Faculty" },
				createdAt: { type: Date, default: Date.now },
			},
		],

		// Collaborations
		collaborations: [
			{
				withCollege: { type: Schema.Types.ObjectId, ref: "College" },
				description: { type: String },
				status: {
					type: String,
					enum: ["pending", "approved", "rejected"],
					default: "pending",
				},
				requestedBy: { type: Schema.Types.ObjectId, ref: "User" },
				requestedAt: { type: Date, default: Date.now },
			},
		],

		// Performance
		performanceMetrics: {
			placementRate: { type: Number, default: 0 },
			researchPapersPublished: { type: Number, default: 0 },
			facultyStudentRatio: { type: Number, default: 0 },
		},

		// State
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

export const College = mongoose.model("College", CollegeSchema);

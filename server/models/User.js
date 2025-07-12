import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Reusable Schemas
const ClubMembershipSchema = new Schema({
	club: { type: Schema.Types.ObjectId, ref: 'Club' },
	role: {
		type: String,
		enum: [
			'President', 'Vice President', 'Secretary', 'Treasurer',
			'Event Coordinator', 'Marketing Officer', 'Content Manager',
			'Member Relations Officer', 'Supporter', 'Club Mentor'
		],
		default: 'Supporter'
	}
}, { _id: false });

const InternshipJobSchema = new Schema({
	title: String,
	company: String,
	location: String,
	duration: String,
	isCurrent: { type: Boolean, default: false }
}, { _id: false });

const PublicationSchema = new Schema({
	title: String,
	journal: String,
	date: Date,
	url: String
}, { _id: false });

const BookmarkSchema = new Schema({
	type: { type: String, enum: ['event', 'post', 'opportunity'], required: true },
	refId: { type: Schema.Types.ObjectId, required: true }
}, { _id: false });

// Role-based Subschemas

const StudentProfileSchema = new Schema({
	cgpa: { type: Number, min: 0, max: 10 },
	enrollmentYear: Number,
	internships: [InternshipJobSchema],
	mentor: { type: Schema.Types.ObjectId, ref: 'User' },
	mentorshipRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { _id: false });

const AlumniProfileSchema = new Schema({
	graduationYear: Number,
	designation: String,
	company: String,
	linkedin: String,
	portfolio: String,
	isMentorAvailable: { type: Boolean, default: false },
	areasOfExpertise: [String],
	pastClubs: [{ type: Schema.Types.ObjectId, ref: 'Club' }],
	jobs: [InternshipJobSchema]
}, { _id: false });

const FacultyProfileSchema = new Schema({
	dateOfJoining: Date,
	designation: String,
	qualifications: [String],
	researchAreas: [String],
	teachingSubjects: [String],
	skills: [String],
	publications: [PublicationSchema],
	clubsManaged: [{ type: Schema.Types.ObjectId, ref: 'Club' }],
	announcements: [{ type: Schema.Types.ObjectId, ref: 'Announcement' }],
	isEventApprover: { type: Boolean, default: true },
	subRole: {
		type: String,
		enum: ['Head of Department', 'Senior Faculty', 'Junior Faculty', 'Advisor', 'Coordinator', 'Mentor'],
		default: 'Junior Faculty'
	}
}, { _id: false });

const AdminProfileSchema = new Schema({
	collegesManaged: [{ type: Schema.Types.ObjectId, ref: 'College' }]
}, { _id: false });

// Main User Schema
const UserSchema = new Schema({

	name: { type: String },
	email: { type: String, required: true, unique: true },
	password: { type: String }, // optional for OAuth
	googleId: { type: String },

	role: {
		type: String,
		enum: ['student', 'faculty', 'alumni', 'admin'],
		required: true
	},

	profileImage: String,
	college: { type: Schema.Types.ObjectId, ref: 'College' },

	// Common
	skills: [String],
	badges: [String],

	bookmarks: [BookmarkSchema],
	clubs: [ClubMembershipSchema],

	posts: [{ type: Schema.Types.ObjectId, ref: 'Pos' }],
	Opportunity: [{ type: Schema.Types.ObjectId, ref: 'Opportunity' }],
	eventParticipations: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
	opportunitiesApplied: [{ type: Schema.Types.ObjectId, ref: 'OpportunityPost' }],

	// Role-specific
	studentProfile: StudentProfileSchema,
	alumniProfile: AlumniProfileSchema,
	facultyProfile: FacultyProfileSchema,
	adminProfile: AdminProfileSchema,

	// Social
	socialLinks: {
		linkedIn: { type: String, default: '' },
		twitter: { type: String, default: '' },
		github: { type: String, default: '' },
		personalWebsite: { type: String, default: '' }
	},

	// Notifications
	notifications: {
		email: { type: Boolean, default: true },
		sms: { type: Boolean, default: false }
	},

	createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);

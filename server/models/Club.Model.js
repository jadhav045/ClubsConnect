import mongoose from "mongoose";
const { Schema } = mongoose;

const ClubSchema = new Schema(
  {
    clubId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    clubName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    shortName: {
      type: String,
      unique: true,
      trim: true,
    },
    motto: { type: String, trim: true },
    description: { type: String, trim: true },
    department: { type: String, trim: true },
    category: {
      type: String,
      enum: [
        'technical',
        'cultural',
        'social',
        'sports',
        'entrepreneurship',
        'literary',
        'arts',
        'media',
        'others'
      ],
      trim: true
    },
    president: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    facultyAdvisor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: [
            "president",
            "vice_president",
            "secretary",
            "treasurer",
            "admin",
            "event_coordinator",
            "marketing_officer",
            "content_manager",
            "member_relations_officer",
            "supporter",
            "member",
          ],
          default: "member",
        },
        joinedDate: { type: Date, default: Date.now },
      },
    ],

    foundingYear: { type: Number },
    foundingMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // when we will allowed new presdent then automatically should this move to pastLeaders
    pastLeaders: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        role: { type: String },
        tenureStart: { type: Date },
        tenureEnd: { type: Date },
      },
    ],

    achievements: [
      {
        title: { type: String, required: true },
        description: { type: String },
        date: { type: Date },
        image: { type: String },
      },
    ],

    collaborations: [
      {
        clubId: { type: Schema.Types.ObjectId, ref: "Club" },
        eventId: { type: Schema.Types.ObjectId, ref: "Event" },
        details: { type: String },
      },
    ],

    sponsors: [
      {
        name: String,
        logo: String,
        website: String,
        event: { type: Schema.Types.ObjectId, ref: "Event" },
      },
    ],

    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    resources: [{ type: Schema.Types.ObjectId, ref: "ResourceLibrary" }],

    documents: [
      {
        title: { type: String, required: true },
        fileUrl: { type: String, required: true },
        uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    advisors: [{ type: Schema.Types.ObjectId, ref: "User" }],
    contactEmail: { type: String },

    socialMedia: {
      instagram: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      github: { type: String },
      personalWebsite: { type: String },
    },

    logo: { type: String },
    banner: { type: String },

    collegeId: { type: Schema.Types.ObjectId, ref: "College", required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },

    analytics: {
      followersCount: { type: Number, default: 0 },
      postEngagement: { type: Number, default: 0 },
      eventImpact: { type: Number, default: 0 },
    },

    visibility: {
      type: String,
      enum: ["public", "college-only"],
      default: "college-only",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending Approval"],
      default: "Active",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Club = mongoose.model("Club", ClubSchema);

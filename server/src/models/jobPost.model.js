import mongoose from "mongoose";

const jobPostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      required: true,
    },
    link: {
      type: String,
      default: "https://www.google.com/",
    },
  },
  { timestamps: true }
);

export const JobPost = mongoose.model("JobPost", jobPostSchema);

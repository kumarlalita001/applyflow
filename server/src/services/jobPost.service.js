import { JobPost } from "../models/jobPost.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createJob = async (data) => {
  const job = await JobPost.create(data);

  if (!job) {
    throw new ApiError(500, "Internal server Error Unable to create jobpost");
  }

  return job;
};

export const getJobs =  async (userId, filters, limit, skip) => {
  const query = { userId, ...filters };
  const jobs = await JobPost.find(query)
    .limit(limit)
    .skip(skip)
    .sort({ createdAt: -1 });
  const total = await JobPost.countDocuments(query);
  return { jobs, total };
};

export const getJobById =  async (id, userId) => {
  const job = await JobPost.findOne({ _id: id, userId });
  if (!job) throw new ApiError(404,"Job not found");

  return job;
};

export const updateJob =  async (id, userId, updates) => {
  const job = await JobPost.findOneAndUpdate({ _id: id, userId }, updates, {
    new: true,
  });
  if (!job) throw new ApiError(404,"JobPost Update failed");
  return job;
};

export const deleteJob = async (id, userId) => {
  const job = await JobPost.findOneAndDelete({ _id: id, userId });
  if (!job) throw new ApiError(404,"JobPost Delete failed");
};

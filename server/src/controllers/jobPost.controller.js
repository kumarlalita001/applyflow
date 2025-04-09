import asyncHandler from "../utils/asyncHandler.js";
import * as jobPostService from "../services/jobPost.service.js";
import ApiError from "../utils/apiError.js";

export const createJob = asyncHandler(async (req, res) => {
  try {
    const job = await jobPostService.createJob({
      ...req.body,
      userId: req.user.id,
    });
    res
      .status(200)
      .json(new ApiResponse(200, job, "New JobPost Created Successfully"));
  } catch (error) {
    console.log("Error in CreateJob Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const getJobs = asyncHandler(async (req, res) => {
  try {
    const {
      role,
      company,
      status,
      appliedDate,
      limit = 10,
      skip = 0,
    } = req.query;
    const filters = {};
    if (role) filters.role = new RegExp(role, "i");
    if (company) filters.company = new RegExp(company, "i");
    if (status) filters.status = status;
    if (appliedDate) filters.appliedDate = new Date(appliedDate);
    const data = await jobPostService.getJobs(
      req.user.id,
      filters,
      parseInt(limit),
      parseInt(skip)
    );

    res
      .status(200)
      .json(new ApiResponse(200, data, "JobPosts Fetched Successfully"));
  } catch (error) {
    console.log("Error in getJobs Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export const getJobById = async (req, res) => {
  try {
    const job = await jobPostService.getJobById(req.params.id, req.user.id);
    res
    .status(200)
    .json(new ApiResponse(200, job, " JobPost Fetched Successfully"));
  } catch (error) {
    console.log("Error in getJob Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
};

export const updateJob = async (req, res) => {
  try {
    const job = await jobPostService.updateJob(
      req.params.id,
      req.user.id,
      req.body
    );
    res
      .status(200)
      .json(new ApiResponse(200, job, " JobPost Updated Successfully"));
  } catch (error) {
    console.log("Error in Update getJob Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
};

export const deleteJob = async (req, res) => {
  try {
    await jobPostService.deleteJob(req.params.id, req.user._id);
    res
    .status(200)
    .json(new ApiResponse(200, {}, " JobPost Deleted Successfully"));
  } catch (error) {
    console.log("Error in delete getJob Controller", error);
    throw new ApiError(error.statusCode, error.message);
  }
};

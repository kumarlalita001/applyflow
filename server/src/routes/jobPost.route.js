import { Router } from "express";
import { createJob, deleteJob, getJobById, getJobs, updateJob } from "../controllers/jobPost.controller.js";

const router = Router();

router.post('/', createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
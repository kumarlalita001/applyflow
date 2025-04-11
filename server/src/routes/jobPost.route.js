import { Router } from "express";
import { createJob, deleteJob,  getAnalytics,  getJobById, getJobs, updateJob } from "../controllers/jobPost.controller.js";
import { checkAuthentication } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(checkAuthentication);
router.post('/',checkAuthentication,createJob);
router.get('/', getJobs);
router.get('/:id', getJobById);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/getanalytics',getAnalytics);

export default router;
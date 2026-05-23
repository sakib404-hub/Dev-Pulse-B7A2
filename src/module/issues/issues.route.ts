import { Router } from "express";
import { issuesController } from "./issues.controller";

const router = Router();

router.get('/', issuesController.getAllIssues);
router.post('/', issuesController.createIssue);

export const issuesRoute = router;
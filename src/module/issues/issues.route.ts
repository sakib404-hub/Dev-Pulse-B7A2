import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import authUpdation from "../../middleware/authUpdation";
import authMaintaner from "../../middleware/authMaintainer";

const router = Router();

router.post('/', auth(), issuesController.createIssue);
router.get('/', issuesController.getAllIssues);
router.get('/:id', issuesController.getSingleIssue);
router.patch('/:id',auth(), authUpdation(), issuesController.updateIssue);
router.delete('/:id', auth(), authMaintaner(), issuesController.deleteIssue)

export const issuesRoute = router;
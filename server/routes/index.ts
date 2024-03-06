import { Router } from "express"
const router = Router();

import { createDuty, deleteDuty, getDuties, getDutyById, updateDuty } from "../controllers/duty.controller";

router.get('/api/v1/duties', getDuties);
router.get('/api/v1/duties/:id', getDutyById);
router.post('/api/v1/duties/', createDuty);
router.patch('/api/v1/duties/:id', updateDuty);
router.delete('/api/v1/duties/:id', deleteDuty);

export default router;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const duty_controller_1 = require("../controllers/duty.controller");
const router = (0, express_1.Router)();
router.get('/api/v1/duties', duty_controller_1.getDuties);
router.get('/api/v1/duties/:id', duty_controller_1.getDutyById);
router.post('/api/v1/duties/', duty_controller_1.createDuty);
router.patch('/api/v1/duties/:id', duty_controller_1.updateDuty);
router.delete('/api/v1/duties/:id', duty_controller_1.deleteDuty);
exports.default = router;

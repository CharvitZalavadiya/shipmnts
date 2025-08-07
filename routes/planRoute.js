import express from 'express';
import { calculatePrice, createPlan, getPlan } from "../controllers/planController.js"

const router = express.Router()

router.post('/', createPlan)
router.get('/:plan_id', getPlan)
router.post('/calculate', calculatePrice)

export default router
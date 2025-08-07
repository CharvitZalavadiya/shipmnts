import express from 'express';
import { createStore,updateStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', createStore)
router.put('/:store_location', updateStore)

export default router;
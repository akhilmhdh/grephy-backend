import { Router } from 'express';

import graphController from './graphController';

const router = Router();

router.post('/create', graphController.createGraph);

router.get('/read/:id', graphController.readGraph);

router.put('/update/:id', graphController.updateGraph);

router.delete('/delete/:id', graphController.deleteGraph);

export default router;

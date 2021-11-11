import { Router } from 'express';
import { createTarea, updateTaskState, getTarea, getTareaCount } from '../controllers/tarea'

const router = Router();
 
router.post('/tarea',createTarea)

router.get('/tarea/count',getTareaCount)

router.get('/tarea',getTarea)

router.put('/tarea/state/:id',updateTaskState)
 

export default router
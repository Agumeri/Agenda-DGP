import { Router } from 'express';
import { createTarea, updateTaskState, getTarea, getTareaCount } from '../controllers/tarea'

const router = Router();

/////////////////////
////// Tarea /////
///////////////////// 

/**
 * @swagger
 * /tarea:
 *  post:
 *      summary: crear una nueva tarea
 *      tags: [Tarea]
 * 
 */
router.post('/tarea',createTarea)


/**
 * @swagger
 * /tarea:
 *  get:
 *      summary: Obtiene el numero de tareas
 *      tags: [Tarea]
 * 
 */
router.get('/tarea/count',getTareaCount)


/**
 * @swagger
 * /tarea:
 *  get:
 *      summary: obtiene todas las tareas
 *      tags: [Tarea]
 * 
 */
router.get('/tarea',getTarea)


/**
 * @swagger
 * /tarea:
 *  put:
 *      summary: actualizar una tareas
 *      tags: [Tarea]
 * 
 */
router.put('/tarea/state/:id',updateTaskState)
 

export default router
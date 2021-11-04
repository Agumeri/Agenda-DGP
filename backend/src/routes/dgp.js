import { Router } from 'express';
import { deleteTask, getTask, getTaskCount, getTasks, saveTask, updateTask } from '../controllers/dgp'

const router = Router()
/**
 * @swagger
 * tags:
 *  name: Tasks
 *  description: Tasks endpoint
 */

/**
 * @swagger
 * /tasks:
 *  get:
 *      summary: esto obtiene todas las tareas
 *      tags: [Tasks]
 * 
 */
router.get('/tasks',getTasks)

/**
 * @swagger
 * /tasks/count:
 *  get:
 *      summary: esto obtiene el contador total de tareas
 *      tags: [Tasks]
 * 
 */
router.get('/tasks/count',getTaskCount)

/**
 * @swagger
 * /tasks:
 *  get:
 *      summary: esto obtiene la tarea por id
 *      tags: [Tasks]
 */
router.get('/tasks/:id',getTask)

/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: añade una nueva tarea
 *      tags: [Tasks]
 */
router.post('/tasks',saveTask)

/**
 * @swagger
 * /tasks:
 *  delete:
 *      summary: elimina una tarea por id
 *      tags: [Tasks]
 */
router.delete('/tasks/:id',deleteTask)

/**
 * @swagger
 * /tasks:
 *  put:
 *      summary: actualiza una tarea por id
 *      tags: [Tasks]
 */
router.put('/tasks/:id',updateTask)

export default router;
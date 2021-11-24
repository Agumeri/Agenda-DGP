import { Router } from 'express';
import { createTarea, updateTaskState, getTareas, getTarea, getTareaCount, updateTask, getTareaByAlum, getTareasPlantilla, asignarTareaAlumno} from '../controllers/tarea'

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
router.get('/tarea',getTareas)

/**
 * @swagger
 * /tarea:
 *  get:
 *      summary: obtiene todas las tareas pero para la asignación
 *      tags: [Tarea]
 * 
 */
 router.get('/tarea/distinct',getTareasPlantilla)

/**
 * @swagger
 * /tarea/:id:
 *  get:
 *      summary: obtiene una tarea segun el id
 *      tags: [Tarea]
 * 
 */
 router.get('/tarea/:id',getTarea)

/**
 * @swagger
 * /tarea/:id:
 *  get:
 *      summary: obtiene una tarea segun el id
 *      tags: [Tarea]
 * 
 */
  router.get('/tarea/list/:id_alum',getTareaByAlum)

/**
 * @swagger
 * /tarea:
 *  put:
 *      summary: actualizar una tareas
 *      tags: [Tarea]
 * 
 */
 router.put('/tarea/:id',updateTask)

/**
 * @swagger
 * /tarea/state/id:
 *  put:
 *      summary: finalizar estado de una tarea
 *      tags: [Tarea]
 * 
 */
router.put('/tarea/state/:id',updateTaskState)

/**
 * @swagger
 * /tarea/state/id:
 *  post:
 *      summary: crear una tarea nueva con un alumno asignado
 *      tags: [Tarea]
 * 
 */
 router.post('/tarea/asignar',asignarTareaAlumno)
 

export default router
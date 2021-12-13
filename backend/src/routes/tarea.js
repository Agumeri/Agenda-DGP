import { Router } from 'express';
import { createNewTareaFija, createId, createTarea, updateTaskState, getTareas, getTarea, getTareaCount, updateTask, getTareaByAlum, getTareasPlantilla, asignarTareaAlumno} from '../controllers/tarea'

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
 *  post:
 *      summary: crear una nueva tarea fija
 *      tags: [Tarea]
 * 
 */
 router.post('/tarea/:id', createNewTareaFija)


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
 * /tarea/new:
 *  get:
 *      summary: crear un id
 *      tags: [Tarea]
 * 
 */
  router.get('/tarea/new/:id', createId)

  
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
 * /tarea/asignar:
 *  post:
 *      summary: crear una tarea nueva con un alumno asignado
 *      tags: [Tarea]
 * 
 */
 router.post('/tarea/asignar/:idTarea',asignarTareaAlumno)
 

export default router
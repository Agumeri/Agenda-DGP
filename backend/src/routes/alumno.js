import { Router } from 'express';
import { createAlumno, getAlumnos, getAlumno, getAlumnoCount, updateAlumno, deleteAlumno} from '../controllers/alumno'
const router = Router()

/////////////////////
////// ALUMNO /////
/////////////////////
/**
 * @swagger
 * /alumno:
 *  post:
 *      summary: Crea un nuevo alumno
 *      tags: [Alumno]
 */
router.post('/alumno',createAlumno);

/**
 * @swagger
 * /alumno/count:
 *  post:
 *      summary: Obtiene el numero de alumnos
 *      tags: [Alumno]
 */
router.get('/alumno/count', getAlumnoCount);


/**
 * @swagger
 * /alumno:
 *  get:
 *      summary: Obtiene todos los alumnos
 *      tags: [Alumno]
 */
router.get('/alumno',getAlumnos);

/**
 * @swagger
 * /alumno/id_alum:
 *  get:
 *      summary: Obtener un alumno de la lista de alumnos
 *      tags: [Alumno]
 */
router.get('/alumno/:id',getAlumno);


/**
 * @swagger
 * /alumno/id_alum:
 *  put:
 *      summary: Actualiza un alumno de la lista de alumnos
 *      tags: [Alumno]
 */
router.put('/alumno/:id',updateAlumno);

 /**
 * @swagger
 * /alumno/id_alum:
 *  delete:
 *      summary: Borrar un alumno de la base de datos
 *      tags: [Alumno]
 */
router.delete('/alumno/:id',deleteAlumno);


export default router


import { Router } from 'express';
import { createProfesor, getProfesores, getProfesor, getProfesorCount, updateProfesor, deleteProfesor } from '../controllers/profesor'


const router = Router()


/////////////////////
////// PROFESOR /////
/////////////////////
/**
 * @swagger
 * /profesor:
 *  get:
 *      summary: obtiene todos los profesores
 *      tags: [Profesor]
 * 
 */
 router.get('/profesor',getProfesores)

 /**
 * @swagger
 * /profesor:
 *  post:
 *      summary: crea un nuevo profesor
 *      tags: [Profesor]
 */
router.post('/profesor',createProfesor);

/**
 * @swagger
 * /profesor/count:
 *  post:
 *      summary: Obtiene el numero de profesores
 *      tags: [Profesor]
 */
router.get('/profesor/count',getProfesorCount)

/**
 * @swagger
 * /profesor/id_prof:
 *  get:
 *      summary: obtener un profesor de la lista de profesores
 *      tags: [Profesor]
 */
router.get('/profesor/:id',getProfesor)

/**
 * @swagger
 * /profesor/id_prof:
 *  put:
 *      summary: actualiza un profesor de la lista de profesores
 *      tags: [Profesor]
 */
 router.put('/profesor/:id',updateProfesor)

/**
 * @swagger
 * /profesor/id_prof:
 *  delete:
 *      summary: borrar un profesor de la base de datos
 *      tags: [Profesor]
 */
router.delete('/profesor/:id',deleteProfesor)



export default router
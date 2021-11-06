import { Router } from 'express';
import { getUsuarios,  getUsuario, getUsuarioCount,  saveUsuario, deleteUsuario, updateUsuario, 
        createProfesor, getProfesores, getProfesor, getProfesorCount, updateProfesor, deleteProfesor 
       } from '../controllers/dgp'

const router = Router()




/////////////////////
////// Usuario /////
/////////////////////
/**
 * @swagger
 * tags:
 *  name: Usuario
 *  description: Usuario endpoint
 */

/**
 * @swagger
 * tags:
 *   name: Profesor
 *   description: Profesor endpoint
 */



/**
 * @swagger
 * /usuario:
 *  get:
 *      summary: Obtener la lista de todos los usuarios
 *      tags: [Usuario]
 * 
 */
router.get('/usuario',getUsuarios)

/**
 * @swagger
 * /usuario/count:
 *  get:
 *      summary:Obtener el numero de usuarios del sistema
 *      tags: [Usuario]
 * 
 */
router.get('/usuario/count',getUsuarioCount)

/**
 * @swagger
 * /usuario/id_user:
 *  get:
 *      summary: Obtener los datos de un usuario mediante su id
 *      tags: [Usuario]
 */
router.get('/usuario/:id',getUsuario)

/**
 * @swagger
 * /usuario:
 *  post:
 *      summary: añade una nueva tarea
 *      tags: [Usuario]
 */
router.post('/usuario',saveUsuario)

/**
 * @swagger
 * /usuario/id_user:
 *  delete:
 *      summary: elimina una tarea por id
 *      tags: [Usuario]
 */
router.delete('/usuario/:id',deleteUsuario)

/**
 * @swagger
 * /usuario/id_user:
 *  put:
 *      summary: actualiza una tarea por id
 *      tags: [Usuario]
 */
router.put('/usuario/:id',updateUsuario)


/////////////////////
////// PROFESOR /////
/////////////////////
/**
 * @swagger
 * /profesor:
 *  get:
 *      summary: esto obtiene todas las tareas
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
 *      summary: obtener un profesor de la lista de profesores
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



export default router;
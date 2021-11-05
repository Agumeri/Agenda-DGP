import { Router } from 'express';
import { getUsuarios,  getUsuario, getUsuarioCount,  saveUsuario, deleteUsuario, updateUsuario } from '../controllers/dgp'

const router = Router()
/**
 * @swagger
 * tags:
 *  name: Usuario
 *  description: Usuario endpoint
 */

/**
 * @swagger
 * /usuario:
 *  get:
 *      summary: esto obtiene todas las tareas
 *      tags: [Usuario]
 * 
 */
router.get('/usuario',getUsuarios)

/**
 * @swagger
 * /usuario/count:
 *  get:
 *      summary: esto obtiene el contador total de tareas
 *      tags: [Usuario]
 * 
 */
router.get('/usuario/count',getUsuarioCount)

/**
 * @swagger
 * /usuario:
 *  get:
 *      summary: esto obtiene la tarea por id
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
 * /usuario:
 *  delete:
 *      summary: elimina una tarea por id
 *      tags: [Usuario]
 */
router.delete('/usuario/:id',deleteUsuario)

/**
 * @swagger
 * /usuario:
 *  put:
 *      summary: actualiza una tarea por id
 *      tags: [Usuario]
 */
router.put('/usuario/:id',updateUsuario)

export default router;
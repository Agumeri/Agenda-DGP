import { Router } from 'express';
import { getUsuarios,  getUsuario, getUsuarioCount,  saveUsuario, deleteUsuario, updateUsuario, checkUser, getUsuarioPermisos} from '../controllers/usuario'

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
  *      summary: Obtener el numero de usuarios del sistema
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
  *      summary: añade un nuevo usuario
  *      tags: [Usuario]
  */
 router.post('/usuario',saveUsuario)
 
 /**
  * @swagger
  * /usuario/id_user:
  *  delete:
  *      summary: elimina una usuario por id
  *      tags: [Usuario]
  */
 router.delete('/usuario/:id',deleteUsuario)
 
 /**
  * @swagger
  * /usuario/id_user:
  *  put:
  *      summary: actualiza un usuario por id
  *      tags: [Usuario]
  */
 router.put('/usuario/:id',updateUsuario)

 /**
  * @swagger
  * /usuario/check:
  *  get:
  *      summary: confirmar si un usuario existe
  *      tags: [Usuario]
  */
 router.post('/usuario/check/:email',checkUser);


 /**
  * @swagger
  * /usuario/id_user/permisos:
  *  get:
  *      summary: Obtener los permisos de un usuario mediante su id
  *      tags: [Usuario]
  */
router.get('/usuario/:id/permisos', getUsuarioPermisos)


export default router
import { Router } from 'express';
import { createAdmin, getAdmin, getAdminByID, getAdminCount, updateAdmin, deleteAdmin } from '../controllers/administrador'
const router = Router()

/////////////////////
////// ADMIN /////
/////////////////////
 /**
 * @swagger
 * /admin:
 *  post:
 *      summary: crea un nuevo administrador
 *      tags: [Admin]
 */
  router.post('/admin',createAdmin);
  
  /**
   * @swagger
   * /admin:
   *  get:
   *      summary: obtiene todos los admins del sistema
   *      tags: [Admin]
   * 
   */
  router.get('/admin',getAdmin)
  
  /**
   * @swagger
   * /admin/count:
   *  post:
   *      summary: Obtiene el numero de administradores
   *      tags: [Admin]
   */
  router.get('/admin/count',getAdminCount)
  
  /**
   * @swagger
   * /admin/id_admin:
   *  get:
   *      summary: obtener un admin de la lista de administradores
   *      tags: [Admin]
   */
  router.get('/admin/:id',getAdminByID)
  
  /**
   * @swagger
   * /admin/id_admin:
   *  put:
   *      summary: actualiza un administrador de la lista
   *      tags: [Admin]
   */
   router.put('/admin/:id',updateAdmin)
  
  /**
   * @swagger
   * /admin/id_admin:
   *  delete:
   *      summary: borrar un admin
   *      tags: [Admin]
   */
  router.delete('/admin/:id',deleteAdmin)

  export default router
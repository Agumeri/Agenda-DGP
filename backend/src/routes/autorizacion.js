import { Router } from 'express';
import { createAutorizacion, getAutorizaciones, getAutorizacion } from '../controllers/autorizacion'
const router = Router()

/////////////////////////
////// AUTORIZACIÓN /////
/////////////////////////
/**
 * @swagger
 * /autorizacion:
 *  post:
 *      summary: Crea una nueva autorizacion
 *      tags: [Autorizacion]
 */
router.post('/autorizacion',createAutorizacion);

/**
 * @swagger
 * /autorizacion:
 *  get:
 *      summary: Obtiene todos las autorizaciones
 *      tags: [Autorizacion]
 */
 router.get('/autorizacion',getAutorizaciones);

 /**
  * @swagger
  * /autorizacion/id_autorizacion:
  *  get:
  *      summary: Obtener una autorizacion de la lista de autorizaciones
  *      tags: [Autorizacion]
  */
 router.get('/autorizacion/:id',getAutorizacion);

export default router
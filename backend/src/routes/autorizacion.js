import { Router } from 'express';
import { createAutorizacion } from '../controllers/autorizacion'
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

export default router
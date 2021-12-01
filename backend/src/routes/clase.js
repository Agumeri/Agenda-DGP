import { Router } from 'express';

import {getClases} from '../controllers/clase'
const router = Router()

/////////////////////
//// CLASE /////
/////////////////////
/**
 * @swagger
 * /clase:
 *  get:
 *      summary: obtiene todos las clases
 *      tags: [Clase]
 * 
 */
 router.get('/clase',getClases)


 export default router
import { Router } from 'express';

import {getMenus} from '../controllers/menus'
const router = Router()

/////////////////////
//// MENUS /////
/////////////////////
/**
 * @swagger
 * /menus:
 *  get:
 *      summary: obtiene todos los menus
 *      tags: [Menus]
 * 
 */
 router.get('/menus',getMenus)


 export default router
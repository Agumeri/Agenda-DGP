import { Router } from 'express';

import {getMenusClase, updateMenusClase} from '../controllers/menus_clase'
const router = Router()

/////////////////////
//// MENUS CLASE /////
/////////////////////
/**
 * @swagger
 * /menus_clase:
 *  get:
 *      summary: obtiene todos los menus de una clase
 *      tags: [Menus_clase]
 * 
 */
 router.get('/menus_clase',getMenusClase)

 /**
 * @swagger
 * /menus_clase/id:
 *  put:
 *      summary: modifica un menu de una clase
 *      tags: [Menus_clase]
 * 
 */
  router.put('/menus_clase/:id',updateMenusClase)


 export default router
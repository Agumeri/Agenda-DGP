import { Router } from 'express';

import {createInventario, getAllInventarios, getInventariosCount, getInventarioById, updateInventario, deleteInventario,
    createGestInv, getAllGestInv, getCountGestInv, getByIdGestInv, updateGestInv, deleteGestInv} from '../controllers/inventario'
const router = Router()

/////////////////////
//// INVENTARIO /////
/////////////////////
/**
 * @swagger
 * /inventario:
 *  post:
 *      summary: crea un nuevo inventario
 *      tags: [Inventario] 
 */
 router.post('/inventario',createInventario);

/**
 * @swagger
 * /inventario:
 *  get:
 *      summary: obtiene todos los inventarios
 *      tags: [Inventario]
 * 
 */
 router.get('/inventario',getAllInventarios)

/**
 * @swagger
 * /inventario/count:
 *  get:
 *      summary: obtiene la cantidad de inventarios
 *      tags: [Inventario]
 * 
 */
 router.get('/inventario/count',getInventariosCount)

/**
 * @swagger
 * /inventario/count:
 *  get:
 *      summary: obtiene la cantidad de inventarios
 *      tags: [Inventario]
 * 
 */
 router.get('/inventario/:id',getInventarioById)

/**
 * @swagger
 * /inventario/id:
 *  put:
 *      summary: modifica un inventario
 *      tags: [Inventario]
 * 
 */
 router.put('/inventario/:id',updateInventario)

/**
 * @swagger
 * /inventario/id:
 *  delete:
 *      summary: elimina un inventario
 *      tags: [Inventario]
 * 
 */
 router.delete('/inventario/:id',deleteInventario)

//////////////////////////
////GestionaInventario////
//////////////////////////
/**
 * @swagger
 * /gestiona_inventario:
 *  post:
 *      summary: crea un nuevo enlace entre comanda e inventario
 *      tags: [gestiona_inventario] 
 */
 router.post('/gestiona_inventario', createGestInv)

/**
 * @swagger
 * /gestiona_inventario:
 *  get:
 *      summary: Obtiene todos los enlaces entre comandas e inventarios
 *      tags: [gestiona_inventario] 
 */
router.get('/gestiona_inventario', getAllGestInv)

/**
 * @swagger
 * /gestiona_inventario:
 *  get:
 *      summary: Obtiene todos los enlaces entre comandas e inventarios
 *      tags: [gestiona_inventario] 
 */
 router.get('/gestiona_inventario/count', getCountGestInv)

/**
 * @swagger
 * /gestiona_inventario:
 *  get:
 *      summary: Obtiene todos los enlaces entre comandas e inventarios
 *      tags: [gestiona_inventario] 
 */
 router.get('/gestiona_inventario/:id', getByIdGestInv)

/**
 * @swagger
 * /gestiona_inventario:
 *  put:
 *      summary: Cambia un enlace dado un id
 *      tags: [gestiona_inventario] 
 */
 router.put('/gestiona_inventario/:id', updateGestInv)

/**
 * @swagger
 * /gestiona_inventario:
 *  put:
 *      summary: Cambia un enlace dado un id
 *      tags: [gestiona_inventario] 
 */
 router.put('/gestiona_inventario/:id', updateGestInv)
 
/**
 * @swagger
 * /gestiona_inventario:
 *  delete:
 *      summary: Elimina un enlace dado un id
 *      tags: [gestiona_inventario] 
 */
 router.delete('/gestiona_inventario/:id', deleteGestInv)

 
export default router
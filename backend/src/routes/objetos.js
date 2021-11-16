import { Router } from 'express';
import { createObjeto, getAllObjetos, getCountObjetos, getByIdObjetos, updateObjetos, deleteObjetos} from '../controllers/objeto'



const router = Router()


/////////////////////
////// OBJETOS //////
/////////////////////
/**
 * @swagger
 * /objeto:
 *  post:
 *      summary: crea un nuevo objeto
 *      tags: [Objeto] 
 */
 router.post('/objetos',createObjeto);

/**
 * @swagger
 * /objeto:
 *  get:
 *      summary: obtener todos los objetos
 *      tags: [Objeto] 
 */
 router.get('/objetos',getAllObjetos);

/**
 * @swagger
 * /objeto:
 *  get:
 *      summary: obtener la cantidad de objetos
 *      tags: [Objeto] 
 */
 router.get('/objetos/count',getCountObjetos);

/**
 * @swagger
 * /objeto:
 *  get:
 *      summary: obtener un objeto por id
 *      tags: [Objeto] 
 */
 router.get('/objetos/:id',getByIdObjetos);

/**
 * @swagger
 * /objetos:
 *  put:
 *      summary: Cambia los datos de un objeto dado
 *      tags: [objetos] 
 */
 router.put('/objetos/:id', updateObjetos)

/**
 * @swagger
 * /objetos:
 *  delete:
 *      summary: Elimina un enlace dado un id
 *      tags: [objetos] 
 */
 router.delete('/objetos/:id', deleteObjetos)

 
export default router;
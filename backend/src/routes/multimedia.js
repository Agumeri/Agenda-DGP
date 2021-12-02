import { Router } from 'express';

import { createMultimedia, getMultimedia, getMultimediaByTarea, getMultimediaCount, getMultimediaPasosMax} from '../controllers/multimedia'

const router = Router()


/////////////////////
////// MULTIMEDIA //////
/////////////////////
/**
 * @swagger
 * /multimedia:
 *  post:
 *      summary: crea un nuevo multimedia
 *      tags: [Multimedia] 
 */
 router.post('/multimedia',createMultimedia);


/**
 * @swagger
 * /multimedia:
 *  get:
 *      summary: obtener la cantidad de multimedia
 *      tags: [Multimedia] 
 */
 router.get('/multimedia/count',getMultimediaCount);

 /**
  * @swagger
  * /multimedia:
  * post:
  *     summary: obtener URL de la multimedia
  *     tags: [Multimedia]
  */
 router.post('/multimedia/:id_tarea',getMultimedia);

 /**
  * @swagger
  * /multimedia:
  * get:
  *     summary: obtener multimedia en función de una tarea
  *     tags: [Multimedia]
  */
  router.post('/multimedia/:id_tarea',getMultimediaByTarea);

 /**
 * @swagger
 * /multimedia:
 *  get:
 *      summary: obtener la cantidad de pasos de un multimedia
 *      tags: [Multimedia] 
 */
  router.get('/multimedia/pasos/:id_tarea',getMultimediaPasosMax);
 


export default router;
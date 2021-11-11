import { Router } from 'express';
import { getUsuarios,  getUsuario, getUsuarioCount,  saveUsuario, deleteUsuario, updateUsuario, 
        createProfesor, getProfesores, getProfesor, getProfesorCount, updateProfesor, deleteProfesor,
        createAdmin, getAdmin, getAdminByID, getAdminCount, updateAdmin, deleteAdmin
       } from '../controllers/dgp'
import {createInventario, getAllInventarios, getInventariosCount, getInventarioById, updateInventario, deleteInventario,
        createGestInv, getAllGestInv, getCountGestInv, getByIdGestInv, updateGestInv, deleteGestInv,
        createObjeto, getAllObjetos, getCountObjetos, getByIdObjetos, updateObjetos, deleteObjetos
        } from '../controllers/inventario'

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
 *      summary:Obtener el numero de usuarios del sistema
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
 *      summary: añade una nueva tarea
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
 *      summary: actualiza una tarea por id
 *      tags: [Usuario]
 */
router.put('/usuario/:id',updateUsuario)


/////////////////////
////// PROFESOR /////
/////////////////////
/**
 * @swagger
 * /profesor:
 *  get:
 *      summary: esto obtiene todas las tareas
 *      tags: [Profesor]
 * 
 */
 router.get('/profesor',getProfesores)

 /**
 * @swagger
 * /profesor:
 *  post:
 *      summary: crea un nuevo profesor
 *      tags: [Profesor]
 */
router.post('/profesor',createProfesor);

/**
 * @swagger
 * /profesor/count:
 *  post:
 *      summary: Obtiene el numero de profesores
 *      tags: [Profesor]
 */
router.get('/profesor/count',getProfesorCount)

/**
 * @swagger
 * /profesor/id_prof:
 *  get:
 *      summary: obtener un profesor de la lista de profesores
 *      tags: [Profesor]
 */
router.get('/profesor/:id',getProfesor)

/**
 * @swagger
 * /profesor/id_prof:
 *  put:
 *      summary: actualiza un profesor de la lista de profesores
 *      tags: [Profesor]
 */
 router.put('/profesor/:id',updateProfesor)

/**
 * @swagger
 * /profesor/id_prof:
 *  delete:
 *      summary: borrar un profesor de la base de datos
 *      tags: [Profesor]
 */
router.delete('/profesor/:id',deleteProfesor)

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
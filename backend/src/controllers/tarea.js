import { json } from 'express'
import {connect} from '../databases'

// Obtener el numero de tareas del sistema
export const getTareaCount = async (req,res) => {
    const connection = await connect()
    const[rows] = await connection.query('SELECT COUNT(*) FROM tarea')
    res.json(rows[0]["COUNT(*)"])
}

// Crear una nueva tarea 
export const createTarea = async (req, res) => {
    const connection = await connect()
    
    const [rows] = await connection.query('SELECT COUNT(*) FROM tarea')
    const taskId = "task_" + (rows[0]["COUNT(*)"] + 1)

    const [task] = await connection.query("INSERT INTO tarea(id_tarea, id_alumno, tipo, tiempo_requerido, fecha, hora, estado, tipo_multimedia) VALUES (?,?,?,?,?,?,?,?)",[
        taskId,
        req.body.id_alumno,
        req.body.tipo,
        req.body.tiempo_requerido,
        req.body.fecha,
        req.body.hora,
        "En proceso",
        req.body.tipo_multimedia
    ])

    res.json({
        "id_tarea": taskId,
    })
}

export const getTareas = async (req, res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT * FROM tarea'
        )
    res.json(rows)
}

export const getTarea = async (req, res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT * FROM tarea WHERE id_tarea = (?)', req.params.id
        )
    res.json(rows)
}

export const getTareasPlantilla = async (req, res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT DISTINCT tipo FROM tarea'
        )
        res.json(rows)
}

// Actualizar parametros de una tarea
export const updateTask = async (req, res) => {
    const connection = await connect()

    const result = await connection.query("UPDATE tarea SET ? WHERE id_tarea = ?",[
        req.body,
        req.params.id,
    ])

    res.send("Tarea actualizada con exito");
}

// Finalizar una tarea
export const updateTaskState = async (req, res) => {
    const connection = await connect()
    
    const idTask = req.params.id
    const estado = req.body.estado
    
    const result = await connection.query("UPDATE tarea SET estado = (?) WHERE id_tarea = (?)",[
        estado,
        idTask
    ])
    res.send("Estado de la tarea actualizado");
}

// Obetener una tarea dada un id de alumno
export const getTareaByAlum = async (req, res) => {
    const connection = await connect()

    const nombreAlum = req.params.id_alum

    const [usuario] = await connection.query("SELECT id from usuario WHERE correo_electronico = ?",nombreAlum)
    const idUsuario = usuario[0]['id']

    const [alumno] = await connection.query("SELECT id_alumno FROM alumno_tutoriza WHERE id_usuario = ?", idUsuario)
    const idAlumno = alumno[0]['id_alumno']

    const [result] = await connection.query("SELECT id_tarea, tipo, tiempo_requerido, fecha, hora, tipo, estado, id_tarea_multimedia, nombre FROM tarea WHERE id_alumno = ?", idAlumno)

    res.json(result)
}

//
export const asignarTareaAlumno = async (req, res) => {
    // Se debe coger de cada alumno el tipo de multimedia
    const connection = await connect()
    
    const [rows] = await connection.query('SELECT COUNT(*) FROM tarea')
    const taskId = "task_" + (rows[0]["COUNT(*)"] + 1)

    const [dataTask] = await connection.query('SELECT DISTINCT * FROM tarea WHERE tipo=?', [
        req.body.tipoTarea
    ])

    const [usuario] = await connection.query('SELECT id FROM usuario WHERE nombre_usuario = ?', [
        req.body.nombreUsuario
    ])

    const [nombreAlumno] = await connection.query('SELECT id_alumno FROM alumno_tutoriza WHERE id_usuario = ?', [
        usuario[0]["id"]
    ])

    const [task] = await connection.query("INSERT INTO tarea(id_tarea, id_alumno, tipo, tiempo_requerido, fecha, hora, estado, tipo_multimedia) VALUES (?,?,?,?,?,?,?,?)",[
        taskId,
        nombreAlumno[0]["id_alumno"],
        dataTask[0]["tipo"],
        dataTask[0]["tiempo_requerido"],
        dataTask[0]["fecha"],
        dataTask[0]["hora"],
        "En proceso",
        dataTask[0]["tipo_multimedia"]
    ])

    res.json({
        "id_tarea": taskId,
    })
}

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
    
    const result = await connection.query("UPDATE tarea SET estado = (?) WHERE id_tarea = (?)",[
        "Finalizada",
        idTask
    ])
    res.send("Estado de la tarea actualizado");
}

// Obetener una tarea dada un id de alumno
export const getTareaByAlum = async (req, res) => {
    const connection = await connect()

    const idAlum = req.params.id_alum

    const [result] = await connection.query("SELECT tipo, tiempo_requerido, fecha, hora, tipo_multimedia, estado FROM tarea WHERE id_alumno = ?", idAlum)

    res.json(result)
}

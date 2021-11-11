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

    const [task] = await connection.query("INSERT INTO tarea(id_tarea, id_alumno, tipo, tiempo_requerido, fecha, hora, estado) VALUES (?,?,?,?,?,?,?)",[
        taskId,
        req.body.id_alumno,
        req.body.tipo,
        req.body.tiempo_requerido,
        req.body.fecha,
        req.body.hora,
        "En proceso"
    ])

    res.json({
        "id_tarea": taskId,
        "id_alumno": req.body.id_alumno
    })
}

export const getTarea = async (req, res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT * FROM tarea'
        )
    res.json(rows)
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

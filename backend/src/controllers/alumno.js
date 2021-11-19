import { json } from 'express'
import {connect} from '../databases'

// Alumno //
////////////////////////////////////////////

// Asignar tarea a alumno
export const asignarTareaAlumno = async (req, res) => {
    const connection = await connect()
    
    const [alum] = await connection.query('SELECT * FROM alumno_tutoriza WHERE id_alumno = (?)',[req.body.id_alumno])
    console.log(alum);
    const user_id = alum[0].id_usuario;

    const [result] = await connection.query("INSERT INTO realiza(id_usuario, id_alumno, id_tarea, fecha, hora) VALUES (?,?,?,?,?)",[
        user_id,
        req.body.id_alumno,
        req.body.id_tarea,
        req.body.fecha,
        req.body.hora
    ])        

    res.json({
        "id_usuario": user_id,
        "id_alumno": req.body.id_alumno,
        "id_tarea": req.body.id_tarea,
        "fecha": req.body.fecha,
        "hora": req.body.hora
    })
}

// Crear un alumno nuevo
export const createAlumno = async (req, res) => {
    const connection = await connect()
    const [user] = await connection.query("INSERT INTO usuario(nombre_usuario, contraseña, permisos, correo_electronico) VALUES (?,?,?,?)",[
        req.body.nombre_usuario,
        req.body.contraseña,
        2,
        req.body.correo_electronico
    ])

    const[rows] = await connection.query('SELECT COUNT(*) FROM alumno_tutoriza')

    const newId = user.insertId;

    const [userE] = await connection.query('SELECT * FROM usuario WHERE correo_electronico = ? AND permisos = ?',[req.body.correo_electronico_profesor, 1])
    const userId = userE[0].id;
    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_usuario = ?',[userId])
    const profId = prof[0].id_profesor;
    const alumId = "alum_" + (rows[0]["COUNT(*)"] + 1)
    
    const [result] = await connection.query("INSERT INTO alumno_tutoriza(id_usuario, id_alumno, id_profesor) VALUES (?,?,?)",[
        newId,
        alumId,
        profId
    ])        

    res.json({
        "id_usuario": newId,
        "id_alumno": alumId,
        "id_profesor": profId
    })
}

// Obtener lista alumnos
export const getAlumnos = async (req,res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT id_usuario, id_alumno, id_profesor, nombre_usuario, contraseña, correo_electronico, permisos FROM usuario, alumno_tutoriza WHERE usuario.id = alumno_tutoriza.id_usuario'
        )
    res.json(rows)
}


// Obtener un alumno por id
export const getAlumno = async (req,res) => {
    const connection = await connect()

    const id_alum = req.params.id

    const [alum] = await connection.query('SELECT * FROM alumno_tutoriza WHERE id_alumno = (?)',[id_alum])
    console.log(alum);
    const alum_id = alum[0].id_alumno;

    const [rows] = await connection.query('SELECT * FROM usuario WHERE id = (?)',[alum_id])

    res.json({
        "id_alumno": id_alum,
        ...rows[0]
    });

}


// Actualizar valores de un alumno por id
export const updateAlumno = async (req, res) => {
    const connection = await connect()
    
    const id_alum = req.params.id

    const [alum] = await connection.query('SELECT * FROM alumno_tutoriza WHERE id_alumno = (?)',[id_alum])
    const alum_id = alum[0].id_usuario;

    const result = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
        req.body,
        alum_id,
    ])
    res.sendStatus(204)
}

// Actualizar valores de un alumno por id
export const deleteAlumno = async (req, res) => {
    const connection = await connect()

    const id_alum = req.params.id

    const [alum] = await connection.query('SELECT * FROM alumno_tutoriza WHERE id_alumno = (?)',[id_alum])
    const alum_id = alum[0].id_usuario;

    const [delete_alum] = await connection.query('DELETE FROM alumno_tutoriza WHERE id_usuario = (?)',[alum_id]);
    const [delete_alum_user] = await connection.query('DELETE FROM usuario WHERE id = (?)',[alum_id])

    res.sendStatus(204)
}

// Obtener el numero total de alumnos
export const getAlumnoCount = async (req, res) => {
    const connection = await connect()
    const[rows] = await connection.query('SELECT COUNT(*) FROM alumno_tutoriza')
    console.log(rows)
    res.json(rows[0]["COUNT(*)"]);
}

////////////////////////////////////////////
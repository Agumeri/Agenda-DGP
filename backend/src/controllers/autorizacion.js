import { json } from 'express'
import {connect} from '../databases'

// Autorización //
////////////////////////////////////////////

// Crear una autorización nueva
export const createAutorizacion = async (req, res) => {
    const connection = await connect()
    
    const [alum] = await connection.query('SELECT * FROM alumno_tutoriza WHERE id_alumno = (?)',[req.body.id_alumno])
    const userId = alum[0].id_usuario;

    const[rows] = await connection.query('SELECT COUNT(*) FROM autorizacion')
    const autorizacionId = "autorizacion_" + (rows[0]["COUNT(*)"] + 1)
    
    const [result] = await connection.query("INSERT INTO autorizacion(id_usuario, id_alumno, id_autorizacion, titulo, fecha, hora) VALUES (?,?,?,?,?,?)",[
        userId,
        req.body.id_alumno,
        autorizacionId,
        req.body.titulo,
        req.body.fecha,
        req.body.hora
    ])        

    res.json({
        "id_usuario": userId,
        "id_alumno": req.body.id_alumno,
        "id_autorizacion": autorizacionId,
        "titulo": req.body.titulo,
        "fecha": req.body.fecha,
        "hora": req.body.hora
    })
}



////////////////////////////////////////////
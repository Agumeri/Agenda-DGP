
import { json } from 'express'
import {connect} from '../databases'

// Profesor //
////////////////////////////////////////////

// Crear un profesor nuevo
export const createProfesor = async (req, res) => {
    const connection = await connect()
    const [user] = await connection.query("INSERT INTO usuario(nombre_usuario, contraseña, permisos, correo_electronico) VALUES (?,?,?,?)",[
        req.body.nombre_usuario,
        req.body.contraseña,
        1,
        req.body.correo_electronico
    ])

    const[rows] = await connection.query('SELECT COUNT(*) FROM profesor')

    const newId = user.insertId;
    const profId = "prof_" + (rows[0]["COUNT(*)"] + 1)
    // const profId = "prof_" + newId;
    
    const [result] = await connection.query("INSERT INTO profesor(id_usuario, id_profesor) VALUES (?,?)",[
        newId,
        profId
    ])        

    res.json({
        "id_usuario": newId,
        "id_profesor": profId
    })
}

// Obtener lista profesores
export const getProfesores = async (req,res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT id_usuario, id_profesor, nombre_usuario, contraseña, correo_electronico, permisos FROM usuario, profesor WHERE usuario.id = profesor.id_usuario'
        )
    res.json(rows)
}

// Obtener el numero total de profesores
export const getProfesorCount = async (req, res) => {
    const connection = await connect()
    const[rows] = await connection.query('SELECT COUNT(*) FROM profesor')
    console.log(rows)
    res.json(rows[0]["COUNT(*)"])
}

// Obtener un profesor por id
export const getProfesor = async (req,res) => {
    const connection = await connect()

    const id_prof = req.params.id

    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])
    console.log(prof);
    const prof_id = prof[0].id_usuario;

    const [rows] = await connection.query('SELECT * FROM usuario WHERE id = (?)',[prof_id])

    res.json({
        "id_profesor": id_prof,
        ...rows[0]
    });

}


// Actualizar valores de un profesor por id
export const updateProfesor = async (req, res) => {
    const connection = await connect()
    
    const id_prof = req.params.id

    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])
    const prof_id = prof[0].id_usuario;

    const result = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
        req.body,
        prof_id,
    ])
    res.sendStatus(204)
}

// Actualizar valores de un profesor por id
export const deleteProfesor = async (req, res) => {
    const connection = await connect()

    const id_prof = req.params.id

    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])
    const prof_id = prof[0].id_usuario;

    const [delete_prof] = await connection.query('DELETE FROM profesor WHERE id_usuario = (?)',[prof_id]);
    const [delete_prof_user] = await connection.query('DELETE FROM usuario WHERE id = (?)',[prof_id])

    res.sendStatus(204)
}

////////////////////////////////////////////
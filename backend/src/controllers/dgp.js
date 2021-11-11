
import { json } from 'express'
import {connect} from '../databases'

// Usuarios //
////////////////////////////////////////////
export const getUsuarios = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM usuario')
    res.json(rows)
}

export const getUsuario = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM usuario WHERE id = ?',[req.params.id])
    res.json(rows[0])
}

export const getUsuarioCount = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM usuario')
    res.json(rows[0]["COUNT(*)"])
}

export const saveUsuario = async (req,res) => {
    const connection = await connect()
    const [result] = await connection.query("INSERT INTO usuario(nombre_usuario, contraseña, permisos, correo_electronico) VALUES (?,?,?,?)",[
        req.body.nombre_usuario,
        req.body.contraseña,
        req.body.permisos,
        req.body.correo_electronico
    ])
    res.json({
        id:result.insertId,
        ...req.body,
    })
}

export const deleteUsuario = async (req,res) => {
    const connection = await connect()
    const result = await connection.query("DELETE FROM usuario WHERE id = ?",[
        req.params.id
    ])
    res.sendStatus(204)

}

export const updateUsuario = async (req,res) => {
    const connection = await connect()
    const result = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
        req.body,
        req.params.id,
    ])
    res.sendStatus(204)
}
////////////////////////////////////////////

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

// Alumno //
////////////////////////////////////////////
// Obtener el número total de alumnos
export const getAlumnoCount = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM alumno')
    res.json(rows[0]["COUNT(*)"])
}

// Admin //
////////////////////////////////////////////
// POST admin
export const createAdmin = async (req, res) => {
    const connection = await connect()

    const [user] = await connection.query("INSERT INTO usuario (nombre_usuario, contraseña, permisos, correo_electronico) VALUES (?, ?, ?, ?)", [
        req.body.nombre_usuario,
        req.body.contraseña,
        req.body.permisos,
        req.body.correo_electronico
        ])

    const[rows] = await connection.query('SELECT COUNT(*) FROM admin')

    const userId = user.insertId;
    const adminId = "admin" + (rows[0]["COUNT(*)"] + 1)
    
    const [result] = await connection.query("INSERT INTO admin(id_admin, id_usuario_inAdmin) VALUES (?, ?)",[
        adminId,
        userId
    ])   

    res.json({
        "id_usuario": userId,
        "id_admin": adminId
    })
}

// GET admin por id
export const getAdminByID = async (req,res) => {
    const connection = await connect()

    const id_admin = req.params.id

    const [admin] = await connection.query('SELECT * FROM admin WHERE id_admin = ?',[id_admin])
    console.log(admin);
    const id_usuario_admin = admin[0].id_usuario_inAdmin;

    const [rows] = await connection.query('SELECT nombre_usuario, permisos, correo_electronico FROM usuario WHERE id = ?',[id_usuario_admin])

    res.json({
        "id_admin": id_admin,
        ...rows[0]
    });
}

//GET admins
export const getAdmin = async (req,res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT nombre_usuario, correo_electronico, permisos FROM usuario, admin WHERE usuario.id = admin.id_usuario_inAdmin'
        )
    res.json(rows)
}

//GET count Admins
export const getAdminCount = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM admin')
    res.json(rows[0]["COUNT(*)"])
}

//UPDATE admin
export const updateAdmin = async (req,res) => {
    const connection = await connect()
    console.log(req.body)
    const id_admin = req.params.id
    const [admin] = await connection.query("SELECT id_usuario_inAdmin FROM admin WHERE id_admin = ?",[id_admin]);
    const id_user_InAdmin = admin[0].id_usuario_inAdmin

    const result = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
        req.body,
        id_user_InAdmin,
    ])

    res.sendStatus(204)
}

//DELETE admin
export const deleteAdmin = async (req,res) => {
    const connection = await connect()

    const id_admin = req.params.id

    const [admin] = await connection.query('SELECT id_usuario_inAdmin FROM admin WHERE id_admin = (?)',[id_admin])
    const id_user_inAdmin = admin[0].id_usuario;

    const [delete_admin_result] = await connection.query('DELETE FROM admin WHERE id_admin = (?)',[id_admin]);
    const [delete_prof_user] = await connection.query('DELETE FROM usuario WHERE id = (?)',[id_user_inAdmin])

    res.sendStatus(204)
}
////////////////////////////////////////////
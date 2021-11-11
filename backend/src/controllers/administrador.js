
import { json } from 'express'
import {connect} from '../databases'

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
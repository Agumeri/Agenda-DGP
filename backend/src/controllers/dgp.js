
import {connect} from '../databases'

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
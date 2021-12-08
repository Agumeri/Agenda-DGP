import { json } from 'express'
import { applyRetryableWrites } from 'mongodb/lib/utils';
import {connect} from '../databases'


// Usuarios //
////////////////////////////////////////////
// Método: Comprueba que un usuario está registrado
export const checkUser = async (req, res) => {
    const connection= await connect()

    const email = req.params.email;
    const password = req.body.contraseña;

    const rows = await connection.query('SELECT * FROM usuario WHERE correo_electronico=(?) and contraseña=(?)',[
        email, 
        password
    ])

    if(rows[0].length > 0){
        res.sendStatus(200);
    } else {
        res.sendStatus(400)
    }
}

// Metod: Obtiene los permisos de un usuario dado el correo
export const getUsuarioPermisos = async (req,res) => {
    const connection = await connect()
    const [user] = await connection.query('SELECT * FROM usuario WHERE correo_electronico = (?)',[req.params.correo_electronico])

    if(user[0]) {
        const permisos = user[0].permisos;
        res.json({
            "permisos": permisos
        })
    } else {
        console.log("Error correo electronico no valido")
        res.sendStatus(400)
    }
}

// Metodo: Obtiene todos los usuarios de la BD
export const getUsuarios = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM usuario')
    if (rows [0]) {
        res.json(rows)
    } else {
        console.log("No existen usuarios")
        res.sendStatus(400)
    }
}

// Metodo: Ontiene los datos de un usuario dado un id
export const getUsuario = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM usuario WHERE id = ?',[req.params.id])
    if (rows[0]) {
        res.json(rows[0])
    } else {
        console.log("ID no valido")
        res.sendStatus(400)
    }
}

// Metodo: Obtiene cantidad de usuarios
export const getUsuarioCount = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM usuario')
    res.json(rows[0]["COUNT(*)"])
}

// Metodo: Guarda un usuario
export const saveUsuario = async (req,res) => {
    const connection = await connect()
    if(req.body.nombre_usuario && req.body.contraseña && req.body.permisos && req.body.correo_electronico && req.body.imagen) {
        if( !isNaN(req.body.permisos)) {
            const [correo_duplicated] = await connection.query("SELECT * from usuario WHERE correo_electronico = ?", req.body.correo_electronico)
            if(correo_duplicated[0]) {
                console.log("Correo no valido, ya existe un usuario con ese")
                res.sendStatus(400)
            } else {
                const [result] = await connection.query("INSERT INTO usuario(nombre_usuario, contraseña, permisos, correo_electronico, imagen) VALUES (?,?,?,?,?)",[
                    req.body.nombre_usuario,
                    req.body.contraseña,
                    req.body.permisos,
                    req.body.correo_electronico,
                    req.body.imagen
                ])
                if(result.insertId) {
                    res.status(200)
                } else {
                    console.log("Error al insertar")
                    res.sendStatus(400)
                }
            }
        } else {
            res.sendStatus(400)
            console.log("Variable permisos debe ser un numero")
        }
    } else {
        console.log("Parametros incorrectos:")
        if( !req.body.nombre_usuario)
            console.log("nombre_usuario no valido")
        if (!req.body.contraseña)
            console.log("contraseña no valida")
        if (!req.body.permisos)
            console.log("permisos no validos")
        if (!req.body.correo_electronico)
            console.log("correo no valido")
        if (!req.body.imagen)
            console.log("imagen no valida")
            res.sendStatus(400)
    }
}

// Metodo: Elimina usuario dado un id
export const deleteUsuario = async (req,res) => {
    const connection = await connect()
    const [result] = await connection.query("DELETE FROM usuario WHERE id = ?",[
        req.params.id
    ])
    res.sendStatus(200)
}

// metodo: Cambiar datos usuario
export const updateUsuario = async (req,res) => {
    const connection = await connect()

    const [correo_duplicated] = await connection.query("SELECT * from usuario WHERE correo_electronico = ?", req.body.correo_electronico)

    if(correo_duplicated[0]) {
        console.log("Correo duplicado")
        res.sendStatus(400)
    } else {
        const [result] = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
            req.body,
            req.params.id,
        ])

        res.sendStatus(200)
    }
}
////////////////////////////////////////////
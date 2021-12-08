
import { json } from 'express'
import {connect} from '../databases'

// Profesor //
////////////////////////////////////////////

// Metodo: Crear profesor
export const createProfesor = async (req, res) => {
    let errorFound = false
    const connection = await connect()

    if(req.body.nombre_usuario && req.body.contraseña && req.body.correo_electronico) {
        //Comprobamos correo no está registrado
        const [correo_duplicated] = await connection.query("SELECT * from usuario WHERE correo_electronico = ?", req.body.correo_electronico)
        if(correo_duplicated[0]) {
            console.log("Correo duplicado")
            errorFound = true
        } else {
            // Insertamos el usuario
            const [user] = await connection.query("INSERT INTO usuario(nombre_usuario, contraseña, permisos, correo_electronico) VALUES (?,?,?,?)",[
                req.body.nombre_usuario,
                req.body.contraseña,
                1,
                req.body.correo_electronico
            ])
            if(user.insertId) {
                const newId = user.insertId;
                // Obtenmos el id correspondiente del profesor
                const[rows] = await connection.query('SELECT COUNT(*) FROM profesor')
                const profId = "prof_" + (rows[0]["COUNT(*)"] + 1)

                //Insertamos profesor
                const [result] = await connection.query("INSERT INTO profesor(id_usuario, id_profesor) VALUES (?,?)",[
                    newId,
                    profId
                ])
                if(result.affectedRows <= 0) {
                    console.error("Fallo insertar profesor")
                    errorFound = true
                } else {
                    res.json({
                        "id_usuario": newId,
                        "id_profesor": profId
                    })
                }
            } else {
                console.error("Fallo insertar usuario")
                errorFound = true
            }
        }
    } else {
        errorFound = true
        console.error("Parametros no validps")
    }

    // Notificamos si hay error
    if(errorFound) {
        res.sendStatus(400)
    }
}

// Metodo: Obtener todos profesores
export const getProfesores = async (req,res) => {
    const connection = await connect()
    const [rows]  = await connection.query(
        'SELECT id_usuario, id_profesor, nombre_usuario, contraseña, correo_electronico, permisos FROM usuario, profesor WHERE usuario.id = profesor.id_usuario')
    
    if(rows[0]) {
        res.json(rows)
    } else {
        console.error("No se han encontrado profesores")
        res.sendStatus(400)
    }
}

// Metodo: Obtener cantidad profesores
export const getProfesorCount = async (req, res) => {
    const connection = await connect()
    const[rows] = await connection.query('SELECT COUNT(*) FROM profesor')
    res.json(rows[0]["COUNT(*)"])
}

// Metodo: Obtener profesor dado id
export const getProfesor = async (req,res) => {
    const connection = await connect()

    //Obtenemos profesor dado id
    const id_prof = req.params.id
    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])
    if(prof[0]) {
        const prof_id = prof[0].id_usuario;
        // Obtenemos sus datos de usuario
        const [rows] = await connection.query('SELECT * FROM usuario WHERE id = (?)',[prof_id])
        if(rows[0]) {
            res.json({
                "id_profesor": id_prof,
                ...rows[0]
            });
        } else {
            console.error("No se ha encontrado el usuario")
            res.sendStatus(404)
        }
    } else {
        console.error("No se ha encontrado el profesor")
        res.sendStatus(404)
    }
}

// Metodo: Actualiza valores de profesor dado id
export const updateProfesor = async (req, res) => {
    const connection = await connect()
    
    const id_prof = req.params.id

    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])

    if(prof[0]) {
        const prof_id = prof[0].id_usuario;

        const [result] = await connection.query("UPDATE usuario SET ? WHERE id = ?",[
            req.body,
            prof_id,
        ])
        if(result.affectedRows > 0) {
            console.log("Profesor actualizado")
            res.sendStatus(204)
        } else {
            console.error("Error al cambiar el profesor")
            res.sendStatus(400)
        }
    } else {
        console.error("No se ha encontrado al profesor")
        res.sendStatus(404)
    }
}

// Metodo: Eliminar profesor dado id
export const deleteProfesor = async (req, res) => {
    const connection = await connect()

    const id_prof = req.params.id

    const [prof] = await connection.query('SELECT * FROM profesor WHERE id_profesor = (?)',[id_prof])
    if(prof[0]) {
        const prof_id = prof[0].id_usuario;

        const [delete_prof] = await connection.query('DELETE FROM profesor WHERE id_usuario = (?)',[prof_id]);
        const [delete_prof_user] = await connection.query('DELETE FROM usuario WHERE id = (?)',[prof_id])

        res.sendStatus(204)
    } else {
        console.error("Profesor no encontrado")
        res.sendStatus(404)
    }
}

////////////////////////////////////////////
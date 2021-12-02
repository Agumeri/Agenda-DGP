import { json } from 'express'
import {connect} from '../databases'

export const createMultimedia = async (req, res) =>{
    const connection = await connect()

    const [rowsMultimedia] = await connection.query("SELECT COUNT(*) FROM multimedia");
    const multimediaId = "multimedia" + (rowsMultimedia[0]["COUNT(*)"] + 1)

    const [result] = await connection.query(" INSERT INTO multimedia(id_multimedia, id_tarea, paso, descripcion, url_foto) VALUES (?, ?, ?, ?, ?)", [
        multimediaId,
        req.body.tareaId,
        req.body.paso,
        req.body.descripcion,
        req.body.urlFoto
    ])                                  

    res.json({
        "Multimedia id": multimediaId
    })
}

export const getMultimedia = async (req,res) =>{
    const connection = await connect()

    console.log(req.body.paso)

    const idTarea = req.params.id_tarea
    const [rowsMultimedia] = await connection.query("SELECT url_foto, descripcion FROM multimedia WHERE id_tarea = (?) AND paso = (?) ORDER BY paso ASC",[
        idTarea,
        req.body.paso
    ])

    res.json(rowsMultimedia)
}

export const getMultimediaByTarea = async (req,res) =>{
    const connection = await connect()

    console.log(req.body.paso)

    const idTarea = req.params.id_tarea
    const [rowsMultimedia] = await connection.query("SELECT * FROM multimedia WHERE id_tarea = (?)",[
        idTarea
    ])

    res.json(rowsMultimedia)
}

export const getMultimediaCount = async (req,res) =>{
    const connection = await connect()

    const [rowsMultimedia] = await connection.query("SELECT COUNT(*) FROM multimedia")

    res.json(rowsMultimedia[0]["COUNT(*)"])
}

export const getMultimediaPasosMax = async (req,res) =>{
    const connection = await connect()

    const [rowsMultimedia] = await connection.query("SELECT COUNT(*) FROM multimedia WHERE id_tarea = ?", req.params.id_tarea)

    res.json(rowsMultimedia[0]["COUNT(*)"])
}
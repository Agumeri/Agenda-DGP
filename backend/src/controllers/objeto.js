import { json } from 'express'
import {connect} from '../databases'

//-------------------------------------------------------//
// objetos //
export const createObjeto = async (req, res) => {
    const connection = await connect()

    const [rowsObjeto] = await connection.query("SELECT COUNT(*) FROM objetos");
    const objetoId = "objeto" + (rowsObjeto[0]["COUNT(*)"] + 1)
    console.log(objetoId)
    console.log(req.body)
    const [result] = await connection.query("INSERT INTO objetos(id_objeto, id_inventario_inObjeto, nombre_objeto, cantidad_objetos, categoria) VALUES (?, ?, ?, ?, ?)", [
         objetoId, 
         req.body.inventarioId, 
         req.body.nombre, 
         req.body.cantidad,
         req.body.categoria
    ])                                  

    res.json({
        "objeto id" : objetoId
    })
}

export const getAllObjetos = async(req,res) =>{
    const connection = await connect()

    const [rowsObjetos] = await connection.query("SELECT * FROM objetos");                              

    res.json(rowsObjetos)
}

export const getCountObjetos = async(req,res) =>{
    const connection = await connect()

    const [rowsObjetos] = await connection.query("SELECT COUNT(*) FROM objetos")

    res.json(rowsObjetos[0]["COUNT(*)"])
}

export const getByIdObjetos = async(req,res) =>{
    const connection = await connect()

    const[rowsObjetos] = await connection.query("SELECT * FROM objetos WHERE id_objeto = ?", [req.params.id])

    res.json(rowsObjetos)
}

export const updateObjetos = async(req,res) =>{
    const connection = await connect()

    const idObjeto = req.params.id
    const [rowsObjeto] = await connection.query("UPDATE objetos SET ? WHERE id_objeto = ?", [
        req.body,
        idObjeto
    ])

    res.sendStatus(204)
}

export const deleteObjetos = async(req,res) =>{
    const connection = await connect()

    const idObjeto = req.params.id
    const [result] = await connection.query("DELETE FROM objetos WHERE id_objeto = ?", [
        idObjeto
    ])

    res.sendStatus(204)
}
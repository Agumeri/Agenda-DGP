import { json } from 'express'
import {connect} from '../databases'
//-------------------------------------------------------//
// Inventario //
export const createInventario = async (req, res) =>{
    const connection = await connect()

    const [rowsInventario] = await connection.query("SELECT COUNT(*) FROM inventario");
    const inventarioId = "inventario" + (rowsInventario[0]["COUNT(*)"] + 1)

    const [result] = await connection.query(" INSERT INTO inventario(id_inventario) VALUES (?)", [inventarioId])                                  

    res.json({
        "Inventario id": inventarioId
    })
}

export const getAllInventarios = async (req,res) =>{
    const connection = await connect()

    const [rowsInventario] = await connection.query("SELECT * from inventario");

    res.json(rowsInventario)
}

export const getInventariosCount = async (req,res) =>{
    const connection = await connect()

    const [rowsInventario] = await connection.query("SELECT COUNT(*) FROM inventario")

    res.json(rowsInventario[0]["COUNT(*)"])
}

export const getInventarioById = async (req,res) =>{
    const connection = await connect()

    const idInventario = req.params.id
    const [rowsInventario] = await connection.query("SELECT * FROM inventario WHERE id_inventario = ?",[idInventario])

    res.json(rowsInventario[0])
}

export const updateInventario = async (req,res) =>{
    const connection = await connect()

    const idInventario = req.params.id
    const [result] = await connection.query("UPDATE inventario SET ? WHERE id_inventario = ?", [
        req.body,
        idInventario  
    ])

    res.sendStatus(204)
}

export const deleteInventario = async (req,res) =>{
    const connection = await connect()

    const idInventario = req.params.id
    const [result] = await connection.query("DELETE FROM inventario WHERE id_inventario = ?",[
        idInventario
    ])

    res.sendStatus(204)
}

//-------------------------------------------------------//
// gestiona Inventario //
export const createGestInv = async (req,res) =>{
    const connection = await connect()

    const [rowsGestInventario] = await connection.query("SELECT COUNT(*) FROM gestiona_inventario");
    const gestInvId = "gestInv" + (rowsGestInventario[0]["COUNT(*)"] + 1)

    const [result] = await connection.query(" INSERT INTO gestiona_inventario(id_gestiona_inventario, id_tarea_inGestInv, id_comanda_inGestInv, id_inventario_inGestInv)"+
    " VALUES (?, ?, ?, ?)", [ gestInvId, req.body.tareaId, req.body.comandaId, req.body.inventarioId])                                  

    res.json({
        "gestiona_inventario id": gestInvId
    })
}

export const getAllGestInv = async(req,res) =>{
    const connection = await connect()

    const [rowsGestInventario] = await connection.query("SELECT * FROM gestiona_inventario");                              

    res.json(rowsGestInventario)
}

export const getCountGestInv = async(req,res) =>{
    const connection = await connect()

    const [rowsGestInventario] = await connection.query("SELECT COUNT(*) FROM gestiona_inventario")

    res.json(rowsGestInventario[0]["COUNT(*)"])
}

export const getByIdGestInv = async(req,res) =>{
    const connection = await connect()

    const[rowsGestInventario] = await connection.query("SELECT * FROM gestiona_inventario WHERE id_gestiona_inventario = ?", [req.params.id])

    res.json(rowsGestInventario)
}

export const updateGestInv = async(req,res) =>{
    const connection = await connect()

    const idGestInv = req.params.id
    const [rowsGestInventario] = await connection.query("UPDATE gestiona_inventario SET ? WHERE id_gestiona_inventario = ?", [
        req.body,
        idGestInv
    ])

    res.sendStatus(204)
}

export const deleteGestInv = async(req,res) =>{
    const connection = await connect()

    const idGestInv = req.params.id
    const [result] = await connection.query("DELETE FROM gestiona_inventario WHERE id_gestiona_inventario = ?", [
        idGestInv
    ])

    res.sendStatus(204)
}

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
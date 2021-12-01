import { json } from 'express'
import {connect} from '../databases'
//-------------------------------------------------------//
// Menus clase //

export const getMenusClase = async (req,res) =>{
    const connection = await connect()

    const [rowsClase] = await connection.query("SELECT * from menus_clase");

    res.json(rowsClase)
}

export const updateMenusClase = async (req,res) =>{
    const connection = await connect()

    const idClase = req.params.id
    const [result] = await connection.query("UPDATE menus_clase SET cantidad = ? WHERE id_clase = ? AND id_menu = ?", [
        req.body.cantidad,
        idClase,
        req.body.id_menu
    ])

    res.sendStatus(204)
}
import { json } from 'express'
import {connect} from '../databases'
//-------------------------------------------------------//
// Menus //

export const getMenus = async (req,res) =>{
    const connection = await connect()

    const [rowsClase] = await connection.query("SELECT * from menus");

    res.json(rowsClase)
}
import { json } from 'express'
import {connect} from '../databases'
//-------------------------------------------------------//
// Clase //

export const getClases = async (req,res) =>{
    const connection = await connect()

    const [rowsClase] = await connection.query("SELECT * from clase");

    res.json(rowsClase)
}
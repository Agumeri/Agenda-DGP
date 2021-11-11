
import { json } from 'express'
import {connect} from '../databases'




// Alumno //
////////////////////////////////////////////
// Obtener el número total de alumnos
export const getAlumnoCount = async (req,res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT COUNT(*) FROM alumno')
    res.json(rows[0]["COUNT(*)"])
}

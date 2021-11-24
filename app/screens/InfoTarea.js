import React,{useEffect, useState, ListItem, createRef} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import Header from '../components/Header'
import { getDetailsTask } from "../api";

const InfoTarea = ({route}) => {
    const idTask = route.params['idTask']   //User Name

    const result = getDetailsTask(idTask); 
    const [infoTask, setInfoTask] = useState([]) 
    
    const handleInfo = async () =>{
        console.log("Entro a hacer cositis")
        const result = getDetailsTask(idTask)        

        result.then( response =>  response.json().then( data => ({
                data: data,
                status: response.status
        })))
        .then( res => {
            console.log(res)
            if(res.status == 200) {
                setInfoTask(res.data)
            } else {
                console.log("No hay información")
            }
        })
    }

    // result.then( response =>  response.json().then( data => ({
    //         data: data,
    //         status: response.status
    // })))
    // .then( res => {
    //     if(res.status == 200) {
    //         setInfoTask(res.data)
    //         log.info(infoTask)
    //     } else {
    //         console.log("No hay tareas")
    //         //setListaTareas({tipo: "Ninguno"})
    //     }
    // })


    return (
        <View style={styles.container}>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Información tarea </Text>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    {
                        infoTask.map((info) => {
                            return <ul key="a">
                                        <li>id_tarea --- {info.id_tarea}</li>
                                        <li>id_alumno --- {info.id_alumno}</li>
                                        <li>tipo --- {info.tipo}</li>
                                        <li>tiempo_requerido --- {info.tiempo_requerido}</li>
                                        <li>fecha --- {info.fecha}</li>
                                        <li>hora --- {info.hora}</li>
                                        <li>estado --- {info.estado}</li>
                                        <li>tipo_multimedia --- {info.tipo_multimedia}</li>
                                    </ul>
                        })
                    }
                </View>
                <Button 
                    title="Refrescar tareas" 
                    onPress={() => handleInfo()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
    },
    taskWrapper:{
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    item: {
        marginTop: 30,
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',

    }
})

export default InfoTarea
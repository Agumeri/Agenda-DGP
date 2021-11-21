import React,{useEffect, useState, createRef} from "react";
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
                        infoTask.map((item, index) => {
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
        backgroundColor: '#E8EAED'
    },
    taskWrapper:{
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    sectionTitle:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        marginTop: 30,
    }
})

export default InfoTarea
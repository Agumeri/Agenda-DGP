import React,{useEffect, useState, createRef} from "react";
import {Button, View, Text, StyleSheet, CheckBox } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getTask, getInfoAlumno, asignTaskAlum } from "../api";
import Task from '../components/Task';
import { BottomSheet } from "react-native-elements";

const AsignarTarea = ({ route, navigation}) => {
    // Variable for data
    //const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([])
    const [listaAlumnos, setListaAlumnos] = useState([])
    const [tareaSeleccionada, setTareaSeleccionada] = useState([])
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState([])


    const handleGetTareas = async () =>{
        const result = getTask()

        result.then( response =>  response.json().then( data => ({
                data: data,
                status: response.status
        })))
        .then( res => {
            console.log(res)
            if(res.status == 200) {
                setListaTareas(res.data)
                
            } else {
                console.log("No hay tareas")
            }
        })
    } 

    const handleGetAlumnos = async () =>{
        const result = getInfoAlumno()       

        result.then( response =>  response.json().then( data => ({
                data: data,
                status: response.status
        })))
        .then( res => {
            console.log(res)
            if(res.status == 200) {
                setListaAlumnos(res.data)
            } else {
                console.log("No hay alumnos")
            }
        })
    }

    return (
        <View style={styles.container}>
            {/*Asignar tarea a alumno*/}
            <View style={styles.taskWrapper}>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    <Button 
                            style={refreshButton.container}
                            title={<Text style={styles.text}>Refrescar Tarea</Text>}
                            color= '#caffbf'
                            onPress={() => handleGetTareas()}
                        />
                    {
                        listaTareas.map((item, index) => {
                            return (<Button key={index} title={<Text style={styles.text}>{item.tipo} </Text>} color='#fdffb6' onPress={() => setTareaSeleccionada(item)} />)
                        })
                    }
                </View>
                {/* Aqui es donde va cada Alumno */}
                <View style={styles.item}>
                    <Button 
                        style={refreshButton.container}
                        title={<Text style={styles.text}>Refrescar Alumnos</Text>}
                        color= '#caffbf'   
                        onPress={() => handleGetAlumnos()}
                    />
                    {
                        listaAlumnos.map((item, index) => {
                            return (<Button key={index} title={<Text style={styles.text}>{item.nombre_usuario} </Text>} color='#fdffb6' onPress={() => setAlumnoSeleccionado(item.nombre_usuario)} />)
                        })
                    }
                </View>

                <View style ={styles.separador}> </View>

                <Button 
                        style={refreshButton.container}
                        title={<Text style={styles.text}>Asignar Tarea</Text>}
                        color= '#caffbf'
                        onPress={() => asignTaskAlum(tareaSeleccionada, alumnoSeleccionado)}
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
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'Escolar2', 
        fontSize: 24,
        color: 'black'
        
    },
    separador:{
        paddingTop: 70
    }
})

const refreshButton = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AC33FF'
    }
})

export default AsignarTarea


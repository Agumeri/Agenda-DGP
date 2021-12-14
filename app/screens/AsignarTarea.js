import React,{useEffect, useState, createRef} from "react";
import {Button, View, Text, StyleSheet, CheckBox , TextInput} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getTask, getInfoAlumno, asignTaskAlum } from "../api";
import Task from '../components/Task';
import { BottomSheet } from "react-native-elements";

const AsignarTarea = ({ route, navigation}) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([])
    const [listaAlumnos, setListaAlumnos] = useState([])
    const [tareaSeleccionada, setTareaSeleccionada] = useState([])
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState([])
    const [fechaLim, setfechaLim] = useState('')

    useEffect(() => {
        handleGetTareas();
        handleGetAlumnos();
    },[])

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

    const asignarTareaRecargando = async () =>{
        asignTaskAlum(tareaSeleccionada, alumnoSeleccionado, fechaLim)
        navigation.navigate("MenuAdmin", {
            nombreUser: nombreUser
        })

    }

    return (
        <View style={styles.container}>
            {/*Asignar tarea a alumno*/}
            <View style={styles.taskWrapper}>
                {/* Aqui es donde va la fecha limite */}
                <View style={styles.item}>
                    <Text style={styles.text}>Nombre de la tarea:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="INSERTE FECHA TAREA EN FORMATO AÑO/MES/DIA"
                        onChangeText={(fecha) => setfechaLim(fecha)}
                    />
                </View>

                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    <Button  
                            disabled={true}
                            style={refreshButton.container}
                            title={<Text style={styles.text}>Tareas</Text>}
                            color= '#e4c1f9'
                            onPress={() => handleGetTareas()}
                        />
                    {
                        listaTareas.map((item, index) => {
                            return (<Button key={index} title={<Text style={styles.text}>{item.nombre} </Text>} color='#d0f4de' onPress={() => setTareaSeleccionada(item)} />)
                        })
                    }
                </View>
                {/* Aqui es donde va cada Alumno */}
                <View style={styles.item}>
                    <Button 
                        disabled={true}
                        style={refreshButton.container}
                        title={<Text style={styles.text}>Alumnos</Text>}
                        color= '#e4c1f9'   
                        onPress={() => handleGetAlumnos()}
                    />
                    {
                        listaAlumnos.map((item, index) => {
                            return (<Button key={index} title={<Text style={styles.text}>{item.nombre_usuario} </Text>} color='#d0f4de' onPress={() => setAlumnoSeleccionado(item.nombre_usuario)} />)
                        })
                    }
                </View>

                <View style ={styles.separador}> </View>

                <Button 
                        style={refreshButton.container}
                        title={<Text style={styles.text}>Asignar Tarea</Text>}
                        color= '#d0f4de'
                        onPress={() => asignarTareaRecargando()}
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


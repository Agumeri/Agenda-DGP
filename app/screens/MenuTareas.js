import React, { useEffect, useState, createRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getInfoTask } from "../api";
import Task from '../components/Task';
import { BottomSheet } from "react-native-elements";
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';


const MenuTareas = ({ route, navigation }) => {
    // Variable for data
    var names = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
    const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([]);
    const [fechaActual, setFechaActual] = useState("");

    const goToTask = async (id_task, tipo, id_tarea_multimedia) => {
        if (tipo == 1) {
            navigation.navigate("InfoTarea", {
                idTask: id_task,
                idMultimedia: id_tarea_multimedia
            })
        } else if (tipo == 2) {
            navigation.navigate("Clases", {
                idTask: id_task
            })
        } else if (tipo == 3) {
            navigation.navigate("Inventario", {
                idTask: id_task
            })
        }
    }

    // Obtenemos la lista de alumnos
    useEffect(() => {
        const result = getInfoTask(nombreUser)

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                console.log(res)
                if (res.status == 200) {
                    setListaTareas(res.data)
                } else {
                    console.log("No hay tareas")
                    //setListaTareas({tipo: "Ninguno"})
                }
            })

        // Establecemos fecha actual
        let today = new Date(Date.now());
        console.log(today);
        setFechaActual(today.getDay()); 
    }, [])

    return (
        <View style={styles.container}>
            <Header nombreUser={nombreUser}></Header>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Tareas del { names[fechaActual-1] } </Text>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    {
                        listaTareas.map((item, index) => {
                            if (item.estado == 0) {
                                return( 
                                <View>
                                <Button style={styles.button} 
                                        color='#bdb2ff' 
                                        key={index} 
                                        title={<Text style={styles.text}>{item.nombre} </Text>} 
                                        accessibilityLabel='Seleccionar la tarea'
                                        onPress={() => goToTask(item.id_tarea, item.tipo, item.id_tarea_multimedia)} 
                                 />
                                 <View style ={styles.separador}> </View>
                                 </View>
                                 )
                            }
                        })
                    }
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },
    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        color: 'black'
    },
    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    button: {
        marginTop: 10,  
        marginBottom: 10
    },
    separador:{
        paddingTop: 10
    }
})

const refreshButton = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AC33FF',
    }
})

export default MenuTareas




import React, { useEffect, useState, createRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getInfoTask } from "../api";
import Task from '../components/Task';
import { BottomSheet } from "react-native-elements";
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";

const MenuTareas = ({ route, navigation }) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([])

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
    }, [])

    return (
        <View style={styles.container}>
            <Header nombreUser={nombreUser}></Header>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Tareas de Hoy </Text>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    {
                        listaTareas.map((item, index) => {
                            if (!item.estado) {
                                return <Button key={index} title={<Text style={styles.text}>{item.nombre} </Text>} onPress={() => goToTask(item.id_tarea, item.tipo, item.id_tarea_multimedia)} />
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
    },
    item: {
        marginTop: 30,
    },
})

const refreshButton = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AC33FF',
    }
})

export default MenuTareas




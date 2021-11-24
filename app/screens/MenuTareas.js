import React,{useEffect, useState, createRef} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getInfoTask } from "../api";
import Task from '../components/Task';
import { BottomSheet } from "react-native-elements";
import Header from '../components/Header';

const  MenuTareas = ({ route, navigation }) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([])

    const goToTask = async (id_task) => {
        navigation.navigate("InfoTarea", {
            idTask: id_task
        })
    }

    const handleGetTareas = async () =>{
        console.log("Entro a hacer cositis")
        const result = getInfoTask(nombreUser)        

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
                //setListaTareas({tipo: "Ninguno"})
            }
        })
    }

    return (
        <View style={styles.container}>
            <Header nombreUser = {nombreUser}></Header>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Tareas de Hoy </Text>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    {
                        listaTareas.map((item, index) => {
                            return <Button key={index} title={item.tipo} onPress={() => goToTask(item.id_tarea)} />
                        })
                    }
                </View>
                <Button 
                    style={refreshButton.container}
                    title={<Text style={styles.text}>Refrescar tareas</Text>}
                    onPress={() => handleGetTareas()}
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
        textAlign: 'center',
    },
    sectionTitle:{
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




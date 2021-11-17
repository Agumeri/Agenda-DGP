import React,{useEffect, useState, createRef} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getInfoTask } from "../api";
import Task from '../components/Task';

const  MenuTareas = ({ route, navigation }) => {
    // Variable for data
    const nombreUser = route.params['nombreUser']   //User Name
    const [listaTareas, setListaTareas] = useState([])

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
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Tareas de Hoy </Text>
                {/* Aqui es donde va cada Tarea */}
                <View style={styles.item}>
                    {
                        listaTareas.map((item, index) => {
                            return <Task key={index} text={item.tipo}/>
                        })
                    }
                </View>
                <Button 
                    title="Refrescar tareas" 
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
    },
    sectionTitle:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        marginTop: 30,
    }
})

export default MenuTareas




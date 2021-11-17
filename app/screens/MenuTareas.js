import React,{useEffect, useState, createRef} from "react";
import {View, Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getInfoTask } from "../api";
import Task from '../components/Task';

const MenuTareas = ({navigation}) => {
    // Variable for data
    const userName = navigation.getParam('user')
    const [task, setTask] = useState('') // Task
    const [userPass, setUserPass] = useState('') // Pass Data
    const [loading, setLoading] = useState(false) //Load data

    const result = getInfoTask("alum_3")
    let tareas = "Vacio", estado = "Vacio"

    result.then( response => 
        response.json().then( data => ({
            data: data,
            status: response.status
        })
        )
    ).then( res => {
        console.log(res.data)
    })

    return (
        <View style={styles.container}>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Tareas de Hoy </Text>
                <View style={styles.item}>
                    {/* Aqui es donde va cada Tarea */}
                    <Task text={'Tarea 1'}/>
                    <Task text={'Tarea 2'}/>
                    <Task text={'Tarea 3'}/>
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
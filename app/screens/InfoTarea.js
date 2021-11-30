import React,{useEffect, useState, ListItem, createRef} from "react";
import {Button, View, Text, StyleSheet} from "react-native";
import Header from '../components/Header'
import { getDetailsTask, getMultimediaTarea, getPasosTarea} from "../api";
import Imagen from '../components/Imagen'

const InfoTarea = ({route}) => {
    const idTask = route.params['idTask']   //User Name

    const result = getDetailsTask(idTask);

    const [infoTask, setInfoTask] = useState([])
    const [multimediaTask, setMultimediaTask] = useState([])
    const [pasosMax, setPasosMax] = useState(0)
    const [pasoActual, setPasoActual] = useState(0)
    
    
    const handleInfo = async () =>{
        const result = getDetailsTask(idTask)        

        result.then( response =>  response.json().then( data => ({
                data: data,
                status: response.status
        })))
        .then( res => {
            //console.log(res)
            if(res.status == 200) {
                console.log(res.data)
                setInfoTask(res.data)
            } else {
                console.log("No hay información")
            }
        })

        handleMultimedia()
        handleMaxPasos()
    }

    const handleMultimedia = async () =>{
        const result = getMultimediaTarea(idTask, pasoActual)

        result.then( response =>  response.json().then( data => ({
            data: data,
            status: response.status
        })))
        .then( res => {
            //console.log(res)
            if(res.status == 200) {
                //console.log(res.data)
                setMultimediaTask(res.data)
            } else {
                console.log("No hay información")
            }
        })
    }

    const handleMaxPasos = () => {
        console.log("Entro a ver los pasos max")
        const result = getPasosTarea(idTask)

        result.then( response =>  response.json().then( data => ({
            data: data,
            status: response.status
        })))
        .then( res => {
            //console.log(res)
            if(res.status == 200) {
                //console.log(res.data)
                setPasosMax(res.data)
            } else {
                console.log("No hay información")
            }
        })
    }    

    const pasoSiguiente = () => {
        if (pasoActual < pasosMax) {
            setPasoActual(pasoActual+1)
        } else {
            setPasoActual(1)
        }
            
        handleMultimedia()
    }

    const pasoAnterior = () => {
        if (pasoActual > 1) {
            setPasoActual(pasoActual-1)
        } else {
            setPasoActual(1)
        }
        handleMultimedia()
    }

    return (
        <View style={styles.container}>
            {/* Tareas de Hoy*/}
            <View style={styles.taskWrapper}>
                <View style={styles.item}>
                </View>
                <View style={styles.item}>
                {
                    multimediaTask.map((multimedia) => {
                        return( 
                            <View style={styles.taskContainer}>
                                <Text style={styles.item}> Paso {pasoActual} </Text>
                                <View>
                                <Imagen style={styles.pictograma} name = {multimedia.url_foto}/>
                                </View>
                                <Text style={styles.item}> {multimedia.descripcion} </Text>
                            </View>
                        )})
                }
                </View>     
                <Button 
                    title="<-" 
                    onPress={() => pasoAnterior()}
                />  
                <Button 
                    title="Refrescar tareas" 
                    onPress={() => handleInfo()}
                />
                <Button 
                    title="->" 
                    onPress={() => pasoSiguiente()}
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

    },
    pictograma : {
		width: 300,
		height: 300,
        backgroundColor :'#FFFFFF',
        marginTop: 30,
        marginBottom: 30,

	},
    taskContainer : {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center'
    }
})


export default InfoTarea

/**
 * <Image style={styles.pictograma} source={{uri: multimedia.url_foto}}/>
 */
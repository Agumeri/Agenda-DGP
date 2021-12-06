import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from '../components/Header'
import { getDetailsTask, getMultimediaByTarea } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";


const InfoTarea = ({ route }) => {
    const id_tarea = route.params['idTask'] // id de la tarea
    const nombreUser = route.params['nombreUser'] 

    const [pasos, setPasos] = useState([])
    const [pasosMax, setPasosMax] = useState(0)
    const [pasoActual, setPasoActual] = useState(0)
    const [firstTime, setFirstTime] = useState(true);


    useEffect(() => {
        console.log("useEffect")
        if (firstTime) {
            update()
            console.log("Entro al update")
        }
        setFirstTime(false);

    })

    const update = async () => {
        // Cogemos todas las pasos
        handlePasos()

        // Ponemos el valor de la cantidad de pasos que hay 
        setPasosMax(pasos.length)

    }

    const handlePasos = async () => {
        const result = getMultimediaByTarea(id_tarea)

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setPasos(res.data)
                } else {
                    console.log("No hay información de las pasos")
                }
            })

    }

    return (
        <View style={styles.container}>
            <View style = {styles.header}>
                <Header nombreUser = {nombreUser}></Header>
            </View>
            
            <View style={styles.item}>
                {
                    pasos.map((p) => {
                        if (p.paso == pasoActual + 1) {
                            return (
                                <View style={styles.taskContainer}>
                                    <Text style={styles.text}> {"Paso "+p.paso} </Text>
                                    <View>
                                        <Image style={styles.pictograma} source={require("../images/tareas/" + p.url_foto)} />
                                    </View>
                                    <Text style={styles.text}> {p.descripcion} </Text>
                                </View>
                            )
                        }

                    })

                }

            </View>


            <View style={styles.cambiarPaso}>
                <Button
                    onPress={() => {
                        if(pasoActual == 0){
                            setPasoActual(pasosMax-1)
                        }
                        else {
                            setPasoActual((pasoActual - 1) % pasosMax)
                        }
                    }}
                    icon={<Icon
                        name="arrow-left"
                        color="white"
                        size={40}
                    />}
                />
                <Button
                    icon={<Icon
                        name="refresh"
                        color="white"
                        size={30}
                    />}
                    title=" Refrescar tareas"
                    onPress={() => update()}
                />
                <Button
                    onPress={() => {
                        setPasoActual((pasoActual + 1) % pasosMax)
                    }}
                    icon={<Icon
                        name="arrow-right"
                        color="white"
                        size={40}
                    />}
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
        alignItems: 'center',
    },

    sectionTitle: {
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
    text: {
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    pictograma: {
        width: 200,
        height: 200,
        backgroundColor: '#FFFFFF',
        marginTop: 30,
        marginBottom: 30,

    },
    taskContainer: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center'
    },
    cambiarPaso: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40
    },
    header: {
        width: '100%'
    }
})


export default InfoTarea


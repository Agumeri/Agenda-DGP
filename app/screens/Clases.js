import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import { useNavigation } from "@react-navigation/core";
import { getClases } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";

const Clases = ({ route, navigation }) => {


    const [clases, setClases] = useState([])
    const [clasesMax, setClasesMax] = useState(0)
    const [claseActual, setClaseActual] = useState(0)
    const [firstTime, setFirstTime] = useState(true);
    const nombreUser = route.params['nombreUser']

    useEffect(() => {
        console.log("useEffect")
        setClasesMax(clases.length)
        if (firstTime) {
            update()
            console.log("Entro al update")
        }
        setFirstTime(false);

    })

    const update = async () => {
        // Cogemos todas las clases
        handleClases()

        // Ponemos el valor de la cantidad de clases que hay 
       

    }

    const handleClases = async () => {
        const result = getClases()

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setClases(res.data)
                } else {
                    console.log("No hay información de las clases")
                }
            })

    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Header nombreUser={nombreUser}></Header>
            </View> 

            <View style={styles.item}>
                {
                    clases.map((clase) => {
                        if (clase.id_clase == claseActual + 1) {
                            return (
                                <View style={styles.taskContainer}>
                                    <Text style={styles.text}> {clase.nombre} </Text>
                                    <View>
                                        <TouchableOpacity onPress={() => {navigation.navigate("Menus", {
                                                                            idClase: clase.id_clase,
                                                                            nombreClase: clase.nombre
                                            })}}>
                                            <Image style={styles.pictograma} source={require("../images/clases/" + clase.imagen)}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }

                    })

                }

            </View>

            <View style ={styles.separador}> </View>

            <View style={styles.cambiarPaso}>
                <TouchableOpacity
                    onPress={() => {
                        if(claseActual == 0){
                            setClaseActual(clasesMax-1)
                        }
                        else {
                            setClaseActual((claseActual - 1) % clasesMax)
                        }
                    }}>
                    <Icon
                        name="arrow-circle-left"
                        color='#922B21'
                        size={60}
                    />
                </TouchableOpacity>
                {/* <Button
                    icon={<Icon
                        name="refresh"
                        color="white"
                        size={30}
                    />}
                    title=" Refrescar tareas"
                    onPress={() => update()}
                /> */}
                
                <TouchableOpacity
                    onPress={() => {
                        setClaseActual((claseActual + 1) % clasesMax)
                    }}>
                    <Icon
                        name="arrow-circle-right"
                        color='#922B21'
                        size={60}
                    />
                </TouchableOpacity>
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
        marginTop: 40,
        marginBottom: 15,
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
    },
    pictograma: {
        width: 250,
        height: 250,
        backgroundColor: '#FFFFFF',
        borderColor: '#922B21',
        borderWidth: 3,
        borderStyle: 'solid',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    taskContainer: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center'
    },
    cambiarPaso: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40
    },
    separador:{
        paddingTop: 20
    },
    header: {
        width: '100%',
        height: 40
    }
})


export default Clases


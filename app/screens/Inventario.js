import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Header from '../components/Header'
import { getInventario, setCantidadObjeto } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";

const Inventario = ({ route }) => {

    const [cantidad, setCantidad] = useState(0)
    const [inventario, setInventario] = useState([])
    const [objetosMax, setObjetosMax] = useState(0)
    const [objetoActual, setObjetoActual] = useState(0)
    const [firstTime, setFirstTime] = useState(true);
    const nombreUser = route.params['nombreUser']


    useEffect(() => {
        console.log("useEffect")
        if(firstTime){
            update()
            console.log("Entro al update")
        }
        setFirstTime(false);

    })

    const update = async() => {
        // Cogemos todo el inventario
        handleInventario()

        // Ponemos el valor de la cantidad de objetos que hay 
        setObjetosMax(inventario.length)

        // Ponemos la Cantidad que vamos a mostrar como la cantidad del objeto actual
        inventario.map((objeto) => {
            if (objeto.id_objeto == objetoActual + 1) {
                setCantidad(objeto.cantidad)
            }

        })
    }

    const handleInventario = async () => {
        const result = getInventario()

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setInventario(res.data)
                } else {
                    console.log("No hay información del inventario")
                }
            })

    }

    const handleCantidad = async (id_objeto, cantidad) => {
        const result = setCantidadObjeto(id_objeto, cantidad)

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                } else {
                    console.log("No se ha podido actualizar el inventario")
                }
            })

    }

    const disminuirCantidad = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1)
        } else {
            setCantidad(0)
        }
    }


    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Header nombreUser={nombreUser}></Header>
            </View>    

            <View style={styles.item}>
                {
                    inventario.map((objeto) => {
                        if (objeto.id_objeto == objetoActual + 1) {
                            return (
                                <View style={styles.taskContainer}>
                                    <Text style={styles.text}> {objeto.nombre} </Text>
                                    <View>
                                        <Image
                                            style={styles.pictograma}
                                            source={require("../images/inventario/" + objeto.imagen)}
                                        />
                                    </View>
                                </View>
                            )
                        }

                    })

                }

            </View>
            <View style={styles.cambiarCantidad}>
                <TouchableOpacity
                    onPress={() => disminuirCantidad()}>
                    <Icon
                        name="minus-square"
                        color='#A5156E'
                        size={60}
                    />
                </TouchableOpacity>
                
                <Text style={styles.textCantidad}>{cantidad}</Text>
                <TouchableOpacity
                    onPress={() => setCantidad(cantidad + 1)}>
                    <Icon
                        name="plus-square"
                        color='#A5156E'
                        size={60}
                    />
                </TouchableOpacity>
            </View>
            

            <View style ={styles.separador}> </View>

            <View style={styles.cambiarPaso}>
                <TouchableOpacity
                    onPress={() => {
                        if(objetoActual == 0){
                            setObjetoActual(objetosMax-1)
                        }
                        else {
                            setObjetoActual((objetoActual - 1) % objetosMax)
                        }
                        setFirstTime(true)
                    }}>
                    <Icon
                        name="arrow-circle-left"
                        color='#A5156E'
                        size={60}
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => update()}>
                    <Icon
                        name="refresh"
                        color='#A5156E'
                        size={30}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        handleCantidad(objetoActual+1, cantidad)
                    }}>
                    <Icon
                        name="check-square"
                        color="#1E8449"
                        size={60}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setObjetoActual((objetoActual + 1) % objetosMax)
                        setFirstTime(true)
                    }}>
                    <Icon
                        name="arrow-circle-right"
                        color='#A5156E'
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
        textTransform: 'uppercase'

    },
    text: {
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        marginTop: 20,
    },
    pictograma: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        height: 250,
        width: 250,
        borderRadius: 10,
        borderColor: '#83346D',
        borderWidth: 3,
        borderStyle: 'solid',

    },
    taskContainer: {
        flex: 1,
        backgroundColor: '#E8EAED',
        textAlign: 'center',
        alignItems: 'center'
    },
    cambiarCantidad: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        fontSize: 50,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    textCantidad:{
        fontSize: 50,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    cambiarPaso: {
        flexDirection: 'row',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40
    },
    separador:{
        paddingTop: 10
    },
    header: {
        width: '100%',
        height: 40
    }
})


export default Inventario


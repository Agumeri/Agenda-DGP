import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from '../components/Header'
import { getInventario, setCantidadObjeto } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";

const Inventario = ({ route }) => {

    const [cantidad, setCantidad] = useState(0)
    const [inventario, setInventario] = useState([])
    const [objetosMax, setObjetosMax] = useState(0)
    const [objetoActual, setObjetoActual] = useState(0)


    useEffect(() => {
        console.log("Acabo de entrar al inventario")
        // Cogemos todo el inventario
        handleInventario()

        // Ponemos el valor de la cantidad de objetos que hay 
        setObjetosMax(inventario.length)

        // Ponemos la Cantidad que vamos a mostrar como la cantidad del objeto actual
        setCantidad(inventario[objetoActual].cantidad)
    })

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
            <View style={styles.item}>          
                <View style={styles.taskContainer}>
                    <Text style={styles.text}> inventario[objetoActual].nombre </Text>
                    <View>
                        <Image
                            style={styles.pictograma}
                            source={require("../images/inventario/" + inventario[objetoActual].imagen)}
                        />
                    </View>
                    <Text style={styles.item}> {multimedia.descripcion} </Text>
                </View>
                
                        
            </View>
            <View style={styles.cambiarCantidad}>
                <Button
                    onPress={() => disminuirCantidad()}
                    icon={<Icon
                        name="minus"
                        color="white"
                        size={40}
                    />}
                />
                <Text>cantidad</Text>
                <Button
                    onPress={() => setCantidad(cantidad + 1)}
                    icon={<Icon
                        name="plus"
                        color="white"
                        size={40}
                    />}
                />
            </View>
            <View>
                <Button
                    onPress={() => handleCantidad(inventario[objetoActual].id_objeto, cantidad)}
                    icon={<Icon
                        name="check"
                        color="white"
                        size={40}
                    />}
                />
            </View>

            <View style={styles.cambiarPaso}>
                <Button
                    onPress={() => setObjetoActual((objetoActual+1)%objetosMax)}
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
                    onPress={() => useEffect()}
                />
                <Button
                    onPress={() => setObjetoActual((objetoActual+1)%objetosMax)}
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
        width: 300,
        height: 300,
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
    cambiarCantidad: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        fontSize: 50,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    cambiarPaso: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 40
    }
})


export default Inventario


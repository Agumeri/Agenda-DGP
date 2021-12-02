import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Header from '../components/Header'
import { useNavigation } from "@react-navigation/core";
import { getMenus, setCantidadMenuClase} from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";

const Menus = ({ route , navigation }) => {

    const id_clase = route.params['idClase']
    const nombre_clase = route.params['nombreClase']   

    const [cantidad, setCantidad] = useState(0)
    const [menus, setMenus] = useState([])
    const [menusMax, setMenusMax] = useState(0)
    const [menuActual, setMenuActual] = useState(0)
    const [firstTime, setFirstTime] = useState(true);


    useEffect(() => {
        console.log("useEffect")
        if(firstTime){
            update()
            console.log("Entro al update")
        }
        setFirstTime(false);

    })

    const update = async() => {
        // Cogemos todos los menús
        handleMenus()

        // Ponemos el valor de la cantidad de menus que hay 
        setMenusMax(menus.length)

    }

    const handleMenus = async () => {
        const result = getMenus()

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                    setMenus(res.data)
                } else {
                    console.log("No hay información de los menus")
                }
            })

    }

    const handleCantidad = async (id_menu, cantidad) => {
        const result = setCantidadMenuClase(id_clase, id_menu, cantidad)

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                } else {
                    console.log("No se ha podido actualizar la cantidad del menu")
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
            <Button
                    onPress={() => {
                        navigation.navigate("Clases")
                    }}
                    icon={<Icon
                        name="undo"
                        color="white"
                        size={40}
                    />}
            />
            <View style={styles.item}>
                {
                    menus.map((menu) => {
                        if (menu.id_menu == menuActual + 1) {
                            return (
                                <View style={styles.taskContainer}>
                                    <Text style={styles.text}> {nombre_clase} </Text>
                                    <View>

                                        <Image
                                            style={styles.pictograma}
                                            source={require("../images/menus/" + menu.imagen)}
                                        />
                                    </View>
                                    <Text style={styles.text}> {menu.nombre} </Text>
                                </View>
                            )
                        }

                    })

                }

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
                <Text style={styles.textCantidad}>{cantidad}</Text>
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
                    onPress={() => {
                        handleCantidad(menuActual+1, cantidad)
                    }}
                    icon={<Icon
                        name="check"
                        color="white"
                        size={40}
                    />}
                />
            </View>

            <View style={styles.cambiarPaso}>
                <Button
                    onPress={() => {
                        if(menuActual == 0){
                            setMenuActual(menusMax-1)
                        }
                        else {
                            setMenuActual((menuActual - 1) % menusMax)
                        }
                        setCantidad(0)
                        setFirstTime(true) 
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
                        setMenuActual((menuActual + 1) % menusMax)
                        setCantidad(0)
                        setFirstTime(true)
                        
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
    textCantidad:{
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


export default Menus

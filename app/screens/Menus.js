import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
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
    const nombreUser = route.params['nombreUser']


    useEffect(() => {
        console.log("useEffect")
        setMenusMax(menus.length)
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
            {/*
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
            */}

            <View style={styles.header}>
                <Header nombreUser={nombreUser}></Header>
            </View>

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
                <TouchableOpacity
                    onPress={() => disminuirCantidad()}>
                    <Icon
                        name="minus-square"
                        color='#922B21'
                        size={60}
                    />
                </TouchableOpacity>
                <Text style={styles.textCantidad}>{cantidad}</Text>
                <TouchableOpacity
                    onPress={() => setCantidad(cantidad + 1)}>
                    <Icon
                        name="plus-square"
                        color='#922B21'
                        size={60}
                    />
                </TouchableOpacity>
            </View>
            
            <View style ={styles.separador}> </View>

            <View style={styles.cambiarPaso}>
                <TouchableOpacity
                    onPress={() => {
                        if(menuActual == 0){
                            setMenuActual(menusMax-1)
                        }
                        else {
                            setMenuActual((menuActual - 1) % menusMax)
                        }
                        setCantidad(0)
                        setFirstTime(true) 
                    }}>
                    <Icon
                        name="arrow-circle-left"
                        color='#922B21'
                        size={60}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                     onPress={() => {
                        handleCantidad(menuActual+1, cantidad)
                    }}>
                    <Icon
                        name="check-square"
                        color="#1E8449"
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
                        setMenuActual((menuActual + 1) % menusMax)
                        setCantidad(0)
                        setFirstTime(true)    
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
        fontSize: 24,
        fontFamily: 'Escolar2',
        textTransform: 'uppercase',
        color: 'black'
    },
    pictograma: {
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginBottom: 10,
        height: 250,
        width: 250,
        borderRadius: 10,
        borderColor: '#922B21',
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
        textAlign: 'center'
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
    header: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    separador:{
        paddingTop: 10
    }
})


export default Menus

import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image, CheckBox } from "react-native";
import Header from '../components/Header'
import { getMultimediaByTarea, setEstadoTarea } from "../api";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-elements";


const InfoTarea = ({ route }) => {
    const id_tarea = route.params['idTask'] // id de la tarea
    const id_multimedia = route.params['idMultimedia']
    const nombreUser = route.params['nombreUser']

    const [pasos, setPasos] = useState([])
    const [pasosMax, setPasosMax] = useState(0)
    const [pasoActual, setPasoActual] = useState(0)
    const [firstTime, setFirstTime] = useState(true);
    const [isSelected, setSelected] = useState(false);
    const [oldSelected,setOldSelected] = useState(false);
    const [textoBox, setTextoBox] = useState("Tarea no realizada")


    useEffect(() => {
        console.log("useEffect")
        setPasosMax(pasos.length)
        if (firstTime) {
            update()
            console.log("Entro al update")
        }
        setFirstTime(false);

        if(oldSelected!=isSelected){
            handleChange()
            setOldSelected(isSelected)
        }

    })

    const update = async () => {
        // Cogemos todas las pasos
        handlePasos()

        // Ponemos el valor de la cantidad de pasos que hay 


    }
    const handleChange = async (selected) => {
        console.log("Entro al handleChange")
        console.log(isSelected)
        let result = null;
        if (isSelected) {
            result = setEstadoTarea(id_tarea, 1)
            setTextoBox("Tarea realizada")
        }
        else {
            result = setEstadoTarea(id_tarea, 0)
            setTextoBox("Tarea no realizada")
        }

        result.then(response => response.json().then(data => ({
            data: data,
            status: response.status
        })))
            .then(res => {
                //console.log(res)
                if (res.status == 200) {
                    console.log(res.data)
                } else {
                    console.log("No se ha podido cambiar el estado")
                }
            })



    }

    const checkbox = (paso) => {
        if (paso == pasosMax) {
            return (
                <View>

                    
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelected}
                        style={styles.checkbox}
                    />
                    <Text style={styles.text}> {textoBox}</Text>


                </View>
            )
        }
    }


    const handlePasos = async () => {
        const result = getMultimediaByTarea(id_multimedia)

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
            <View style={styles.header}>
                <Header nombreUser={nombreUser}></Header>
            </View>

            <View style={styles.item}>
                {
                    pasos.map((p) => {
                        if (p.paso == pasoActual + 1) {
                            return (
                                <View key={p.id_multimedia} style={styles.taskContainer}>
                                    <Text style={styles.text}> {"Paso " + p.paso} </Text>
                                    <View>
                                        <Image style={styles.pictograma} source={{ uri: p.url_foto }} />
                                    </View>
                                    <Text style={styles.text}> {p.descripcion} </Text>
                                    {checkbox(p.paso)}
                                </View>


                            )
                        }

                    })

                }

            </View>


            <View style={styles.cambiarPaso}>
                <Button
                    onPress={() => {
                        if (pasoActual == 0) {
                            setPasoActual(pasosMax - 1)
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
                {/* <Button
                    icon={<Icon
                        name="refresh"
                        color="white"
                        size={30}
                    />}
                    title=" Refrescar tareas"
                    onPress={() => update()}
                /> */}
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
    },
    checkbox: {
        alignSelf: "center",
        width: 50,
        height: 50,
        backgroundColor: '#EEEEEE',
        marginTop: 30,
        marginBottom: 30,
    }
})


export default InfoTarea


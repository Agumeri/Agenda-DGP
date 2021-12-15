import React, { useEffect, useState, ListItem, createRef } from "react";
import { View, Text, StyleSheet, Image, CheckBox,  TouchableOpacity } from "react-native";
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
        if (isSelected) {
            setEstadoTarea(id_tarea, 1)
            setTextoBox("Tarea realizada")
        }
        else {
            setEstadoTarea(id_tarea, 0)
            setTextoBox("Tarea no realizada")
        }



    }

    const checkbox = (paso) => {
        if (paso == pasosMax) {
            return (
                <View style= {styles.marcarRealizada}>

                    
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
                <TouchableOpacity
                    onPress={() => {
                        if (pasoActual == 0) {
                            setPasoActual(pasosMax - 1)
                        }
                        else {
                            setPasoActual((pasoActual - 1) % pasosMax)
                        }
                    }}>
                    <Icon
                        name="arrow-circle-left"
                        color='#1F618D'
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
                        setPasoActual((pasoActual + 1) % pasosMax)
                    }}>
                    <Icon
                        name="arrow-circle-right"
                        color='#1F618D'
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
        marginBottom: 18,
    },
    pictograma: {
        width: 250,
        height: 250,
        backgroundColor: '#FFFFFF',
        marginTop: 0,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#1F618D',
        borderWidth: 3,
        borderStyle: 'solid',

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
    header: {
        width: '100%'
    },
    checkbox: {
        alignSelf: "center",
        width: 40,
        height: 40,
        backgroundColor: '#EEEEEE',
        marginTop: 30,
        marginBottom: 30,
    },
    marcarRealizada: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 40,
        marginBottom: 10,
        justifyContent: 'space-between',
        marginHorizontal: 30
    }
})


export default InfoTarea


import React from 'react';
import { Image } from 'react-native';

const Imagen = (props) => {
    switch (props.name) {
        case "ir":
            return <Image style={props.style} source={require('../images/tareas/ir.png')} />;
        case "coger":
            return <Image style={props.style} source={require('../images/tareas/coger.png')} />;
        case "lavar":
            return <Image style={props.style} source={require('../images/tareas/lavar.png')} />;
        case "llevar":
            return <Image style={props.style} source={require('../images/tareas/llevar.png')} />;
        case "microondas":
            return <Image style={props.style} source={require('../images/tareas/microondas.png')} />;
        case "traer":
            return <Image style={props.style} source={require('../images/tareas/traer.png')} />;

    }
}

export default Imagen
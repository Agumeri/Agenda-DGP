import React from 'react';
import { Image } from 'react-native';

const Imagen = (props) => {
    switch (props.name) {
        case "ir":
            return <Image style={props.style} source={require('../images/ir.png')} />;
        case "coger":
            return <Image style={props.style} source={require('../images/coger.png')} />;
        case "lavar":
            return <Image style={props.style} source={require('../images/lavar.png')} />;
        case "llevar":
            return <Image style={props.style} source={require('../images/llevar.png')} />;
        case "microondas":
            return <Image style={props.style} source={require('../images/microondas.png')} />;
        case "traer":
            return <Image style={props.style} source={require('../images/traer.png')} />;

    }
}

export default Imagen
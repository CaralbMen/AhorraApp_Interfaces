import { Text, View, ImageBackground } from 'react-native'
import React, { Component } from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales';
export default function Transacciones(){
return (
    <View style={estilosGlobales.container}>
        <View style={estilosGlobales.cabecera}>
            <View style={estilosGlobales.tituloContent}>
                <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
            </View>
            <View style={estilosGlobales.logoContent}>
                <ImageBackground
                    source={require('../assets/LogoAhorraSinFondo.png')}
                    style={estilosGlobales.logo}
                />
            </View>
            

           

        </View>
        
    </View>
)
  
}

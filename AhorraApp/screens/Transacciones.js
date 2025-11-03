import { Text, View, ImageBackground, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { Component, useState } from 'react'
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
            <ScrollView 
                style={styles.sroll}
                contentContainerStyle={styles.contenido}
            >
                <View style={estilosGlobales.pantallaActualContainer}>
                    <Text style={estilosGlobales.textoPantalla}>Tus Movimientos</Text>
                </View>
                <View style={estilosGlobales.contenidoScreen}>
                    <View style={styles.contentInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='  Buscar'
                           
                        />
                    </View>
                   

                    
                </View>
            </ScrollView>
            <View style={estilosGlobales.footer}>
                <ImageBackground
                    source={require('../assets/iconoCategorias.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoHome.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoMas.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoPerfil.png')}
                />
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
    sroll:{
        width: '100%',
        backgroundColor: '#eaf8fbff',
    }, 
    contenido:{
        flex: 1,
        alignItems: 'center',
    },
    contentInput:{
        width: '100%',
        height: 30,
        justifyContent: 'end',
    },
    input:{
        width: '50%',
        height: 20,
        borderColor:'#E0EDFF',
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 10,
        alignSelf: 'flex-end',
        marginTop: 5,
        color: 'gray',
    },
});
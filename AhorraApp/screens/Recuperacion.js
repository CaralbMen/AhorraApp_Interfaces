import { Text, StyleSheet, View,ImageBackground, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react';
import estilosGlobales from '../screens/styles/estilosGlobales';
import Login from '../screens/Login'
export default function Recuperacion() {

    const[pantalla, setPantalla]= useState('Recuperacion');
    switch (pantalla) {
        case 'Login':
            return <Login />
        case 'Recuperacion':
            default:
                return (
                    <View style={estilosGlobales.container}>
                        <View style={estilosGlobales.cabecera}>
                            <View style={estilosGlobales.tituloContent}>
                                <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                            </View>
                        </View>
                        <View>
                            <ImageBackground
                            source={require('../assets/LogoAhorraSinFondo.png')}
                            style={estilosGlobales.logo}
                            />
                        </View>
                        <View>
                            <Text style={styles.tittle} >Recupera tu cuenta</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.text}>Correo electrónico</Text>
                            <TextInput
                                style={styles.inputs}
                                placeholder="abcd@correo.com"
                                cursorColor="#24be21ff" 
                                keyboardType="email-address"
                            />
                            <Text style={styles.info}>
                                Te llegará un código de verificación para ingresar a tu aplicación
                            </Text>

                            <Pressable style={styles.button}>
                                <Text style={styles.textbutton}>Enviar Codigo</Text>
                            </Pressable>
                            <Pressable 
                                onPress={()=>setPantalla('Login')} 
                            >
                                <Text style={styles.link}>Iniciar Sesion</Text>
                            </Pressable>
                        </View>

                        <View  style={styles.footer}>
                            <Text style={styles.footerText}>Derechos Reservados</Text>
                        </View>
                        
                    </View>
                )
    }
    
  
}

const styles = StyleSheet.create({
    
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#C0D5F2',
        padding: 20,
        borderRadius: 10,
        paddingVertical: 16,
        marginBottom: 20,

    },
    tittle:{
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
        color: '#24be21ff',
        textAlign: 'center',
    },
    inputs:{
        width:'100%',
        borderWidth: 2,
        borderColor: '#006AFF',
        borderRadius:8,
        padding:10,
        marginBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.68)',
        underlineColorAndroid: 'transparent',  // Esto quita la línea en Android
    },
    info: {
        color: '#616161',
        textAlign: 'center',
        fontSize: 25,
        marginBottom: 20,
    },
    text: {
        marginBottom: 15,
        fontSize: 20,
        color: '#24be21ff',
        alignSelf: 'flex-start',
    },
    button:{
        backgroundColor: '#006AFF',
        padding: 20,
        borderRadius: 30,
        width: '60%',
        alignItems: 'center',
        marginTop: 15,
    },
    textbutton:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 5,
        fontSize: 17,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#757676ff',
        paddingVertical: 15,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.1)',
    },
    footerText: {
        fontSize: 20,
        color: '#ffffffff',
    },
})

import { Text, StyleSheet, View, Button, TextInput, Alert,ImageBackground,Animated, Easing, Switch, Pressable,ScrollView   } from 'react-native'
import React, { useState, useEffect, use} from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales';
import Transacciones from '../screens/Transacciones';
import Registro from '../screens/Registro';
export default function Login() {
  const[pantalla, setPantalla]= useState('login');

  switch(pantalla){
    case 'dashboard':
      return <Transacciones/>
    case 'Registro':
      return <Registro/>
    case 'login':
      default:
        return(
          <View style={styles.mainContainer}>
            <ScrollView 
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
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
              <Text style={styles.tittle} >Inicia Sesion</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.text}>Correo Electronico: </Text>
              <TextInput
                style={styles.inputs}
                placeholder='abcd@gmail.com'
                cursorColor="#24be21ff" 
              
              />
              <Text style={styles.text}>Contraseña: </Text>
              <TextInput
                style={styles.inputs}
                placeholder='********'
                secureTextEntry={true}
                cursorColor="#24be21ff" 
                
              
              />
              <Pressable 
                style={{alignSelf:'flex-start'}}
              >
               <Text style={styles.olvidoContra}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
             
          
            </View>
            <Pressable onPress={()=>setPantalla('dashboard')} 
              style={styles.button}
            >
              <Text style={styles.textbutton}>Iniciar Sesion</Text>
            </Pressable>
            
            <Pressable onPress={()=>setPantalla('Registro')} >
              <Text style={styles.resitroText}>¿No tienes una cuenta? Registrate</Text>
            </Pressable>
            </ScrollView>
            
            <View  style={styles.footer}>
              <Text style={styles.footerText}>Derechos Reservados</Text>
            </View>
          </View>
          
         
        )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E6F3FF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 80, // Espacio para que no se oculte contenido detrás del footer
  },

  tittle:{
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    color: '#24be21ff',
    textAlign: 'center',
  },
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
  text:{
    marginBottom: 15,
    fontSize: 20,
    alignItems: 'flex-start',
    color: '#24be21ff',
    alignSelf: 'flex-start',

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
  olvidoContra:{
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  button:{
    backgroundColor: '#006AFF',
    padding: 20,
    borderRadius: 30,
    width: '35%',
    alignItems: 'center',
    marginTop: 15,
  },
  textbutton:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
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
  resitroText:{
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    
  },
 
})
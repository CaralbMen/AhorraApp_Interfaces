import { Text, StyleSheet, View, Button, TextInput, Alert,ImageBackground,Animated, Easing, Switch, Pressable,ScrollView   } from 'react-native'
import React, { useState, useEffect, use} from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales';
import Transacciones from '../screens/Transacciones';
export default function Login() {
  const[pantalla, setPantalla]= useState('login');

  switch(pantalla){
    case 'dashboard':
      return <Transacciones/>
    case 'login':
      default:
        return(
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
            <Text>¿No tienes una cuenta? Registrate</Text>

            
            <View  style={estilosGlobales.footer}>
              <Text>Derechos Reservados</Text>
            </View>
          </View>
          
         
        )
  }
}

const styles = StyleSheet.create({

  tittle:{
    fontSize: 50,
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
    backgroundColor: 'rgba(115, 212, 242, 0.3)',
    padding: 20,
    borderRadius: 10,
    paddingVertical: 16,
    marginBottom: 20,

  },
  text:{
    marginBottom: 15,
    fontSize: 20,
    alignItems: 'flex-start',
    fontWeight: 'bold',
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
    backgroundColor: '#rgba(189, 192, 193, 0.4)',
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
    padding: 10,
    borderRadius: 20,
    width: '30%',
    alignItems: 'center',
  },
  textbutton:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
 
})
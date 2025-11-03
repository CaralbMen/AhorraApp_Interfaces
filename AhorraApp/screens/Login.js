import { Text, StyleSheet, View, Button, TextInput, Alert,ImageBackground,Animated, Easing, Switch  } from 'react-native'
import React, { useState, useEffect, use} from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales';
export default function Login() {
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
          <Text style={styles.text}>Password: </Text>
          <TextInput
            style={styles.inputs}
            placeholder='********'
            secureTextEntry={true}
            
          
          />
          <Text>Olvidaste tu contrasena?</Text>
      
        </View>
        <Button
          title='Iniciar Sesion'
          onPress={() => Alert.alert('Iniciando Sesion')}
        />
        <Text>¿No tienes una cuenta? Registrate</Text>
    </View>
  )
  
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
    width: '80%',
    backgroundColor: 'rgba(115, 212, 242, 0.3)',
    padding: 20,

  },
  text:{
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#24be21ff',

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
 
})
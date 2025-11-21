import { Text, StyleSheet, View, TextInput, Pressable, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales'
import Transacciones from '../screens/Transacciones'
import Login from '../screens/Login'

export default function Registro() {
  const [pantalla, setPantalla] = useState('registro');
  const [nombre,setNombre]=useState('');
  const [correo,setCorreo]=useState('');
  const [telefono,setTelefono]=useState('');
  const [contraseña,setContraseña]=useState('');

  const validarRegistro=()=>{
    if(nombre.trim()==='' || correo.trim()==='' || telefono.trim()==='' || contraseña.trim()===''){
      alert('Error, Por favor complete todos los campos');
    } else if(!/\S+@\S+\.\S+/.test(correo)){
      alert('Error, Por favor ingrese un correo valido');
    }else if(telefono.trim().length < 10){
      alert('Error, Por favor ingrese un numero de telefono valido');
    }else if(contraseña.trim().length < 6){
      alert('Error, La contraseña debe tener al menos 6 caracteres');
    }

  }

  switch (pantalla) {
    case 'dashboard':
      return <Transacciones />
    case 'login':
      return <Login />
    case 'registro':
    default:
      return (
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
              <Text style={styles.tittle}>Crear Cuenta</Text>
            </View>

            <View style={styles.container}>
              <Text style={styles.text}>Nombre completo:</Text>
              <TextInput
                style={styles.inputs}
                placeholder="Juan Pérez"
                cursorColor="#24be21ff"
                value={nombre}
                onChangeText={setNombre}
              />

              <Text style={styles.text}>Correo electrónico:</Text>
              <TextInput
                style={styles.inputs}
                placeholder="abcd@gmail.com"
                cursorColor="#24be21ff"
                value={correo}
                onChangeText={setCorreo}
              />

              <Text style={styles.text}>Telefono:</Text>
              <TextInput
                style={styles.inputs}
                placeholder="+52 1 234 567 8901"
                keyboardType="phone-pad"
                cursorColor="#24be21ff"
                value={telefono}
                onChangeText={setTelefono}
              />

              <Text style={styles.text}>Contraseña:</Text>
              <TextInput
                style={styles.inputs}
                placeholder="********"
                secureTextEntry={true}
                cursorColor="#24be21ff"
                value={contraseña}
                onChangeText={setContraseña}
              />
            </View>

            <Pressable
              onPress={() => setPantalla('dashboard')}
              style={styles.button}
              onPressIn={validarRegistro}
            >
              <Text style={styles.textbutton}>Registrarse</Text>
            </Pressable>

            <Pressable onPress={() => setPantalla('login')}>
              <Text style={styles.regresoText}>
                ¿Ya tienes una cuenta? Inicia sesión
              </Text>
            </Pressable>
          </ScrollView>

          <View style={styles.footer}>
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
    paddingBottom: 80,
  },
  tittle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    color: '#24be21ff',
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#C0D5F2',
    padding: 20,
    borderRadius: 10,
    paddingVertical: 16,
    marginBottom: 20,
  },
  text: {
    marginBottom: 15,
    fontSize: 20,
    color: '#24be21ff',
    alignSelf: 'flex-start',
  },
  inputs: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#006AFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
    underlineColorAndroid: 'transparent',
  },
  button: {
    backgroundColor: '#006AFF',
    padding: 20,
    borderRadius: 30,
    width: '40%',
    alignItems: 'center',
    marginTop: 15,
  },
  textbutton: {
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
  regresoText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
})

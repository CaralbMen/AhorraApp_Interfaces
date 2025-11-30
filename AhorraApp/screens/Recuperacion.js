import { Text, StyleSheet, View, ImageBackground, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import estilosGlobales from '../screens/styles/estilosGlobales';
import Login from '../screens/Login';
import { solicitarTokenRecuperacion, cambiarPasswordConToken } from '../controllers/usuarioController';

export default function Recuperacion() {
  const [pantalla, setPantalla] = useState('Recuperacion');
  const [paso, setPaso] = useState(1); // 1 = generar token, 2 = cambiar contraseña
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [nuevaPass, setNuevaPass] = useState('');
  const [tokenGenerado, setTokenGenerado] = useState('');

  async function onGenerarToken() {
    try {
      if (!email.trim()) return Alert.alert('Error', 'Ingresa tu correo');
      const tk = await solicitarTokenRecuperacion(email);
      setTokenGenerado(tk);
      setToken(tk); // AUTOCOMPLETA EL CAMPO DE TOKEN
      Alert.alert('Token generado', `Tu token es: ${tk}`);
      setPaso(2);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function onCambiarPassword() {
    try {
      if (!email.trim() || !token.trim() || !nuevaPass.trim()) {
        return Alert.alert('Error', 'Complete todos los campos');
      }
      await cambiarPasswordConToken(email, token, nuevaPass);
      Alert.alert('Listo', 'Contraseña actualizada. Inicia sesión.');
      setPantalla('Login');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  if (pantalla === 'Login') return <Login />;

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
        <Text style={styles.tittle}>Recupera tu cuenta</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Correo electrónico</Text>
        <TextInput
          style={styles.inputs}
          placeholder="abcd@correo.com"
          cursorColor="#24be21ff"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {paso === 1 && (
          <>
            <Text style={styles.info}>Generaremos un token aquí mismo para cambiar tu contraseña</Text>
            <Pressable style={styles.button} onPress={onGenerarToken}>
              <Text style={styles.textbutton}>Generar Token</Text>
            </Pressable>
            {tokenGenerado ? (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>Tu token:</Text>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#006AFF', textAlign: 'center' }}>
                  {tokenGenerado}
                </Text>
                <Text style={styles.info}>Ingresa este token en el siguiente paso</Text>
              </View>
            ) : null}
          </>
        )}

        {paso === 2 && (
          <>
            <Text style={styles.text}>Token</Text>
            <TextInput
              style={styles.inputs}
              placeholder="123456"
              cursorColor="#24be21ff"
              value={token}
              onChangeText={setToken}
              editable={false} // opcional: bloquea edición
            />
            {/* Muestra también el token generado por si quieres copiarlo */}
            {tokenGenerado ? (
              <Text style={styles.info}>Token generado: {tokenGenerado}</Text>
            ) : null}
            <Text style={styles.text}>Nueva contraseña</Text>
            <TextInput
              style={styles.inputs}
              placeholder="********"
              secureTextEntry
              cursorColor="#24be21ff"
              value={nuevaPass}
              onChangeText={setNuevaPass}
            />
            <Pressable style={styles.button} onPress={onCambiarPassword}>
              <Text style={styles.textbutton}>Cambiar contraseña</Text>
            </Pressable>
          </>
        )}

        <Pressable onPress={() => setPantalla('Login')} style={({ pressed }) => [
          styles.linkButton,
          pressed && styles.linkButtonPressed
        ]}>
          <Text style={styles.linkButtonText}>Iniciar Sesión</Text>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Derechos Reservados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', width: '80%', backgroundColor: '#C0D5F2', padding: 20, borderRadius: 10, paddingVertical: 16, marginBottom: 20 },
  tittle: { fontSize: 40, fontWeight: 'bold', marginBottom: 20, marginTop: 30, color: '#24be21ff', textAlign: 'center' },
  inputs: { width: '100%', borderWidth: 2, borderColor: '#006AFF', borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: 'rgba(255,255,255,0.68)', underlineColorAndroid: 'transparent' },
  info: { color: '#616161', textAlign: 'center', fontSize: 18, marginBottom: 10 },
  text: { marginBottom: 15, fontSize: 20, color: '#24be21ff', alignSelf: 'flex-start' },
  button: { 
    backgroundColor:'#006AFF', 
    padding:20, 
    borderRadius:30, 
    width:'60%', 
    alignItems:'center', 
    marginTop:15,
    shadowColor:'#000',
    shadowOffset:{ width:0, height:4 },
    shadowOpacity:0.2,
    shadowRadius:6,
    elevation:5
  },
  textbutton: { color:'white', fontWeight:'bold', fontSize:18 },

  // Nuevo diseño para “Iniciar Sesión”
  linkButton: {
    marginTop: 16,
    backgroundColor: '#24be21ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 28,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4
  },
  linkButtonPressed: {
    backgroundColor: '#1ea31cff'
  },
  linkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.3
  },

  // Elimina el estilo anterior si ya no lo usas:
  // link: { color:'blue', textAlign:'center', textDecorationLine:'underline', marginTop:10, fontSize:17 },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#757676ff', paddingVertical: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.1)' },
  footerText: { fontSize: 20, color: '#ffffffff' }
});

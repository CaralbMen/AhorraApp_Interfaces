import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuth } from '../context/AuthContext';

export default function ActualizarInfoScreen() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);

  const { updateProfile, logout, user } = useAuth();

  useEffect(() => {
    if (user) {
      setNombre(user.nombre || "");
      setCorreo(user.email || "");
      setTelefono(user.telefono || "");
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          onPress: () => logout()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ahorra+ App</Text>
      <Text style={styles.subtitulo}>Actualizar Información</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa tu nombre"
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="ejemplo@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          value={telefono}
          onChangeText={setTelefono}
          placeholder="Tu número"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!mostrarPass}
            value={contrasena}
            onChangeText={setContrasena}
            placeholder="********"
          />
          <TouchableOpacity
            style={styles.verBtn}
            onPress={() => setMostrarPass(!mostrarPass)}
          >
            <Text style={{ color: "#2f80ed", fontWeight: "bold" }}>
              {mostrarPass ? "Ocultar" : "Ver"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnGuardar}
          onPress={async () => {
            try {
              if (!user) return Alert.alert('Error', 'Inicia sesión primero');
              const ok = await updateProfile({ nombre, correo, telefono, contrasena });
              Alert.alert('Éxito', ok ? 'Información actualizada' : 'No se pudo actualizar');
            } catch (e) {
              Alert.alert('Error', 'Error al actualizar');
            }
          }}
        >
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Text style={styles.btnMiniText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E6EEF8", padding: 20 },
  titulo: { fontSize: 26, fontWeight: "bold", color: "green", textAlign: "center", marginVertical: 10 },
  subtitulo: { fontSize: 18, backgroundColor: "#d9e3f0", textAlign: "center", paddingVertical: 10, borderRadius: 10, marginBottom: 15, color: "#333", fontWeight: "bold" },
  form: { backgroundColor: "#f4f7fb", padding: 15, borderRadius: 12 },
  label: { fontSize: 16, color: "green", marginTop: 10, marginBottom: 5 },
  input: { borderWidth: 1.5, borderColor: "green", borderRadius: 8, padding: 10, backgroundColor: "white" },
  passwordContainer: { flexDirection: "row", alignItems: "center" },
  verBtn: { marginLeft: 8 },
  btnGuardar: { marginTop: 16, backgroundColor: "#2f80ed", paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnText: { color: "white", fontSize: 18, fontWeight: "bold" },
  btnLogout: { marginTop: 16, backgroundColor: '#FFA726', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  btnMiniText: { color: '#fff', fontSize: 15, fontWeight: 'bold' }
});

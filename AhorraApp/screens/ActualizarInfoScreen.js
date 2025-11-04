import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ActualizarInfoScreen() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);

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

        <TouchableOpacity style={styles.btnGuardar}>
          <Text style={styles.btnText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EEF8",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  subtitulo: {
    fontSize: 18,
    backgroundColor: "#d9e3f0",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: "#333",
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#f4f7fb",
    padding: 15,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    color: "green",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "green",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  verBtn: {
    marginLeft: 8,
  },
  btnGuardar: {
    marginTop: 25,
    backgroundColor: "#2f80ed",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

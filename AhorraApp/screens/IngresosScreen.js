import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

export default function IngresosScreen() {
  const [tipo, setTipo] = useState('ingreso');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    console.log('IngresosScreen montado');
    return () => console.log('IngresosScreen desmontado');
  }, []);

  const onConfirm = () => {
    if (!nombre.trim() || !cantidad.trim()) {
      alert('Completa al menos Nombre y Cantidad');
      return;
    }
    const movimiento = {
      tipo,
      nombre,
      categoria,
      cantidad: Number(cantidad) || 0,
      descripcion,
      fecha: new Date().toISOString(),
    };
    console.log('Confirmar movimiento:', movimiento);
    alert('Movimiento guardado (ver consola).');

    setNombre('');
    setCategoria('');
    setCantidad('');
    setDescripcion('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>Ahorra+ App</Text>

        {/* Selector Ingreso / Egreso */}
        <View style={styles.selector}>
          <TouchableOpacity
            style={[
              styles.tab,
              tipo === 'ingreso' && { borderBottomColor: 'green' },
            ]}
            onPress={() => setTipo('ingreso')}
            accessibilityRole="button"
            accessibilityLabel="Seleccionar ingreso"
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: tipo === 'ingreso' ? 'green' : 'gray' },
              ]}
            >
              Ingreso
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              tipo === 'egreso' && { borderBottomColor: 'red' },
            ]}
            onPress={() => setTipo('egreso')}
            accessibilityRole="button"
            accessibilityLabel="Seleccionar egreso"
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                { color: tipo === 'egreso' ? 'red' : 'gray' },
              ]}
            >
              Egreso
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          <Text style={[styles.label, { color: tipo === 'ingreso' ? 'green' : 'red' }]}>
            Nombre Movimiento
          </Text>
          <TextInput
            style={[styles.input, { borderColor: tipo === 'ingreso' ? 'green' : 'red' }]}
            placeholder="Ej. Sueldo, Venta, Compra"
            value={nombre}
            onChangeText={setNombre}
            returnKeyType="next"
          />

          <Text style={[styles.label, { color: tipo === 'ingreso' ? 'green' : 'red' }]}>Categoría</Text>
          <TextInput
            style={[styles.input, { borderColor: tipo === 'ingreso' ? 'green' : 'red' }]}
            placeholder="Ej. Trabajo, Comida, Transporte"
            value={categoria}
            onChangeText={setCategoria}
          />

          <Text style={[styles.label, { color: tipo === 'ingreso' ? 'green' : 'red' }]}>Cantidad</Text>
          <TextInput
            style={[styles.input, { borderColor: tipo === 'ingreso' ? 'green' : 'red' }]}
            placeholder="0.00"
            value={cantidad}
            onChangeText={text => {
              const sanitized = text.replace(/[^0-9.]/g, '');
              setCantidad(sanitized);
            }}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { color: tipo === 'ingreso' ? 'green' : 'red' }]}>Descripción</Text>
          <TextInput
            style={[styles.input, styles.inputMultiline, { borderColor: tipo === 'ingreso' ? 'green' : 'red' }]}
            placeholder="Opcional"
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.btn}
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        {/* pequeño footer para debug en web */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    padding: 20,
    backgroundColor: '#E6EEF8',
    minHeight: '100%',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginHorizontal: 6,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '700',
  },
  form: {
    backgroundColor: '#f4f7fb',
    padding: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1.4,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputMultiline: {
    minHeight: 80,
  },
  btn: {
    marginTop: 22,
    backgroundColor: '#2f80ed',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  versionText: {
    marginTop: 12,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
});

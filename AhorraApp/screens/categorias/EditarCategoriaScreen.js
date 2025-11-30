import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import estilosGlobales from '../styles/estilosGlobales';
import { agregarCategoria, editarCategoria, obtenerCategoriaPorId, obtenerIdUsuarioDefault } from '../../controllers/categoriasController';

export default function EditarCategoriaScreen({ navigation, route }) {
  const { id } = route.params || {};
  const esEdicion = !!id;

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [presupuesto, setPresupuesto] = useState('');
  const [periodicidad, setPeriodicidad] = useState('Semanal');

  useEffect(() => {
    if (esEdicion) {
      cargarDatosEdicion();
    }
  }, [id]);

  const cargarDatosEdicion = async () => {
    try {
        const data = await obtenerCategoriaPorId(id);
        if (data) {
            setNombre(data.nombre);
            setDescripcion(data.descripcion);
            setPresupuesto(data.presupuesto.toString());
            setPeriodicidad(data.periodo || 'Semanal');
        }
    } catch (error) {
        console.error("Error cargando datos de edición:", error);
    }
  };

  const handleGuardar = async () => {
    if (!nombre.trim() || !presupuesto.trim()) {
        Alert.alert("Error", "Por favor completa el nombre y el presupuesto");
        return;
    }

    let exito = false;
    const presupuestoNum = parseFloat(presupuesto) || 0; 

    try {
        const idUsuarioReal = await obtenerIdUsuarioDefault();
        
        if (!idUsuarioReal) {
             Alert.alert("Error", "No se encontró ningún usuario en la base de datos.");
             return;
        }

        if (esEdicion) {
            exito = await editarCategoria(id, nombre, descripcion, presupuestoNum, periodicidad);
        } else {
            exito = await agregarCategoria(nombre, descripcion, presupuestoNum, periodicidad, idUsuarioReal);
        }
    } catch (e) {
        console.error("Error en handleGuardar:", e);
    }

    if (exito) {
        Alert.alert("Éxito", `Categoría ${esEdicion ? 'actualizada' : 'creada'} correctamente`, [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    } else {
        Alert.alert("Error", "No se pudo guardar en la base de datos.");
    }
  };

  return (
    <SafeAreaProvider style={estilosGlobales.container}>
      <View style={estilosGlobales.cabecera}>
        <View style={estilosGlobales.tituloContent}>
          <Text style={estilosGlobales.titulo}>Ahorra+ App</Text>
        </View>
        <View style={estilosGlobales.logoContent}>
            <ImageBackground
                source={require('../../assets/LogoAhorraSinFondo.png')}
                style={estilosGlobales.logo}
            />
        </View>
      </View>

      <View style={estilosGlobales.pantallaActualContainer}>
        <Text style={estilosGlobales.textoPantalla}>
            {esEdicion ? 'Editar Categoría' : 'Nueva Categoría'}
        </Text>
      </View>

      <View style={[estilosGlobales.contenidoScreen, { flex: 1 }]}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{nombre || (esEdicion ? '...' : 'Nueva')}</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={nombre}
              onChangeText={setNombre}
              placeholder="Ej. Comida"
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={[styles.input, styles.inputDescripcion]}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              placeholder="Descripción breve..."
            />

            <Text style={styles.label}>Presupuesto:</Text>
            <View style={styles.presupuestoContainer}>
              <Text style={styles.presupuestoSign}>$</Text>
              <TextInput
                style={[styles.input, styles.inputPresupuesto]}
                value={presupuesto}
                onChangeText={setPresupuesto}
                keyboardType="numeric"
                placeholder="00.00"
              />
            </View>

            <View style={styles.periodicidadContainer}>
              {['Semanal', 'Quincenal', 'Mensual'].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.periodoBoton,
                    periodicidad === p && styles.periodoBotonActivo,
                  ]}
                  onPress={() => setPeriodicidad(p)}>
                  <Text
                    style={[
                      styles.periodoTexto,
                      periodicidad === p && styles.periodoTextoActivo,
                    ]}>
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              style={styles.guardarButton}
              onPress={handleGuardar}>
              <Text style={styles.guardarButtonText}>
                  {esEdicion ? 'Actualizar' : 'Guardar'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  logoTexto: { fontSize: 40, textAlign: 'center' },
  titleContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    margin: 15,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCD5E0',
    padding: 12,
    fontSize: 16,
  },
  inputDescripcion: { height: 80, textAlignVertical: 'top' },
  presupuestoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCD5E0',
  },
  presupuestoSign: { fontSize: 16, paddingLeft: 12, color: '#888' },
  inputPresupuesto: { flex: 1, borderWidth: 0, padding: 12 },
  periodicidadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  periodoBoton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F0F4F8',
    borderWidth: 1,
    borderColor: '#CCD5E0',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  periodoBotonActivo: {
    backgroundColor: '#B0C4DE',
    borderColor: '#007BFF',
  },
  periodoTexto: { fontSize: 14, color: '#555' },
  periodoTextoActivo: { fontWeight: 'bold', color: '#007BFF' },
  guardarButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  guardarButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
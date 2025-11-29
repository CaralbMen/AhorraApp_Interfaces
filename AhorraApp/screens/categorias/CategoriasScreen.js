import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import estilosGlobales from './styles/estilosGlobales.js';
import { obtenerCategorias, eliminarCategoria } from '../controllers/FinanceController';

export default function CategoriasScreen({ navigation }) {
  const [categorias, setCategorias] = useState([]);
  const USUARIO_ID = 1;
  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
    }, [])
  );

  const cargarCategorias = async () => {
    const data = await obtenerCategorias(USUARIO_ID);
    setCategorias(data);
  };

  const procesarEliminacion = async (id) => {
    const exito = await eliminarCategoria(id);
    if (exito) {
        cargarCategorias();
    } else {
        Alert.alert("Error", "No se pudo eliminar la categoría");
    }
  };

  const confirmarEliminar = (id, nombre) => {
    if(Platform.OS === 'web'){
       if(window.confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)){
            procesarEliminacion(id);
       }
    } else {
      Alert.alert(
        'Eliminar Categoría',
        `¿Estás seguro de eliminar la categoría "${nombre}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Eliminar', onPress: () => procesarEliminacion(id), style: 'destructive' },
        ]
      );
    }
  };

  return (
    <SafeAreaProvider style={estilosGlobales.container}>
        <View style={estilosGlobales.cabecera}>
            <View style={estilosGlobales.tituloContent}>
                <Text style={estilosGlobales.titulo}>Ahorra+ App</Text>
            </View>
            <View style={estilosGlobales.logoContent}>
                <Text style={[estilosGlobales.logo, styles.logoTexto]}>💲</Text>
            </View>
        </View>
        <View style={estilosGlobales.pantallaActualContainer}>
            <Text style={estilosGlobales.textoPantalla}>Tus Categorías</Text>
        </View>
        
        <View style={[estilosGlobales.contenidoScreen, { flex: 1 }]}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.subTitle}>Total de Categorías: {categorias.length}</Text>
                    {/* Botón para agregar nueva categoría desde aquí también si deseas */}
                    <TouchableOpacity 
                        style={styles.btnAdd} 
                        onPress={() => navigation.navigate('EditarCategoria')}
                    >
                        <Text style={{color: 'white', fontWeight: 'bold'}}>+ Nueva</Text>
                    </TouchableOpacity>
                </View>

                {categorias.map((item) => (
                <View key={item.id} style={styles.categoriaCard}>
                    <View style={styles.cardInfo}>
                        <Text style={styles.cardNombre}>{item.nombre}</Text>
                        <Text style={styles.cardDescripcion}>{item.descripcion}</Text>
                    </View>
                    <View style={styles.cardDetails}>
                        <Text style={styles.cardPresupuesto}>${item.presupuesto}</Text>
                        <Text style={styles.cardPeriodicidad}>{item.periodo}</Text>
                    </View>
                    <View style={styles.cardBotones}>
                        {/* Pasamos el ID y los datos actuales para editar */}
                        <TouchableOpacity onPress={() => navigation.navigate('EditarCategoria', { 
                            id: item.id,
                        })}>
                            <Text style={styles.cardIcon}>✏️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => confirmarEliminar(item.id, item.nombre)}>
                            <Text style={styles.cardIcon}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
            </ScrollView>
        </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  logoTexto: { fontSize: 40, textAlign: 'center' },
  titleContainer: {
    padding: 15,
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnAdd: {
      backgroundColor: '#007BFF',
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 5
  },
  subTitle: { fontSize: 16, color: '#555' },
  categoriaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cardInfo: { flex: 1 },
  cardNombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDescripcion: { fontSize: 14, color: '#777' },
  cardDetails: { alignItems: 'flex-end', marginHorizontal: 10 },
  cardPresupuesto: { fontSize: 16, fontWeight: 'bold', color: '#2E8B57' },
  cardPeriodicidad: { fontSize: 12, color: '#888' },
  cardBotones: { flexDirection: 'row' },
  cardIcon: { fontSize: 22, marginHorizontal: 5 },
});
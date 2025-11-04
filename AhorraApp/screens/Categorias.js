import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import estilosGlobales from './styles/estilosGlobales.js';

const categoriasData = [
  { id: '1', nombre: 'Alimentos', desc: 'Comida en general', presupuesto: '$3,500.00', periodo: 'Semanal' },
  { id: '2', nombre: 'Carro', desc: 'Gasolina, Refacciones', presupuesto: '$3,500.00', periodo: 'Mensual' },
];

const confirmarEliminar = (nombre) => {
  Alert.alert(
    'Eliminar Categoría',
    `¿Estás seguro de eliminar la categoría "${nombre}"?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => console.log('Eliminado'), style: 'destructive' },
    ]
  );
};

export default function CategoriasScreen({ navigation }) {
  return (
    <SafeAreaView style={estilosGlobales.container}>
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
                    <Text style={styles.subTitle}>Total de Categorías: 5</Text>
                </View>
                {categoriasData.map((item) => (
                <View key={item.id} style={styles.categoriaCard}>
                <View style={styles.cardInfo}>
                    <Text style={styles.cardNombre}>{item.nombre}</Text>
                    <Text style={styles.cardDescripcion}>{item.desc}</Text>
                </View>
                <View style={styles.cardDetails}>
                    <Text style={styles.cardPresupuesto}>{item.presupuesto}</Text>
                    <Text style={styles.cardPeriodicidad}>{item.periodo}</Text>
                </View>
                <View style={styles.cardBotones}>
                    <TouchableOpacity onPress={() => navigation.navigate('EditarCategoria')}>
                        <Text style={styles.cardIcon}>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmarEliminar(item.nombre)}>
                        <Text style={styles.cardIcon}>🗑️</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ))}
            </ScrollView>
        </View>

      <View style={estilosGlobales.footer}>
                <ImageBackground
                    source={require('../assets/iconoCategorias.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoHome.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoMas.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoPerfil.png')}
                    style={styles.icono}
                />
            </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoTexto: { fontSize: 40, textAlign: 'center' },
  titleContainer: {
    padding: 15,
    alignItems: 'center',
    margin: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
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
  },
  cardInfo: { flex: 1 },
  cardNombre: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardDescripcion: { fontSize: 14, color: '#777' },
  cardDetails: { alignItems: 'flex-end', marginHorizontal: 10 },
  cardPresupuesto: { fontSize: 16, fontWeight: 'bold', color: '#2E8B57' },
  cardPeriodicidad: { fontSize: 12, color: '#888' },
  cardBotones: { flexDirection: 'row' },
  cardIcon: { fontSize: 22, marginHorizontal: 5 },
  footerIcon: { fontSize: 28 },
});
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, Platform, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import estilosGlobales from '../styles/estilosGlobales.js';
import Ionicons from '@expo/vector-icons/Ionicons';

const categoriasData = [
  { id: '1', nombre: 'Alimentos', desc: 'Comida en general', presupuesto: '$3,500.00', periodo: 'Semanal' },
  { id: '2', nombre: 'Carro', desc: 'Gasolina, Refacciones', presupuesto: '$3,500.00', periodo: 'Mensual' },
];

const confirmarEliminar = (nombre) => {
  if(Platform.OS==='web'){
    window.alert('Estás seguro de eliminar la categoría "${nombre}?')
  }else{
    Alert.alert(
      'Eliminar Categoría',
      `¿Estás seguro de eliminar la categoría "${nombre}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => console.log('Eliminado'), style: 'destructive' },
      ]
    );
  }
};

export default function CategoriasScreen({ navigation }) {
  return (
    <SafeAreaProvider >
      <SafeAreaView style={estilosGlobales.container}>
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
            <Text style={estilosGlobales.textoPantalla}>Tus Categorías</Text>
            <Pressable style={styles.agregarCategoria} onPress={()=>navigation.navigate('CrearCategoriaScreen')}>
              <Ionicons name="add-circle-outline" size={37} color='#8876B8'></Ionicons>
            </Pressable>
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
                    <TouchableOpacity onPress={() => navigation.navigate('EditarCategoriaScreen')}>
                        <Text>✏️</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => confirmarEliminar(item.nombre)}>
                        <Text style={styles.cardIcon}>🗑️</Text>
                    </TouchableOpacity>
                </View>
                </View>
            ))}
            </ScrollView>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  plus:{
    width: '100%',
    height: '100%',
    fontSize: 40,
    textAlign: 'center',
    
  },
  agregarCategoria:{
    width:40,
    height:40,
    // backgroundColor:'#E0EDFF',
    alignSelf:'flex-end',
    marginBottom:4,
    marginRight:10,
    borderRadius: '50%',
    justifyContent:'center',
    alignItems: 'center',
  },
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
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import estilosGlobales from './styles/estilosGlobales';

const movimientosData = [
    {id: '1', desc: 'Depósito', monto: '+ $5,000.00', fecha: 'Feb 31, 2025', tipo: 'ingreso'},
    {id: '2', desc: 'Pago de Renta', monto: '- $3,500.00', fecha: 'Feb 31, 2025', tipo: 'egreso'},
    {id: '3', desc: 'Quincena', monto: '+ $25,600.00', fecha: 'Feb 31, 2025', tipo: 'ingreso'},
    {id: '4', desc: 'Pago Cinemex', monto: '- $349.99', fecha: 'Feb 31, 2025', tipo: 'egreso'},
    {id: '5', desc: 'Pago Oxxo UPQ', monto: '- $48.60', fecha: 'Feb 31, 2025', tipo: 'egreso'},
];

export default function PantallaPrincipal({ navigation }) {
    return (
        <SafeAreaProvider style={estilosGlobales.container}>
            <View style={estilosGlobales.cabecera}>
                <View style={estilosGlobales.tituloContent}>
                    <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                </View>
                <View style={estilosGlobales.logoContent}>
                    <Text style={[estilosGlobales.logo, StyleSheet.logoTexto]}>$</Text>
                </View>
            </View>
            <View style={estilosGlobales.pantallaActualContainer}>
                <Text style={estilosGlobales.textoPantalla}>¡Hola Alberto!</Text>
            </View>
            <View style={[estilosGlobales.contenidoScreen, {flex:1}]}>
                <ScrollView>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.totalDisponible}>Total disponible: 5 Pesos</Text>
                    </View>
                    <Text style={styles.movimientosTitle}>Últimos movimientos</Text>
                    {movimientosData.map((item) => (
                        <View key={item.id} style={styles.itemContainer}>
                            <View>
                                <Text style={styles.itemDescripcion}>{item.desc}</Text>
                                <Text style={styles.itemFecha}>{item.fecha}</Text>
                            </View>
                            <Text style={[styles.itemMonto, item.tipo === 'ingreso' ? styles.ingreso : styles.egreso,]}>
                                {item.monto}
                            </Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.verTodasButton}>
                        <Text style={styles.verTodasText}>Ver todas...</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
  logoTexto: { fontSize: 40, textAlign: 'center' },
  balanceContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    margin: 15,
  },
  totalDisponible: { fontSize: 18, color: '#555', fontWeight: 'bold' },
  movimientosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 15,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  itemDescripcion: { fontSize: 16, color: '#333' },
  itemFecha: { fontSize: 12, color: '#888' },
  itemMonto: { fontSize: 16, fontWeight: 'bold' },
  ingreso: { color: 'green' },
  egreso: { color: 'red' },
  verTodasButton: { padding: 15, alignItems: 'center' },
  verTodasText: { fontSize: 16, color: '#007BFF', fontWeight: 'bold' },
  footerIcon: { fontSize: 28 },
});
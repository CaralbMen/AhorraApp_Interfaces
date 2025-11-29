import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import estilosGlobales from '../styles/estilosGlobales';
import { obtenerUltimosMovimientos, obtenerBalanceTotal } from '../controllers/FinanceController';

export default function PantallaPrincipal({ navigation }) {
    const [movimientos, setMovimientos] = useState([]);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const USUARIO_ID = 1;

    useFocusEffect(
        useCallback(() => {
            cargarDatos();
        }, [])
    );

    const cargarDatos = async () => {
        try {
            const movs = await obtenerUltimosMovimientos(USUARIO_ID);
            const bal = await obtenerBalanceTotal(USUARIO_ID);
            
            setMovimientos(movs);
            setBalance(bal);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#007BFF"/>
            </View>
        );
    }

    return (
        <SafeAreaProvider style={estilosGlobales.container}>
            <View style={estilosGlobales.cabecera}>
                <View style={estilosGlobales.tituloContent}>
                    <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                </View>
                <View style={estilosGlobales.logoContent}>
                    <Text style={[estilosGlobales.logo, styles.logoTexto]}>$</Text>
                </View>
            </View>
            <View style={estilosGlobales.pantallaActualContainer}>
                <Text style={estilosGlobales.textoPantalla}>¡Hola Usuario!</Text>
            </View>
            <View style={[estilosGlobales.contenidoScreen, {flex:1}]}>
                <ScrollView>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.totalDisponible}>Total disponible: ${balance}</Text>
                    </View>
                    <Text style={styles.movimientosTitle}>Últimos movimientos</Text>
                    
                    {movimientos.length === 0 ? (
                        <Text style={{textAlign: 'center', marginTop: 20, color: '#888'}}>No hay movimientos recientes.</Text>
                    ) : (
                        movimientos.map((item) => (
                            <Pressable key={item.id} style={styles.itemContainer} onPress={()=> navigation.navigate('DetalleDeMovimiento', { id: item.id })}>
                                <View>
                                    <Text style={styles.itemDescripcion}>{item.descripcion}</Text>
                                    <Text style={styles.itemFecha}>{item.fecha}</Text>
                                    <Text style={{fontSize: 10, color: '#aaa'}}>{item.categoria}</Text>
                                </View>
                                <Text style={[
                                    styles.itemMonto, 
                                    (item.tipo === 'ingreso' || item.tipo === 'Depósito') ? styles.ingreso : styles.egreso
                                ]}>
                                    {(item.tipo === 'ingreso' || item.tipo === 'Depósito') ? '+' : '-'} ${item.monto}
                                </Text>
                            </Pressable>
                        ))
                    )}

                    <TouchableOpacity style={styles.verTodasButton} onPress={()=>navigation.navigate('Transacciones')}>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
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
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF' 
  },
  itemDescripcion: { fontSize: 16, color: '#333', fontWeight: '500' },
  itemFecha: { fontSize: 12, color: '#888' },
  itemMonto: { fontSize: 16, fontWeight: 'bold' },
  ingreso: { color: 'green' },
  egreso: { color: 'red' },
  verTodasButton: { padding: 15, alignItems: 'center' },
  verTodasText: { fontSize: 16, color: '#007BFF', fontWeight: 'bold' },
});
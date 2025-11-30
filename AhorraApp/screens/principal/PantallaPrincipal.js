import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import estilosGlobales from '../styles/estilosGlobales';
import {obtenerMovimientosPorUsuario} from '../../controllers/movimientoController';
import { obtenerBalanceTotal } from '../../controllers/categoriasController';
import { useAuth } from '../../context/AuthContext';
export default function PantallaPrincipal({ navigation }) {
    const { user } = useAuth();
    const [movimientosData, setMovimientosData]=React.useState([]);
    const [balance, setBalance] = React.useState(0);

    useEffect(()=>{
        async function cargarDatos(){
            if(user){
                console.log('PantallaPrincipal - Cargando movimientos para usuario ID:', user.id_usuario);
                const datos= await obtenerMovimientosPorUsuario(user.id_usuario);
                console.log('PantallaPrincipal - Movimientos cargados:', datos);
                setMovimientosData(datos);
                try{
                  const b = await obtenerBalanceTotal(user.id_usuario);
                  setBalance(b || 0);
                }catch(e){
                  console.error('No se pudo obtener balance:', e);
                }
            }
        }
        cargarDatos();
    },[user]);
    return (
        <SafeAreaProvider style={estilosGlobales.container}>
            <View style={estilosGlobales.cabecera}>
                <View style={estilosGlobales.tituloContent}>
                    <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                </View>
                <View style={estilosGlobales.logoContent}>
                    <ImageBackground
                        source={require('../../assets/LogoAhorraSinFondo.png')}
                        style={estilosGlobales.logo}
                    />
                </View>
            </View>

            <View style={estilosGlobales.pantallaActualContainer}>
                <Text style={estilosGlobales.textoPantalla}>¡Hola {user?.nombre}!</Text>
            </View>
            
            <View style={[estilosGlobales.contenidoScreen, {flex:1}]}>
                <ScrollView>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.totalDisponible}>Total disponible: ${balance}</Text>
                    </View>
                    
                    <Text style={styles.movimientosTitle}>Últimos movimientos</Text>

                    {movimientosData.slice(0, 5).map((item) => (
                        <Pressable key={item.id} style={styles.itemContainer} onPress={()=> navigation.navigate('DetalleDeMovimiento', { movimiento: item })}>
                            <View>
                                <Text style={styles.itemDescripcion}>{item.descripcion}</Text>
                                <Text style={styles.itemFecha}>{item.fecha}</Text>
                            </View>
                            <Text style={[styles.itemMonto, (item.tipo === 'ingreso' || item.tipo === 'Depósito') ? styles.ingreso : styles.egreso,]}>
                                {item.monto}
                            </Text>
                        </Pressable>
                    ))}
                    
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
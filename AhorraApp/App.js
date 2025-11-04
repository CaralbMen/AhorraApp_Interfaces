import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Transacciones from './screens/Transacciones';
import Login from './screens/Login';
import PantallaPrincipal from './screens/PantallaPrincipal';
import Egresoss from './screens/EgresosScreen';
import Categorias from './screens/Categorias';
import EditarCategoria from './screens/EditarCategoria';

export default function App() {
  return <Login/>
  // return <Egresoss></Egresoss>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

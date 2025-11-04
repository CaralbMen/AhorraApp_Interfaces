import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useSate} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Transacciones from './screens/Transacciones';
import Login from './screens/Login';
import PantallaPrincipal from './screens/PantallaPrincipal';

export default function App() {
  return <Login/>
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

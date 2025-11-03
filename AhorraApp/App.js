import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useSate} from 'react'
import Transacciones from './screens/Transacciones';
import Login from './screens/Login';

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

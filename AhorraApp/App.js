// //Importacion de componentes
// import { StyleSheet, View, Button, Text } from 'react-native';
// import React, {useState} from 'react'

// //Importacion de componenetes para el navigation
// import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {Ionicons} from '@expo/vector-icons';

// //Importacion de las pantallas para usarlas en el menucito de abajo
// import CategoriasScreen from './screens/CategoriasScreen';
// import DetalleDeMovimientoScreen from './screens/DetalleDeMovimiento';
// import EditarCategoriaScreen from './screens/EditarCategoriaScreen';
// import EgresosScreen from './screens/EgresosScreen';
// import IngresosScreen from './screens/IngresosScreen';
// import Login from './screens/Login';
// import PantallaPrincipal from './screens/PantallaPrincipal';
// import RecuperacionScreen from './screens/Recuperacion';
// import RegistroScreen from './screens/Registro';
// import ActualizarInfoScreen from './screens/ActualizarInfoScreen';
// import Transacciones from './screens/Transacciones';

// //Creamos el cosito para la barra de hasta abajo
// const Menucito= createBottomTabNavigator();
import Login from "./screens/Login"
import React, { useEffect } from 'react';
import { iniciarBaseDeDatos } from './database/db';

//Function principal
export default function App() {
  useEffect(() => {
    (async () => { try { await iniciarBaseDeDatos(); } catch(e){ console.warn(e); } })();
  }, []);
  return <Login/>
}

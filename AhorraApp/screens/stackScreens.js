//Importacion de componentes
import { StyleSheet, View, Button, Text } from 'react-native';
import React, {useState} from 'react'

//Importacion de componenetes para el navigation
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

//Importacion de las pantallas para usarlas en el menucito de abajo
import CategoriasScreen from './CategoriasScreen';
import DetalleDeMovimientoScreen from './DetalleDeMovimiento';
import EditarCategoriaScreen from './EditarCategoriaScreen';
import EgresosScreen from './EgresosScreen';
import IngresosScreen from './IngresosScreen';
import Login from './Login';
import PantallaPrincipal from './PantallaPrincipal';
import RecuperacionScreen from './Recuperacion';
import RegistroScreen from './Registro';
import ActualizarInfoScreen from './ActualizarInfoScreen';
import Transacciones from './Transacciones';

//Creamos el cosito para la barra de hasta abajo
const Menucito= createBottomTabNavigator();

//Function principal
export default function StackScreens() {
  return(
    <NavigationContainer>
      <Menucito.Navigator
        initialRouteName="Principal"
        screenOptions={({route})=>({
          headerShown: false,
          tabBarIcon:({color, size})=>{
            let nombreIcono;
            if(route.name==='Principal'){
              nombreIcono='home';
            }else if(route.name==='Categorias'){
              nombreIcono='list';
            }else if(route.name=='Agregar'){
              nombreIcono='add-circle';
            }else{
              nombreIcono='person'
            }
            return <Ionicons name={nombreIcono} size={size} color={color}/>
          },
          tabBarActiveTintColor: '#007BFF',
          tabBarInctiveTintColor: '#9c36d2ff',
          tabBarStyle:{
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Menucito.Screen name={"Principal"} component={PantallaPrincipal}/>
        <Menucito.Screen name={'Categorias'} component={CategoriasScreen}/>
        <Menucito.Screen name={'Agregar'} component={EditarCategoriaScreen}/>
        <Menucito.Screen name={'Perfil'} component={ActualizarInfoScreen}/>
      </Menucito.Navigator>
    </NavigationContainer>
  );

    
}

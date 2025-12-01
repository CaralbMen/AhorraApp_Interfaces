//Importacion de componentes
import { StyleSheet, View, Button, Text } from 'react-native';
import React, {useState} from 'react'

//Importacion de componenetes para el navigation
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

//Importacion de las pantallas para usarlas en el menucito de abajo
import CategoriasScreen from './categorias/CategoriasScreen';
import EgresosScreen from './EgresosScreen';
import IngresosScreen from './IngresosScreen';
import Login from './Login';
import stackPrincipal from './principal/stackPrincipal';
import stackCategorias from './categorias/stackCategorias';
import RecuperacionScreen from './Recuperacion';
import RegistroScreen from './Registro';
import ActualizarInfoScreen from './ActualizarInfoScreen';

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
          tabBarActiveTintColor: '#463774ff',
          tabBarInactiveTintColor: '#8876B8',
          tabBarStyle:{
            paddingBottom: 5,
            height: 60,
            backgroundColor: '#eaf8fbff',
            borderColor:'#eaf8fbff',
          },
        })}
      >
        <Menucito.Screen name={"Principal"} component={stackPrincipal}
          options={({route})=>{
            const nombreRuta= getFocusedRouteNameFromRoute(route)??'Principal';
            const ocultar=['Transacciones', 'DetalleDeMovimiento', 'Graficas'];
            return{
              tabBarStyle: ocultar.includes(nombreRuta)?{
                display:'none'}:
                { 
                    paddingBottom: 5,
                    height: 60,
                    backgroundColor: '#eaf8fbff',
                    borderColor:'#eaf8fbff',
                }
              };
            
          }}
        />
        <Menucito.Screen name={'Categorias'} component={stackCategorias}/>
        <Menucito.Screen name={'Agregar'} component={IngresosScreen}/>
        <Menucito.Screen name={'Perfil'} component={ActualizarInfoScreen}/>
      </Menucito.Navigator>
    </NavigationContainer>
  );
}

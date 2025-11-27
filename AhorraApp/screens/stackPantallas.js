//Importacion de componentes
import { StyleSheet, View, Button, Text } from 'react-native';
import React, {useState} from 'react'

//Importacion de componenetes para el navigation
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

//Importacion de las pantallas para usarlas en el menucito de abajo
import CategoriasScreen from './screens/CategoriasScreen';
import DetalleDeMovimientoScreen from './screens/DetalleDeMovimiento';
import EditarCategoriaScreen from './screens/EditarCategoriaScreen';
import EgresosScreen from './screens/EgresosScreen';
import IngresosScreen from './screens/IngresosScreen';
import Login from './screens/Login';
import PantallaPrincipal from './screens/PantallaPrincipal';
import RecuperacionScreen from './screens/Recuperacion';
import RegistroScreen from './screens/Registro';
import ActualizarInfoScreen from './screens/ActualizarInfoScreen';
import Transacciones from './screens/Transacciones';

//Creamos el cosito para la barra de hasta abajo
const Menucito= createBottomTabNavigator();

//Function principal
export default function App() {
  //No eliminamos nada de lo que habia por cualquier cosa, solo lo comentamos y reducimos para que no estorbe
  // const [pantalla, setPantalla]= useState('main');
  // switch(pantalla){
  //   case 'Categorias':
  //     return <CategoriasScreen/>
  //   case 'DetalleMovimiento':
  //     return <DetalleDeMovimientoScreen/>
  //   case 'EditarCategorias':
  //     return <EditarCategoriaScreen/>
  //   case 'Egresos':
  //     return <EgresosScreen/>
  //   case 'Ingresos':
  //     return <IngresosScreen/>
  //   case 'Login':
  //     return <Login/>
  //   case 'PantallaPrincipal':
  //     return <PantallaPrincipal/>
  //   case 'Recuperacion':
  //     return <RecuperacionScreen/>
  //   case 'Registro':
  //     return <RegistroScreen/>
  //   case 'Transacciones':
  //     return <Transacciones/>
  //   case 'ActualizarInfo':
  //     return <ActualizarInfoScreen/>
  //   case 'main':
  //     default:
  //       return(
  //         <View style={styles.container}>
  //           <View>
  //             <Button title='Categorias' onPress={()=>setPantalla('Categorias')}/>
  //             <Button title='Detalle de Movimiento' onPress={()=>setPantalla('DetalleMovimiento')}/>
  //             <Button title='Editar Categorias' onPress={()=>setPantalla('EditarCategorias')}/>
  //             <Button title='Egresos' onPress={()=>setPantalla('Egresos')}/>
  //             <Button title='Ingresos' onPress={()=>setPantalla('Ingresos')}/>
  //             <Button title='Login' onPress={()=>setPantalla('Login')}/>
  //             <Button title='Pantalla Principal' onPress={()=>setPantalla('PantallaPrincipal')}/>
  //             <Button title='Recuperacion' onPress={()=>setPantalla('Recuperacion')}/>
  //             <Button title='Registro' onPress={()=>setPantalla('Registro')}/>
  //             <Button title='Transacciones' onPress={()=>setPantalla('Transacciones')}/>
  //             <Button title='Actualizar Info' onPress={()=>setPantalla('ActualizarInfo')}/>
  //           </View>
  //         </View>
  //       )
  // }
  // Chambeamos a partir de aqui
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
          tabBarActivateTintColor: '#007BFF',
          tabBarInctivateTintColor: '#9c36d2ff',
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

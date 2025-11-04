import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriasScreen from './screens/Categorias';
import DetalleDeMovimientoScreen from './screens/DetalleDeMovimiento';
import EditarCategoriaScreen from './screens/EditarCategoria';
import EgresosScreen from './screens/EgresosScreen';
import IngresosScreen from './screens/IngresosScreen';
import Login from './screens/Login';
import PantallaPrincipal from './screens/PantallaPrincipal';
import RecuperacionScreen from './screens/Recuperacion';
import RegistroScreen from './screens/Registro';
import Transacciones from './screens/Transacciones';


export default function App() {
  const[pantalla, setPantalla]= useState('main');
  
    switch(pantalla){
      case 'Categorias':
        return <CategoriasScreen/>
      case 'DetalleMovimiento':
        return <DetalleDeMovimientoScreen/>
      case 'EditarCategorias':
        return <EditarCategoriaScreen/>
      case 'Egresos':
        return <EgresosScreen/>
      case 'Ingresos':
        return <IngresosScreen/>
      case 'Login':
        return <Login/>
      case 'PantallaPrincipal':
        return <PantallaPrincipal/>
      case 'Recuperacion':
        return <RecuperacionScreen/>
      case 'Registro':
        return <RegistroScreen/>
      case 'Transacciones':
        return <Transacciones/>
      case 'main':
        default:
          return(
            <View style={styles.container}>
              <View>
                <Button title='Categorias' onPress={()=>setPantalla('Categorias')}/>
                <Button title='Detalle de Movimiento' onPress={()=>setPantalla('DetalleMovimiento')}/>
                <Button title='Editar Categorias' onPress={()=>setPantalla('EditarCategorias')}/>
                <Button title='Egresos' onPress={()=>setPantalla('Egresos')}/>
                <Button title='Ingresos' onPress={()=>setPantalla('Ingresos')}/>
                <Button title='Login' onPress={()=>setPantalla('Login')}/>
                <Button title='Pantalla Principal' onPress={()=>setPantalla('PantallaPrincipal')}/>
                <Button title='Recuperacion' onPress={()=>setPantalla('Recuperacion')}/>
                <Button title='Registro' onPress={()=>setPantalla('Registro')}/>
                <Button title='Transacciones' onPress={()=>setPantalla('Transacciones')}/>

              </View>
            </View>
          )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

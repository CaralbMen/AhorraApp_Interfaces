import {createNativeStackNavigator, getFocusedRouteNameFromRoute} from '@react-navigation/native-stack';
import PantallaPrincipal from './PantallaPrincipal';
import DetalleDeMovimiento from './DetalleDeMovimiento';
import Transacciones from './Transacciones';
import Graficas from './graficas';
const Stack= createNativeStackNavigator();

export default function stackPrincipal(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name='PantallaPrincipal'
                component={PantallaPrincipal}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Transacciones'
                component={Transacciones}
                options={{
                   headerTitle: '',
                   headerBackTitleVisible: false,
                   headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='DetalleDeMovimiento'
                component={DetalleDeMovimiento}
                options={{
                   headerTitle: '',
                   headerBackTitleVisible: false,
                   headerTransparent: true,
                }}
            />
            <Stack.Screen
                name='Graficas'
                component={Graficas}
                options={{
                    headerTitle:'',
                    headerTransparent: true,
                    headerBackTitleVisible:false,
                }}
                
            />
        </Stack.Navigator>
    )
}
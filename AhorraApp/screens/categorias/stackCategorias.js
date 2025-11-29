import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriasScreen from "./CategoriasScreen";
import EditarCategoriaScreen from "./EditarCategoriaScreen";
import CrearCategoriaScreen from "./crearCategoriaScreen";

const Stack= createNativeStackNavigator();
export default function stackCategorias(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="CategoriasScreen"
                component={CategoriasScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name ="EditarCategoriaScreen"
                component={EditarCategoriaScreen}
                options={{
                    headerTitle:'',
                    headerBackTitleVisible:false,
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name ="CrearCategoriaScreen"
                component={CrearCategoriaScreen}
                options={{
                    headerTitle:'',
                    headerBackTitleVisible:false,
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    )
}
import { Text, StyleSheet, View, Button, TextInput, TouchableOpacity } from 'react-native'

export default function IngresosScreen() {
    const [tipo, setTipo] = useState("ingreso");
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    return (
      <View>
        <Text>Ahorra+ App</Text>
        <View>
            <TouchableOpacity>
                <Text>Ingreso</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Egreso</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text>
                Nombre Movimiento
            </Text>
            <TextInput
            
            />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({})
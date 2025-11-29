import { Text, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { useAuth } from '../context/AuthContext';

export default function EgresosScreen() {
    const [tipo, setTipo] = useState("Egreso");
    const [nombre, setNombre] = useState("");
    const [categoria, setCategoria] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const { user } = useAuth();

    const onConfirm = () => {
      if (!nombre.trim() || !cantidad) {
        alert('Completa nombre y cantidad');
        return;
      }
      const movimiento = {
        tipo: tipo === 'ingreso' ? 'ingreso' : 'egreso',
        nombre,
        categoria,
        cantidad: Number(cantidad) || 0,
        descripcion,
        fecha: new Date().toISOString(),
      };
        (async () => {
          try {
            const { agregarMovimiento } = await import('../controllers/movimientoController');
            const usuario_id = user?.id_usuario || 1;
          const ok = await agregarMovimiento({
            descripcion: movimiento.nombre || movimiento.descripcion,
            monto: movimiento.cantidad,
            fecha: movimiento.fecha,
            tipo: movimiento.tipo,
            categoria_id: 1,
            usuario_id,
          });
          if (ok) alert('Movimiento guardado en la BD');
          else alert('Error al guardar movimiento');
        } catch (e) {
          console.error(e);
          alert('Error al guardar movimiento (ver consola)');
        }
      })();
    };

    return (
      <View style={styles.container}>
              <Text style={styles.titulo}>Ahorra+ App</Text>
              <View style={styles.selector}>
                  <TouchableOpacity style={[
                  styles.tab,
                  tipo === "ingreso" && { borderBottomColor: "green" },
                ]}
                onPress={() => setTipo("ingreso")}>
                      <Text style={[
                    styles.tabText,
                    { color: tipo === "ingreso" ? "green" : "gray" },
                  ]}>Ingreso</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[
                  styles.tab,
                  tipo === "egreso" && { borderBottomColor: "red"},
                  ]}
                onPress={() => setTipo("egreso")}>
                      <Text style={[
                    styles.tabText,
                    { color: tipo === "egreso" ? "red" : "gray" },
                      ]}>Egreso</Text>
                  </TouchableOpacity>
              </View>
      
              <View style={styles.form}>
                  <Text style={[
                  styles.label,
                  { color: tipo === "ingreso" ? "green" : "red" },
                ]}>
                      Nombre Movimiento
                  </Text>
                  <TextInput
                  style={[
                  styles.input,
                  { borderColor: tipo === "ingreso" ? "green" : "red" },
                  ]}
                  value={nombre}
                  onChangeText={setNombre}
                  />
                  <Text style={[
                  styles.label,
                  { color: tipo === "ingreso" ? "green" : "red" },
                ]}>Categoria</Text>
                  <TextInput
                  style={[
                  styles.input,
                  { borderColor: tipo === "ingreso" ? "green" : "red" },
                ]}
                  value={categoria}
                  onChangeText={setCategoria}/>
                  <Text style={[
                  styles.label,
                  { color: tipo === "ingreso" ? "green" : "red" },
                ]}>Cantidad</Text>
                  <TextInput
                  style={[
                  styles.input,
                  { borderColor: tipo === "ingreso" ? "green" : "red" },
                  ]}
                  keyboardType="numeric"
                  value={cantidad}
                  onChangeText={setCantidad}/>
                  <Text style={[
                  styles.label,
                  { color: tipo === "ingreso" ? "green" : "red" },
                ]}>Descripcion</Text>
                  <TextInput
                   style={[
                  styles.input,
                  { borderColor: tipo === "ingreso" ? "green" : "red" },
                ]}
                  value={descripcion}
                  onChangeText={setDescripcion}/>
      
                    <TouchableOpacity style={styles.btn} onPress={onConfirm}>
                      <Text style={styles.btnText}>Confirmar</Text>
                    </TouchableOpacity>
              </View>
            </View>
    )
}

const styles = StyleSheet.create({
     container: {
    flex: 1,
    backgroundColor: "#E6EEF8",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "#f4f7fb",
    padding: 15,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "white",
  },
  btn: {
    marginTop: 25,
    backgroundColor: "#2f80ed",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
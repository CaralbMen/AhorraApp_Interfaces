import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import estilosGlobales from '../styles/estilosGlobales'
import { editarMovimiento, eliminarMovimiento } from '../../controllers/movimientoController'
import { obtenerCategorias } from '../../controllers/categoriasController'
import { useAuth } from '../../context/AuthContext'

export default function DetalleDeMovimiento({ navigation, route }) {
    const { user } = useAuth()
    const movimiento = route?.params?.movimiento
    const [editar, seteditar] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
    
    const [formData, setFormData] = useState({
        descripcion: movimiento?.descripcion || '',
        monto: String(movimiento?.monto || ''),
        fecha: movimiento?.fecha || '',
        tipo: movimiento?.tipo || '',
        categoria_id: movimiento?.categoria_id || '',
        categoria_nombre: movimiento?.categoria_nombre || ''
    })

    useEffect(() => {
        if (user) {
            loadCategorias()
        }
    }, [user])

    const loadCategorias = async () => {
        try {
            const cats = await obtenerCategorias(user.id_usuario)
            setCategorias(cats || [])
        } catch (e) {
            console.error('Error cargando categorías:', e)
        }
    }

    const handleSave = async () => {
        if (!formData.descripcion || !formData.monto || !formData.fecha || !formData.tipo || !formData.categoria_id) {
            Alert.alert('Error', 'Completa todos los campos')
            return
        }

        const success = await editarMovimiento(movimiento.id, {
            descripcion: formData.descripcion,
            monto: parseFloat(formData.monto),
            fecha: formData.fecha,
            tipo: formData.tipo,
            categoria_id: formData.categoria_id
        })

        if (success) {
            Alert.alert('Éxito', 'Movimiento actualizado correctamente')
            seteditar(false)
            navigation.goBack()
        } else {
            Alert.alert('Error', 'No se pudo actualizar el movimiento')
        }
    }

    const handleDelete = () => {
        Alert.alert(
            'Eliminar movimiento',
            '¿Estás seguro de que deseas eliminar este movimiento?',
            [
                { text: 'Cancelar', onPress: () => {} },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const success = await eliminarMovimiento(movimiento.id)
                        if (success) {
                            Alert.alert('Éxito', 'Movimiento eliminado correctamente')
                            navigation.goBack()
                        } else {
                            Alert.alert('Error', 'No se pudo eliminar el movimiento')
                        }
                    }
                }
            ]
        )
    }

    const selectedCategoryName = categorias.find(c => String(c.id) === String(formData.categoria_id))?.nombre || formData.categoria_nombre

    if (!movimiento) {
        return (
            <View style={estilosGlobales.container}>
                <View style={estilosGlobales.cabecera}>
                    <View style={estilosGlobales.tituloContent}>
                        <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                    </View>
                    <View style={estilosGlobales.logoContent}>
                        <ImageBackground
                            source={require('../../assets/LogoAhorraSinFondo.png')}
                            style={estilosGlobales.logo}
                        />
                    </View>
                </View>
                <Text style={{ marginTop: 20, textAlign: 'center' }}>No hay datos disponibles</Text>
            </View>
        )
    }

    return (
        <View style={estilosGlobales.container}>
            <View style={estilosGlobales.cabecera}>
                <View style={estilosGlobales.tituloContent}>
                    <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                </View>
                <View style={estilosGlobales.logoContent}>
                    <ImageBackground
                        source={require('../../assets/LogoAhorraSinFondo.png')}
                        style={estilosGlobales.logo}
                    />
                </View>
            </View>

            <View style={estilosGlobales.pantallaActualContainer}>
                <Text style={estilosGlobales.textoPantalla}>{editar ? 'Editar movimiento' : 'Detalle del movimiento'}</Text>
            </View>

            <ScrollView style={[estilosGlobales.contenidoScreen, { paddingVertical: 16 }]} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={styles.categoriaContainer}>
                    <Text style={styles.categoriaLabel}>Categoría: </Text>
                    <Text style={styles.nombreCategora}>{selectedCategoryName}</Text>
                </View>

                <View style={styles.contenedorInfo}>
                    <View style={styles.contenedorClaro}>
                        <View style={styles.contentFecha}>
                            <Text style={styles.fecha}>{formData.fecha}</Text>
                        </View>

                        <Text style={styles.label}>Descripción:</Text>
                        {editar ? (
                            <TextInput
                                style={styles.inputMultiline}
                                multiline
                                numberOfLines={4}
                                value={formData.descripcion}
                                onChangeText={(text) => setFormData({ ...formData, descripcion: text })}
                                editable={editar}
                            />
                        ) : (
                            <View style={styles.descripcionHoja}>
                                <Text style={styles.renglon}>{formData.descripcion}</Text>
                            </View>
                        )}

                        <Text style={styles.label}>Monto:</Text>
                        {editar ? (
                            <TextInput
                                style={styles.inputText}
                                keyboardType="decimal-pad"
                                value={formData.monto}
                                onChangeText={(text) => setFormData({ ...formData, monto: text })}
                            />
                        ) : (
                            <Text style={styles.montoText}>${formData.monto}</Text>
                        )}

                        <Text style={styles.label}>Fecha:</Text>
                        {editar ? (
                            <TextInput
                                style={styles.inputText}
                                placeholder="YYYY-MM-DD"
                                value={formData.fecha}
                                onChangeText={(text) => setFormData({ ...formData, fecha: text })}
                            />
                        ) : (
                            <Text style={styles.montoText}>{formData.fecha}</Text>
                        )}

                        <Text style={styles.label}>Tipo:</Text>
                        {editar ? (
                            <View style={styles.tipoContainer}>
                                <TouchableOpacity
                                    style={[styles.tipoButton, formData.tipo === 'ingreso' && styles.tipoButtonActive]}
                                    onPress={() => setFormData({ ...formData, tipo: 'ingreso' })}
                                >
                                    <Text style={[styles.tipoText, formData.tipo === 'ingreso' && styles.tipoTextActive]}>Ingreso</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.tipoButton, formData.tipo === 'egreso' && styles.tipoButtonActive]}
                                    onPress={() => setFormData({ ...formData, tipo: 'egreso' })}
                                >
                                    <Text style={[styles.tipoText, formData.tipo === 'egreso' && styles.tipoTextActive]}>Egreso</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <Text style={[styles.montoText, formData.tipo === 'ingreso' ? { color: '#169b16' } : { color: '#c0392b' }]}>
                                {formData.tipo.charAt(0).toUpperCase() + formData.tipo.slice(1)}
                            </Text>
                        )}

                        <Text style={styles.label}>Categoría:</Text>
                        {editar ? (
                            <View>
                                <TouchableOpacity style={styles.categorySelect} onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                                    <Text style={styles.categorySelectText}>{selectedCategoryName || 'Seleccionar categoría'}</Text>
                                </TouchableOpacity>
                                {showCategoryDropdown && (
                                    <View style={styles.dropdown}>
                                        {categorias.map(cat => (
                                            <TouchableOpacity
                                                key={cat.id}
                                                style={styles.dropdownItem}
                                                onPress={() => {
                                                    setFormData({ ...formData, categoria_id: cat.id, categoria_nombre: cat.nombre })
                                                    setShowCategoryDropdown(false)
                                                }}
                                            >
                                                <Text>{cat.nombre}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ) : (
                            <Text style={styles.montoText}>{selectedCategoryName}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.botonesContainer}>
                    {!editar ? (
                        <>
                            <TouchableOpacity style={styles.editButton} onPress={() => seteditar(true)}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            <TouchableOpacity style={styles.editButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Guardar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => seteditar(false)}>
                                <Text style={styles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}
const styles= StyleSheet.create({
    icono:{
        width: 35,
        height: 35,
    },
    categoriaContainer:{
        width:'90%',
        backgroundColor: '#C0D5F2',
        flexDirection:'row',
        paddingTop:15,
        marginHorizontal: '5%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    categoriaLabel:{
        fontSize: 20,
        padding:10,
        paddingLeft: 20,
    },
    nombreCategora:{
        fontSize:20,
        padding:10,
        paddingLeft:0,
        fontWeight:700,
        color:'#8876B8',
    },
    contenedorInfo:{
        width:'90%',
        backgroundColor:'#C0D5F2',
        padding:20,
        paddingLeft:10,
        paddingRight:10,
        marginHorizontal: '5%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    contenedorClaro:{
        width:'95%',
        backgroundColor:'#eaf8fbff',
        alignSelf:'center',
        borderRadius:10,
        paddingLeft:10,
        paddingTop:15,
        paddingBottom:20,
        paddingHorizontal: 12
    },
    contentFecha:{
        width:'100%',
        paddingRight:20,
        paddingTop:5,
        marginBottom: 16
    },
    fecha:{
        color:'gray',
        fontSize:13,
        alignSelf: 'flex-end',
    },
    label:{
        fontSize: 16,
        fontWeight: '600',
        marginTop: 14,
        marginBottom: 6,
        color: '#333'
    },
    descripcionHoja:{
        backgroundColor:'#C0D5F2',
        width:'100%',
        alignSelf:'center',
        borderRadius:8,
        padding:10,
        marginBottom:12,
    },
     montoText:{
        fontSize:16,
        marginBottom:12,
        color: '#333',
        fontWeight: '500',
        backgroundColor:'#C0D5F2',
        borderRadius: 12,
        padding: 5,
    },
    renglon:{
        height:22,
        borderBottomWidth:1,
        borderBottomColor:'#eaf8fbff',
        color:'gray',
        fontSize: 14
    },
    inputMultiline:{
        backgroundColor:'white',
        width:'100%',
        alignSelf:'center',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#E0EDFF',
        padding:10,
        marginBottom:12,
        minHeight: 80,
        color: '#333',
        textAlignVertical: 'top'
    },
    inputText:{
        backgroundColor:'white',
        width:'100%',
        alignSelf:'center',
        borderRadius:8,
        borderWidth:1,
        borderColor:'#E0EDFF',
        padding:10,
        marginBottom:12,
        color: '#333'
    },
   
    tipoContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:12,
        width:'100%',
        alignSelf:'center'
    },
    tipoButton:{
        flex:0.45,
        backgroundColor:'#E0EDFF',
        paddingVertical:10,
        borderRadius:8,
        alignItems:'center',
        borderWidth:2,
        borderColor:'#E0EDFF'
    },
    tipoButtonActive:{
        backgroundColor:'#C0D5F2',
        borderColor:'#007BFF'
    },
    tipoText:{
        color:'#333',
        fontWeight: '500'
    },
    tipoTextActive:{
        color:'#007BFF',
        fontWeight:'bold'
    },
    categorySelect:{
        backgroundColor:'white',
        padding:10,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#E0EDFF',
        marginBottom:6
    },
    categorySelectText:{
        color:'#333',
        fontSize: 14
    },
    dropdown:{
        backgroundColor:'white',
        marginBottom:12,
        borderRadius:6,
        borderWidth:1,
        borderColor:'#E0EDFF',
        maxHeight:150
    },
    dropdownItem:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#F0F0F0'
    },
    botonesContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        marginHorizontal:'5%',
        paddingBottom:30
    },
    editButton:{
        flex:0.45,
        backgroundColor:'#007BFF',
        paddingVertical:12,
        borderRadius:8,
        alignItems:'center'
    },
    deleteButton:{
        flex:0.45,
        backgroundColor:'#c0392b',
        paddingVertical:12,
        borderRadius:8,
        alignItems:'center'
    },
    cancelButton:{
        flex:0.45,
        backgroundColor:'#cccccc',
        paddingVertical:12,
        borderRadius:8,
        alignItems:'center'
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:14
    }
})
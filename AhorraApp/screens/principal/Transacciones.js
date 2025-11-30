import { Button, Text, View, ImageBackground, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native'
import estilosGlobales from '../styles/estilosGlobales';
import React, {useEffect} from 'react';
import { useAuth } from '../../context/AuthContext';
import {obtenerMovimientosPorUsuario} from '../../controllers/movimientoController';
export default function Transacciones({navigation}){
    const { user } = useAuth();
    const [movimientosData, setMovimientosData]=React.useState([]);
    useEffect(()=>{
        async function cargarMovimientos(){
            if(user){
                console.log('Cargando movimientos para el usuario ID:', user.id_usuario);
                const datos= await obtenerMovimientosPorUsuario(user.id_usuario);
                console.log('Movimientos cargados:', datos);  
                setMovimientosData(datos);
            }
        }
        cargarMovimientos();
    },[user]);
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

            <ScrollView 
                style={styles.sroll}
                contentContainerStyle={styles.contenido}
            >
                <View style={estilosGlobales.pantallaActualContainer}>
                    <Text style={estilosGlobales.textoPantalla}>Tus Movimientos</Text>
                </View>
                <ScrollView style={estilosGlobales.contenidoScreen}>
                    <View style={styles.contentInput}>
                        <TextInput
                            style={styles.input}
                            placeholder='  Buscar'
                        
                        />
                    </View>
                    <View style={styles.filtro}>
                        <Text style={styles.texto}>Filtrar por </Text>
                        <TextInput
                            placeholder='Categoria'
                            style={styles.inputCategoria}
                        />
                    </View>
                    <View style={styles.contentMovimientos}>
                        <ScrollView
                            style={styles.movimientos}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"

                        >
                            {movimientosData.map((item)=>(
                                <Pressable key={item.id} style={styles.movimiento} onPress={()=>navigation.navigate('DetalleDeMovimiento')}>
                                    <View style={styles.descripcionMovimiento}>
                                        <Text style={[styles.fecha, styles.texto]}>{item.fecha}</Text>
                                        <Text>{item.tipo}</Text>
                                    </View>
                                    <View style={styles.cantidadesMovimiento}>
                                        <Text style={[styles.cantidadGasto, styles.categoriaGasto, item.tipo==='ingreso'? {color: '#4CAA1D'} : {color: '#D13434'}]}>
                                            {item.tipo==='ingreso' ? '+' : '-'}$
                                            {item.monto}
                                        </Text>
                                        <Text style={[styles.texto]}>
                                            {item.categoria_nombre || 'Sin categoría'}
                                        </Text>
                                    </View>
                                    <ImageBackground
                                        source={require('../../assets/iconoTresPuntos.png')}
                                        style={styles.tresPuntos}
                                        resizeMode='contain'
                                    />
                                </Pressable>
                            ))}
                            {/* <Pressable style={styles.movimiento} onPress={()=>navigation.navigate('DetalleDeMovimiento')}>
                                <View style={styles.descripcionMovimiento}>
                                    <Text style={[styles.fecha, styles.texto]}>Marzo 1, 20256</Text>
                                    <Text>Depósito</Text>
                                </View>
                                <View style={styles.cantidadesMovimiento}>
                                    <Text style={styles.cantidadGasto}>
                                        +$5,000.00
                                    </Text>
                                    <Text style={[styles.texto, styles.categoriaGasto]}>
                                        Carro
                                    </Text>
                                </View>
                                <ImageBackground
                                    source={require('../../assets/iconoTresPuntos.png')}
                                    style={styles.tresPuntos}
                                    resizeMode='contain'
                                />
                            </Pressable>
                            <View style={styles.movimiento}>
                                <View style={styles.descripcionMovimiento}>
                                    <Text style={[styles.fecha, styles.texto]}>Marzo 1, 20256</Text>
                                    <Text>Depósito</Text>
                                </View>
                                <View style={styles.cantidadesMovimiento}>
                                    <Text style={styles.cantidadGasto}>
                                        +$5,000.00
                                    </Text>
                                    <Text style={[styles.texto, styles.categoriaGasto]}>
                                        Carro
                                    </Text>
                                </View>
                                <ImageBackground
                                    source={require('../../assets/iconoTresPuntos.png')}
                                    style={styles.tresPuntos}
                                    resizeMode='contain'
                                />
                            </View> */}
                        </ScrollView>
                    </View>
                
                    <View style={styles.botonesGraficas}>
                        <Pressable style={styles.botonVerGraficas} onPress={()=>navigation.navigate('Graficas')}>
                            <Text style={styles.textoPressable}>Ver Graficas</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ScrollView>
           
        </View>
    )
}
const styles= StyleSheet.create({
    textoPressable:{
        textAlign: 'center',
        color: 'white',
        fontWeight:'bold',
    },
    botonVerGraficas:{
        width:'100%',
        height: '100%',
        textAlign:'center',
        justifyContent:'center',
    },
    botonesGraficas:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent: 'center',
        width: '90%',
        height: 50,
        marginTop:15,
        backgroundColor: 'red',
        borderRadius: 15,
        backgroundColor: '#94b8ebff'
    },
    icono:{
        width: 35,
        height: 35,
    },
    sroll:{
        width: '100%',
        backgroundColor: '#eaf8fbff',

    }, 
    contenido:{
        flex: 1,
        alignItems: 'center',

    },
    contentInput:{
        width: '100%',
        height: 35,
        justifyContent: 'flex-end',
        
    },
    input:{
        width: '50%',
        height: 20,
        borderColor:'#E0EDFF',
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 10,
        alignSelf: 'flex-end',
        marginTop: 5,
        color: 'gray',
    },
    filtro:{
        width: '90%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: 15,
        paddingTop: 12,
        paddingBottom: 10,        
    },
    texto:{
        color: 'gray',
    },
    inputCategoria:{
        borderBottomWidth: 2,
        borderColor: '#E0EDFF',
        marginTop: 0,
        marginLeft: 10,
        paddingLeft: 5,
        paddingBottom: 0,
        
    },
    contentMovimientos:{
        width:'90%',
        height: 500,
        alignSelf:'center',
    },
    movimientos:{
        flex: 1,
        borderRadius: 5,
        borderColor: 'black',
        backgroundColor: '#E0EDFF',
       
       
    },
    movimiento:{
        width: '95%',
        height: 60,
        alignSelf: 'center',
        paddingTop: 10,
        paddingBottom: 2,
        paddingLeft: 10,
        flexDirection: 'row',
        borderBottomColor: 'white',
        borderBottomWidth:2,        
    },  
    fecha:{
        fontSize: 10,
    },
    descripcionMovimiento:{
        width: '50%',
    },
    cantidadesMovimiento:{
        // backgroundColor: 'red',
        width: '40%',
        alignItems: 'felx-end',
        justifyContent: 'center',
    },
    cantidadGasto:{
        fontSize: 20,
        color: '#4CAA1D',
    },
    categoriaGasto:{
        fontSize: 10,
    },
    tresPuntos:{
        width: 40,
        height: 30,
        alignSelf: 'center',
        marginBottom: 12,
    },
    contentGrafica:{
        width: '90%',
        height: 230,
        alignSelf: 'center',
        marginTop: 20,
        //borderRadius: 10,
        marginBottom:10,
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    grafica:{
      flex: 1,
      borderRadius: 5,
    },
});
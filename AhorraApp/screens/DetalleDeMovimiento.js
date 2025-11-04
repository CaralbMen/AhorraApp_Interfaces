import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native'
import React, {useState} from 'react'
import estilosGlobales from './styles/estilosGlobales'

export default function DetalleDeMovimiento() {
    
    return (
        <View style={estilosGlobales.container}>
            <View style={estilosGlobales.cabecera}>
                <View style={estilosGlobales.tituloContent}>
                    <Text style={estilosGlobales.titulo}>Ahorra + App</Text>
                </View>
                <View style={estilosGlobales.logoContent}>
                    <ImageBackground
                        source={require('../assets/LogoAhorraSinFondo.png')}
                        style={estilosGlobales.logo}
                    />
                </View>
            </View>

            <View style={estilosGlobales.pantallaActualContainer}>
                <Text style={estilosGlobales.textoPantalla}>Pago de Renta</Text>
            </View>

            <View style={styles.categoriaContainer}>
                <Text style={styles.categoriaLabel}>Categoría: </Text>
                <Text style={styles.nombreCategora}>Renta</Text>
            </View>
            <View style={styles.contenedorInfo}>
                <View
                    style={styles.contenedorClaro}
                >
                    <View style={styles.contentFecha}>
                        <Text style={styles.fecha}>31 de Febrero del 2025</Text>
                    </View>
                    <Text style={styles.DescripcionLabel}>Descripción:</Text>
                    <View style={styles.descripcionHoja}>
                        <Text style={styles.renglon}>Pago de la renta del depa</Text>
                        <Text style={styles.renglon}>para el mes de marzo</Text>
                        <Text style={styles.renglon}></Text>
                        <Text style={styles.renglon}></Text>
                        <Text style={styles.renglon}></Text>
                        <Text style={styles.renglon}></Text>
                    </View>
                    <Text style={styles.usadoLabel}>Se usó la cantidad de $3500.00 </Text>
                    <Text style={styles.usadoLabel}>de la categoría</Text>
                    <Text style={styles.usadoLabel}></Text>
                    <Text style={styles.usadoLabel}>Quedan $4,000.00 para llegar </Text>
                    <Text style={styles.usadoLabel}>al límite</Text>
                </View>
                
            </View>





                
            <View style={estilosGlobales.footer}>
                <ImageBackground
                    source={require('../assets/iconoCategorias.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoHome.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoMas.png')}
                    style={styles.icono}
                />
                <ImageBackground
                    source={require('../assets/iconoPerfil.png')}
                    style={styles.icono}
                />
            </View>
            
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
    },
    contenedorClaro:{
        width:'90%',
        backgroundColor:'#eaf8fbff',
        alignSelf:'center',
        borderRadius:10,
        paddingLeft:10,
        paddingTop:15,
        paddingBottom:40,
    },
    contentFecha:{
        width:'100%',
        paddingRight:20,
        paddingTop:5,
    },
    fecha:{
        color:'gray',
        fontSize:15,
        alignSelf: 'flex-end',
    },
    DescripcionLabel:{
        fontSize:20,
    },
    descripcionHoja:{
        backgroundColor:'#C0D5F2',
        width:'90%',
        alignSelf:'center',
        borderRadius:10,
        padding:10,
        marginTop:10,
        marginBottom:25,
        paddingBottom:30,
    },
    renglon:{
        height:25,
        borderBottomWidth:2,
        borderBottomColor:'#eaf8fbff',
        width:'90%',
        alignSelf:'center',
        color:'gray',
    },
    usadoLabel:{
        fontSize:18,
        height:25,
        width:'92%',
        alignSelf:'center',
        
    },
})
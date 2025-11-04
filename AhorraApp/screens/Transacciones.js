import { Text, View, ImageBackground, ScrollView, StyleSheet, TextInput } from 'react-native'
import React, { Component, useState } from 'react'
import estilosGlobales from '../screens/styles/estilosGlobales';
export default function Transacciones(){
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
            <ScrollView 
                style={styles.sroll}
                contentContainerStyle={styles.contenido}
            >
                <View style={estilosGlobales.pantallaActualContainer}>
                    <Text style={estilosGlobales.textoPantalla}>Tus Movimientos</Text>
                </View>
                <View style={estilosGlobales.contenidoScreen}>
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
                            style={[styles.inputCategoria, styles.texto]}
                        />
                    </View>
                    <ScrollView style={styles.movimientos}>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
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
                                source={require('../assets/iconoTresPuntos.png')}
                                style={styles.tresPuntos}
                                resizeMode='contain'
                            />
                        </View>
                    </ScrollView>
                    
                   

                    
                </View>
            </ScrollView>
            <View style={estilosGlobales.footer}>
                <ImageBackground
                    source={require('../assets/iconoCategorias.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoHome.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoMas.png')}
                />
                <ImageBackground
                    source={require('../assets/iconoPerfil.png')}
                />
            </View>
        </View>
    )
}
const styles= StyleSheet.create({
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
        height: 30,
        justifyContent: 'end',
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
        paddingLeft: 15,
        paddingTop: 15,
        
    },
    texto:{
        color: 'gray',
    },
    inputCategoria:{
        borderBottomWidth: 2,
        borderBottomColor: '#E0EDFF',
        marginLeft: 10,
        paddingLeft: 5,
    },
    movimientos:{
        width: '90%',
        height: 400,
        borderRadius: 5,
        borderColor: 'black',
        // borderWidth: 2,
        alignSelf: 'center',
        backgroundColor: '#E0EDFF',
       
    },
    movimiento:{
        width: '95%',
        height: 60,
        alignSelf: 'center',
        paddingTop: 10,
        flexDirection: 'row',
        
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
        alignItems: 'end',
        justifyContent: 'center',
        paddingRight: 12,
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
        
    },
});
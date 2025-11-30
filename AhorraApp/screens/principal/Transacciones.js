import { Button, Text, View, ImageBackground, ScrollView, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import estilosGlobales from '../styles/estilosGlobales';
import React, {useEffect, useState} from 'react';
import { useAuth } from '../../context/AuthContext';
import {obtenerMovimientosPorUsuario} from '../../controllers/movimientoController';
import { obtenerCategorias } from '../../controllers/categoriasController';
export default function Transacciones({navigation}){
    const { user } = useAuth();
    const [allMovimientos, setAllMovimientos] = useState([]);
    const [movimientosData, setMovimientosData]=useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriaFilter, setCategoriaFilter] = useState(null); 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState(''); 
    const [filterByCategory, setFilterByCategory] = useState(false);
    const [filterByDate, setFilterByDate] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    useEffect(()=>{
        async function cargarMovimientos(){
            if(user){
                // console.log('carganding movimientos para el usuario ID:', user.id_usuario);
                const datos= await obtenerMovimientosPorUsuario(user.id_usuario);
                // console.log('Movimientos cargados:', datos);  
                setAllMovimientos(datos || []);
                setMovimientosData(datos || []);
                // cargar categorias para el filtro
                try{
                    const cats = await obtenerCategorias(user.id_usuario);
                    setCategorias(cats || []);
                }catch(e){
                    console.error('Error cargando categorias:', e);
                }
            }
        }
        cargarMovimientos();
    },[user]);

    const aplicarFiltros = () =>{
        // console.log('aplicando filtros:', {categoriaFilter, startDate, endDate});
        let filtrados = [...allMovimientos];
        if(categoriaFilter){
            filtrados = filtrados.filter(m => String(m.categoria_id) === String(categoriaFilter) || String(m.categoria_nombre) === String(categoriaFilter));
        }
        if(startDate){
            const sd = new Date(startDate);
            if(!isNaN(sd)) filtrados = filtrados.filter(m => {
                const mf = new Date(m.fecha);
                return !isNaN(mf) && mf >= sd;
            });
        }
        if(endDate){
            const ed = new Date(endDate);
            if(!isNaN(ed)) filtrados = filtrados.filter(m => {
                const mf = new Date(m.fecha);
                return !isNaN(mf) && mf <= ed;
            });
        }
        setMovimientosData(filtrados);
    }

    const limpiarFiltros = () =>{
        setCategoriaFilter(null);
        setStartDate('');
        setEndDate('');
        setMovimientosData(allMovimientos);
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

            <ScrollView 
                style={styles.sroll}
                contentContainerStyle={styles.contenido}
            >
                <View style={estilosGlobales.pantallaActualContainer}>
                    <Text style={estilosGlobales.textoPantalla}>Tus Movimientos</Text>
                </View>
                <ScrollView style={estilosGlobales.contenidoScreen}>
                    <View style={styles.contentInput}>
                        <View style={styles.toggleRow}>
                            <TouchableOpacity onPress={()=>{ setFilterByCategory(!filterByCategory); if(!filterByCategory) setShowCategoryDropdown(true); }} style={[styles.buttonFiltro, filterByCategory? styles.buttonFiltroActive: null]}>
                                <Text style={[styles.btnFiltroText, filterByCategory? styles.btnFiltroTextActive: null]}>Filtrar por categoría</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> setFilterByDate(!filterByDate)} style={[styles.buttonFiltro, filterByDate? styles.buttonFiltroActive: null]}>
                                <Text style={[styles.btnFiltroText, filterByDate? styles.btnFiltroTextActive: null]}>Filtrar por fecha</Text>
                            </TouchableOpacity>
                        </View>

                        {filterByCategory && (
                            <View>
                                <TouchableOpacity style={styles.categorySelect} onPress={()=> setShowCategoryDropdown(!showCategoryDropdown)}>
                                    <Text style={styles.categorySelectText}>{categoriaFilter ? (categorias.find(c=>String(c.id)===String(categoriaFilter))?.nombre || 'Seleccionar categoría') : 'Seleccionar categoría'}</Text>
                                </TouchableOpacity>
                                {showCategoryDropdown && (
                                    <View style={styles.dropdown}>
                                        <TouchableOpacity style={styles.dropdownItem} onPress={()=>{ setCategoriaFilter(null); setShowCategoryDropdown(false); }}>
                                            <Text>-- Todas --</Text>
                                        </TouchableOpacity>
                                        {categorias.map(cat => (
                                            <TouchableOpacity key={cat.id} style={styles.dropdownItem} onPress={()=>{ setCategoriaFilter(cat.id); setShowCategoryDropdown(false); }}>
                                                <Text>{cat.nombre}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}

                        {filterByDate && (
                            <View style={styles.filterRow}>
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder='Desde (YYYY-MM-DD)'
                                    value={startDate}
                                    onChangeText={setStartDate}
                                />
                                <TextInput
                                    style={styles.dateInput}
                                    placeholder='Hasta (YYYY-MM-DD)'
                                    value={endDate}
                                    onChangeText={setEndDate}
                                />
                            </View>
                        )}

                        <View style={styles.filterButtons}>
                            <TouchableOpacity style={styles.filterButton} onPress={aplicarFiltros}>
                                <Text style={styles.filterButtonText}>Aplicar filtros</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterButton, styles.clearButton]} onPress={limpiarFiltros}>
                                <Text style={styles.filterButtonText}>Limpiar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.contentMovimientos}>
                        <ScrollView
                            style={styles.movimientos}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"

                        >
                            {movimientosData.map((item)=>(
                                <Pressable key={item.id} style={styles.movimiento} onPress={()=>navigation.navigate('DetalleDeMovimiento', { movimiento: item })}>
                                    <View style={styles.descripcionMovimiento}>
                                        <Text style={[styles.fecha, styles.texto]}>{item.fecha}</Text>
                                        <Text>{item.tipo}</Text>
                                    </View>
                                    <View style={styles.cantidadesMovimiento}>
                                        <Text style={[styles.cantidadGasto, styles.texto, item.tipo==='ingreso'? {color: '#4CAA1D'} : {color: '#D13434'}]}>
                                            {item.tipo==='ingreso' ? '+' : '-'}$
                                            {item.monto}
                                        </Text>
                                        <Text style={[styles.categoriaGasto, styles.texto]}>
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
        minHeight: 90,
        paddingVertical: 8,
        justifyContent: 'flex-start',
        
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
        height: 400,
        alignSelf:'center',
        marginTop: 30,
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
    categoriasScroll: {
        width: '100%',
        paddingVertical: 8,
        paddingLeft: 10,
    },
    categoryChip: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#E0EDFF'
    },
    categoryChipActive: {
        backgroundColor: '#007BFF',
        borderColor: '#007BFF'
    },
    categoryChipText: {
        color: '#333'
    },
    categoryChipTextActive: {
        color: 'white'
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    buttonFiltro: {
        flex: 1,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonFiltroActive: {
        backgroundColor: '#007BFF'
    },
    btnFiltroText: {
        color: '#333'
    },
    btnFiltroTextActive: {
        color: 'white'
    },
    categorySelect: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0EDFF',
        marginHorizontal: 10,
    },
    categorySelectText: {
        color: '#333'
    },
    dropdown: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#E0EDFF',
        maxHeight: 200
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    dateInput: {
        width: '48%',
        height: 38,
        borderWidth: 1,
        borderColor: '#E0EDFF',
        borderRadius: 6,
        paddingHorizontal: 8,
        backgroundColor: 'white'
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    filterButton: {
        flex: 1,
        marginRight: 8,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    clearButton: {
        backgroundColor: '#cccccc',
        marginRight: 0,
        marginLeft: 8,
    },
    filterButtonText: {
        color: 'white',
        fontWeight: 'bold'
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
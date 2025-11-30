import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import estilosGlobales from '../styles/estilosGlobales';
import { useAuth } from '../../context/AuthContext';
import { obtenerSumaPorCategoria, obtenerComparativaMensual } from '../../controllers/movimientoController';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width - 32;

export default function Graficas({navigation}){
  const { user } = useAuth();
  const [porCategoria, setPorCategoria] = useState([]);
  const [comparativaMes, setComparativaMes] = useState({ total_ingresos: 0, total_egresos: 0 });

  useEffect(()=>{
    async function cargar(){
      if(!user) return;
      try{
        const sumaCat = await obtenerSumaPorCategoria(user.id_usuario);
        setPorCategoria(sumaCat || []);

        const now = new Date();
        const ym = now.toISOString().slice(0,7); //anio / mes
        const comp = await obtenerComparativaMensual(user.id_usuario, ym);
        setComparativaMes(comp || { total_ingresos: 0, total_egresos: 0 });
      }catch(e){
        console.error('Error cargando datos de graficas:', e);
      }
    }
    cargar();
  },[user]);

  const generarGrafica = (ingreso, egreso, title) => {
    const data = [];
    if(Number(ingreso) > 0) data.push({ name: '$ Ingresos', population: Number(ingreso), color: 'green', legendFontColor: '#333', legendFontSize: 12 });
    if(Number(egreso) > 0) data.push({ name: '$ Egresos', population: Number(egreso), color: 'red', legendFontColor: '#333', legendFontSize: 12 });
    if(data.length === 0) data.push({ name: 'Sin datos', population: 1, color: '#ccc', legendFontColor: '#333', legendFontSize: 12 });
    return data;
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

      <ScrollView style={estilosGlobales.contenidoScreen} contentContainerStyle={styles.content}>
        <View style={estilosGlobales.pantallaActualContainer}>
          <Text style={estilosGlobales.textoPantalla}>Gráficas</Text>
        </View>

        {/* <Text style={styles.title}>Gráficas por categoría</Text> */}
        <Text style={styles.title}>Gráficas por categoria</Text>
      {porCategoria.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.textoVacio}>No hay categorías ni movimientos para mostrar.</Text>
        </View>
      )}

      {porCategoria.map(cat => (
        <View key={cat.categoria_id} style={styles.chartCard}>
          <Text style={styles.chartTitle}>{cat.categoria_nombre}</Text>
          <PieChart
            data={generarGrafica(cat.total_ingresos, cat.total_egresos, cat.categoria_nombre)}
            width={screenWidth}
            height={180}
            chartConfig={chartConfig}
            accessor= {'population'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            absolute
          />
          <View style={styles.totalsRow}>
            <Text style={styles.totalIngreso}>Ingresos: ${Number(cat.total_ingresos || 0).toFixed(2)}</Text>
            <Text style={styles.totalEgreso}>Egresos: ${Number(cat.total_egresos || 0).toFixed(2)}</Text>
          </View>
        </View>
      ))}

      <Text style={[styles.title, {marginTop: 16}]}>Comparativa Ingresos/Egresos ({new Date().toLocaleString('default', { month: 'long', year: 'numeric' })})</Text>
      <View style={styles.chartCard}>
        <PieChart
          data={generarGrafica(comparativaMes.total_ingresos, comparativaMes.total_egresos, 'Comparativa mensual')}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
        <View style={styles.totalsRow}>
          <Text style={styles.totalIngreso}>Total ingresos: ${Number(comparativaMes.total_ingresos || 0).toFixed(2)}</Text>
          <Text style={styles.totalEgreso}>Total egresos: ${Number(comparativaMes.total_egresos || 0).toFixed(2)}</Text>
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f6fbff'
  },
  content:{
    padding: 16,
    alignItems: 'center' 
  },
  title:{ 
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start', 
    marginBottom: 8
  },
  chartCard:{
    width: '100%',
    backgroundColor: '#E0EDFF', 
    borderRadius: 8,
    padding: 8,
    marginBottom: 12, 
    alignItems: 'center'
  },
  chartTitle:{ 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 8 
  },
  totalsRow:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12, 
    marginTop: 8 
  },
  totalIngreso:{
    color: '#169b16', 
    fontWeight: '600'
  },
  totalEgreso:{
    color: '#c0392b', 
    fontWeight: '600' 
  },
  emptyCard:{
    width: '100%', 
    backgroundColor: '#E0EDFF', 
    borderRadius: 8, padding: 16, 
    marginBottom: 12, 
    alignItems: 'center' },
    textoVacio:{ color: '#666' },
});

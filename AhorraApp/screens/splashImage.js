import { useState, useEffect, use } from "react";
import { View, ImageBackground, Text, StyleSheet, Animated } from "react-native";
import Principal from './PantallaPrincipal';
export default function splashImage({navigation}){
    const [cargando, setCargando]= useState(true);
    const opacidad= new Animated.Value(1);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            Animated.timing(opacidad,{
                toValue: 0,
                duration: 600,
            }).start(()=>setCargando(false));
        }, 3000);
        return()=>clearTimeout(timer);
    },[]);
    if(cargando){
        return <Animated.View style={[styles.splashContainer, {opacity: opacidad}]}>
            <ImageBackground
                source={require('../assets/LogoAhorraSinFondo.png')}
                resizeMode="cover"
                style= {styles.splashImage}
            >
                <Text style={splashTexto}>Cargando...</Text>
            </ImageBackground>
        </Animated.View>
    }
    return <Principal/>
}
const styles= StyleSheet.create({
    splashContainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  splashImage:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  splashTexto:{
    position: 'absolute',
    Bottom: 0,
    fontSize: 20,
    color: '#333',
  },
});
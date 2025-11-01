import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
    },
    cabecera:{
        width: '100%',
        height: '12%',
        backgroundColor:'#C0C4D3',
        borderBottomColor:'#006AFF',
        borderBottomWidth: 4,
        flexDirection:'row',
    },
    tituloContent:{
        width:'50%',
        justifyContent: 'flex-start',
    },
    logoContent:{
        width:'50%',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
    },
    titulo:{
        fontSize: 25,
        marginLeft: 15,
        marginTop: 60,
        color: '#4CAA1D', 
    },
    logo:{
        width:65,
        height: 65,
        marginBottom:2,
        marginRight: 17,
    },
})
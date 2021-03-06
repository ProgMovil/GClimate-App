import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions, Keyboard,Image} from "react-native";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Content,
    View,
    H2,
    Button,
    Card,
    H3
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../enviroment";

const {apiKey,apiHost}= getEnvVars();
const { width, height } = Dimensions.get("window");

//Pantalla Principal
const ScrPrincipal=({route,navigation})=>{
    //Variables
    const[clima,setclima]=useState(null);
    const [error, setError] = useState(false);
    const [search,setSearch]=useState("");
    let city=null;
    
    if(!route.params){
        city="Villanueva";
    }else{
        city=route.params.params.id;
    }

    //Gets
    const getclima = async ()=>{
        try
        {
            const response= await backend.get(`/forecast.json?q=${city}&lang=es`,{
                headers:
                    {
                        "x-rapidapi-key":apiKey,
                        "x-rapidapi-host":apiHost,
                        "Content-Type":"aplication/json"
                    }
            });
            setclima(response.data);
        }
        catch(error)
        {
            setError(true);
        }
    }

    //Obtener olima
    useEffect(()=>{
        getclima();
        
    },[city]);
  
    if (!clima) {
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#000"}}>
                <Image source={require("../icons/clima2.png")} style = {{height:200,width:200}}/>
            </View>
        )
    }
    
    //Obtener icono
    let climaicono = `https:${clima.current.condition.icon}`;

    //Pantalla principal
  return( 
    <Container style={styles.Container}>
        <Header searchBar rounded style={styles.header} androidStatusBarColor="#000">
            <Item style={styles.addc}>
                <Button style={styles.buttonMore} onPress={()=> navigation.navigate("Info",{city})}>
                    <Image source={require("../icons/clima2.png")} style={styles.imageIconStyle}/>
                </Button>
            </Item>
            <Item style={styles.buscar}>
                <Input placeholder="Buscar" value={search} onChangeText={setSearch} style={{color:"#fff",marginLeft:15}} placeholderTextColor="#fff"/>
                <Button icon onPress={() =>  search?(Keyboard.dismiss(),navigation.navigate('busqueda', {search}),setSearch("")):alert("Ingrese una Ciudad")}  style={{backgroundColor:"#232425",height:39,borderRadius:50}}>
                    <Icon name="search" color='#fff'/>
                </Button>
            </Item>
        </Header>
        <Content style={styles.Cont} >
            
            <Card style={styles.ciudad}>
                <View style={styles.ciudadCont}>
                    <View style = {styles.backgroundImage}>
                        <Image source={require("../icons/wallp3.jpg")} resizeMode="cover" style = {styles.ciudadImg}/>
                    </View>
                    <View style = {styles.overlay}>
                        <Image style={styles.climaIcon} source={{uri: climaicono}}/>
                        <Text style={styles.ciudadTitle}> {clima.location.name}, {clima.location.region}</Text>
                        <Text style={styles.ciudadSubt}>{clima.current.condition.text}</Text>
                    </View>
                </View>
            </Card>

            <Card style={styles.climaActual}>
                <Text style={{color:"#fff",textAlign:"center",fontSize:31,fontFamily:"Roboto"}}>Clima Actual</Text>
            </Card>
            <View style={styles.contA}>
                <Card style={styles.tempActual}>
                    <Text style={styles.tempActualText}>{clima.current.temp_c}°C</Text>
                    <Text style={styles.divi}>|</Text>
                    <Text style={styles.tempActualText}>{clima.current.temp_f}°F</Text>
                </Card>

                <View style={styles.contB}>
                    <Card style={styles.dataCard1}>
                        <H2 style={{color:"#fff",fontWeight:"bold",fontFamily:"Roboto"}}>Mínima</H2>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.mintemp_c}°C</H3>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.mintemp_f}°F</H3>
                    </Card>
                    <Card style={styles.dataCard2}>
                        <H2 style={{color:"#fff",fontWeight:"bold",fontFamily:"Roboto"}}>Máxima</H2>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.maxtemp_c}°C</H3>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.maxtemp_f}°F</H3>
                    </Card>
                </View>
                <View style={styles.contB}>
                    <Card style={styles.dataCard1}>
                        <H2 style={{color:"#fff",fontWeight:"bold",fontFamily:"Roboto"}}>Lluvia</H2>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.daily_chance_of_rain}%</H3>
                    </Card>
                    <Card style={styles.dataCard2}>
                        <H2 style={{color:"#fff",fontWeight:"bold",fontFamily:"Roboto"}}>Humedad</H2>
                        <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.avghumidity}%</H3>
                    </Card>
                </View>
            </View>

        </Content>
    </Container>

  );
}; 
//Termina ScrPrincipal


const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#000", 
    },
    header:{
        backgroundColor:"#000",
    },
    buscar:{
        width:15,
        borderRadius:50,
        backgroundColor:"#232425",
        marginLeft:10,
    },
    backWall:{
        height:height,
        width:width,
    },
    addc:{
        maxWidth:width*0.11,
        backgroundColor:"#000",
        marginLeft:-2,
    },
    buttonMore:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        height:height*0.054,
        backgroundColor:"#000",
        borderRadius:10,
        marginLeft:width*0.001,
    },
    imageIconStyle:{
        maxWidth:width*0.09,
        maxHeight:height*0.05,
        resizeMode : "stretch",
    },
    ciudad:{
        height:height*0.25,
        width:width+2,
        backgroundColor:"#232425",
        justifyContent:"center",
        borderColor:"#fff",
        marginTop:0,
        marginLeft:-1,
        borderColor:"#232425",
        borderColor:"#000",
    },
    ciudadCont:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    overlay:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
    },
    backgroundImage:{
        position:"absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    ciudadImg:{
        height:height*0.25,
        width:width+2,
    },
    ciudadTitle:{
        fontFamily:"Roboto",
        fontSize:25,
        color:"#fff",
        textAlign:"center",
        marginTop:height*-0.015,
        textShadowColor:'#000',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1,
    },
    ciudadSubt:{
        fontFamily:"Roboto",
        color:"#fff",
        fontSize:16,
        textAlign:"center",
        textShadowColor:'#fff',
        textShadowOffset:{width: 0.5, height: 0.5},
        textShadowRadius:10,
        
    },
    climaIcon:{
        height:75,
        width:75,
    },
    climaActual:{
        height:height*0.1,
        backgroundColor:"#232425",
        justifyContent:"center",
        marginTop:5,
        marginLeft:-2,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0.5,
    },
    contA:{
        flex:1,
        alignItems:"center",
        justifyContent:"space-evenly",
        flexDirection:"column",
    },
    tempActual:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        height:height*0.12,
        width:width*0.94,
        backgroundColor:"#232425"
        
    },
    tempActualText:{
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        color:"#fff",
        fontSize:30,
        backgroundColor:"#232425",
    },
    
    divi:{
        textAlign:"center",
        fontSize:40,
        color:"#fff",
        backgroundColor:"#232425",
    },
    contB:{
        flex:1,
        flexDirection:"row",
        alignContent:"space-around",
        width:width*0.94,
        height:height*0.178,
        borderColor:"#000",
    },
    dataCard1:{
        flex:1,
        borderColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#232425",
        marginBottom:height*0.005,
        marginRight:7,
    },
    dataCard2:{
        flex:1,
        borderColor:"#fff",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#232425",
        marginBottom:height*0.005,
    },
});

export default ScrPrincipal;
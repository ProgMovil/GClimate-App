import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions,FlatList, Keyboard } from "react-native";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Content,
    Spinner,
    H1,
    View,
    H2,
    Button,
    Card,
    H3

} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../enviroment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const {apiKey,apiHost}= getEnvVars();

const { width, height } = Dimensions.get("window");


//PantallaPrincipal
const ScrInfoexten=({route,navigation})=>{
    //Variables
    const[clima,setclima]=useState(null);
    const [error, setError] = useState(false);
    const [search,setSearch]=useState("");
    let city=null;

    //console.log(route.params);
    
    if(!route.params){
        city="Villanueva";
    }else{
        city=route.params.city;
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
    //Busqueda Clima
    
    //Clima obtener
    useEffect(()=>{
        getclima();
        
    },[]);

    if (!clima) {
        return (
            <View style={{flex:1,justifyContent:"center",backgroundColor:"#000"}}>
             <Spinner color="#fff"  />
            </View>
        )
    }

  return( 
    <Container style={styles.Container}>
        <Card style={{height:height*0.25,marginTop:0,backgroundColor:"#232425",justifyContent:"center",borderColor:"#000"}}>
                <Icon name="arrow-back" style={{color:"#fff",width:20,marginLeft:15,marginTop:-35}} onPress={() => navigation.navigate('Principal')}/>
                <H1 style={styles.h1}> {clima.location.name},{clima.location.region}</H1>
                <Text style={{color:"#fff",textAlign:"center"}}>{clima.current.condition.text}</Text>
            </Card>

            <Card style={{height:height*0.07,backgroundColor:"#232425",justifyContent:"center",marginTop:5,borderLeftWidth:0,borderRightWidth:0, borderTopWidth:0.5,borderbottomWidth:0.5}}>
                <H2 style={{color:"#fff",textAlign:"center"}}>Clima Detalles</H2>
            </Card>
            <Card style={{flex:1,flexWrap:"wrap",alignContent:"center",height:height*0.50,backgroundColor:"#232425",marginTop:10}}>
                    <View style={{marginTop:20,marginLeft:10,width:width*0.40}}>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Sensación Termica: {`\n`}{clima.current.feelslike_c}°C{`\n`}{clima.current.feelslike_f}°F{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Direccion de Viento: {`\n`}{clima.current.wind_dir}{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Velocidad de Viento: {`\n`}{clima.current.wind_kph}kph{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Precipitación: {`\n`}{clima.current.precip_mm}mm{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Amanecer: {`\n`}{clima.forecast.forecastday[0].astro.sunrise}{`\n`}</Text>   
                    </View>
                    <View style={{marginTop:20,marginLeft:10,width:width*0.40}}>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Iluminación de Luna: {`\n`}{clima.forecast.forecastday[0].astro.moon_illumination}%{`\n`}{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Presión: {`\n`}{clima.current.pressure_mb}pa{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Visibilidad: {`\n`}{clima.current.vis_km}km{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Indice UV: {`\n`}{clima.current.uv}{`\n`}</Text>
                        <Text style={{color:"#fff",fontSize:15,width:140,textAlign:"center"}}>Artadecer: {`\n`}{clima.forecast.forecastday[0].astro.sunset}{`\n`}</Text>   
                    </View>
            </Card>
            <TouchableOpacity onPress={()=> navigation.navigate("horas",{city})}>
            <Card style={{backgroundColor:"#232425",height:30,justifyContent:"center",alignItems:"center"}}>
             <Icon name="add-circle" style={{color:"#fff"}} />
            </Card>
            </TouchableOpacity>
    </Container>

  );
}; 
//Termina ScrInfoExten
const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:"#000",
        paddingTop:0,
        
    },
    Text:{
        color:"#fff",
    },
    header:{
        backgroundColor:"#000",

    },
    buscar:{
        
        width:15,
        borderRadius:50,
        backgroundColor:"#232425",
        
    },
    addc:{
        maxWidth:width*0.11,
        backgroundColor:"#000",
    },
    Content:{
        backgroundColor:"#000",    
    },
    h1:{
        color:"#fff",
        textAlign:"center",
        marginTop:25,
    },
    cuadros:{
        flexWrap:"wrap",
        flex:1,
        width:width*15,
        height:height*0.5
    },

});

export default ScrInfoexten;
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions,Image} from "react-native";
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
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#555"}}>
                <Image source={require("../icons/clima.png")} style = {{height:200,width:200}}/>
            </View>
        )
    }
    let don2 = `https:${clima.current.condition.icon}`;

    return( 
        <Container style={styles.Container}>
            <Card style={{height:height*0.25,marginTop:0,backgroundColor:"#232425",justifyContent:"center",borderColor:"#000"}}>
                <View style = {styles.backgroundImage}>
                    <Image source={require("../icons/wallp3.jpg")} resizeMode="cover" style = {styles.ciudadImg}/>
                </View>
                <Icon name="arrow-back" style={styles.arrowBack} onPress={() => navigation.navigate('Principal')}/>
                <View style={styles.ciudadText}>
                    <Image style={styles.climaIcon} source={{uri: don2}}/>
                    <Text style={styles.ciudadTitle}> {clima.location.name},{clima.location.region}</Text>
                    <Text style={styles.ciudadSubt}>{clima.current.condition.text}</Text>
                </View> 
            </Card>

            <Card style={styles.climaDetalle}>
                <Text style={styles.climaDetalleText}>Clima Detalles</Text>
            </Card>

            <Card style={styles.contInfo}>
                <View style={styles.contInfoDetalle}>
                    <Text style={styles.infoDetalles}>Sensación Termica: {`\n`}{clima.current.feelslike_c}°C{`\n`}{clima.current.feelslike_f}°F{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Direccion de Viento: {`\n`}{clima.current.wind_dir}{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Velocidad de Viento: {`\n`}{clima.current.wind_kph}km/h{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Precipitación: {`\n`}{clima.current.precip_mm}mm{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Amanecer: {`\n`}{clima.forecast.forecastday[0].astro.sunrise}{`\n`}</Text>   
                </View>
                <View style={styles.contInfoDetalle}>
                    <Text style={styles.infoDetalles}>Iluminación de Luna: {`\n`}{clima.forecast.forecastday[0].astro.moon_illumination}%{`\n`}{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Presión: {`\n`}{clima.current.pressure_mb}pa{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Visibilidad: {`\n`}{clima.current.vis_km}km{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Indice UV: {`\n`}{clima.current.uv}{`\n`}</Text>
                    <Text style={styles.infoDetalles}>Artadecer: {`\n`}{clima.forecast.forecastday[0].astro.sunset}{`\n`}</Text>   
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
        marginTop:height*-0.03,
        textShadowColor:'#000',
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:1,
    },
    cuadros:{
        flexWrap:"wrap",
        flex:1,
        width:width*15,
        height:height*0.5
    },
    ciudadCard:{
        height:height*0.25,
        width:width+2,
        marginTop:-2,
        marginLeft:-2,
        backgroundColor:"#232425",
        justifyContent:"center",
        borderColor:"#000",
    },
    ciudadCont:{
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    ciudadText:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        marginTop:height*-0.05,
    },
    arrowBackButton:{
        backgroundColor:"#444",
    },
    arrowBack:{
        color:"#fff",
        width:20,
        marginLeft:15,
        marginTop:10
    },
    ciudad:{
        alignItems:"stretch",
        backgroundColor:"#232425",
        borderColor:"#fff",
        marginTop:0,
        marginLeft:-1,
        borderColor:"#232425",
        borderColor:"#000",
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
        marginTop:height*-0.03,
    },
    ciudadSubt:{
        fontFamily:"Roboto",
        color:"#fff",
        textAlign:"center",
        color:"#fff",
        fontSize:16,
        textShadowColor:'#fff',
        textShadowOffset:{width: 0.5, height: 0.5},
        textShadowRadius:10,
    },
    climaIcon:{
        marginBottom:15,
        height:75,
        width:75,
        justifyContent:"center"
    },
    climaDetalle:{
        fontFamily:"Roboto",
        height:height*0.1,
        backgroundColor:"#232425",
        justifyContent:"center",
        marginTop:1,
        marginBottom:1,
        marginLeft:-2,
        marginRight:-2,
    },
    climaDetalleText:{
        color:"#fff",
        textAlign:"center",
        fontFamily:"Roboto",
        fontSize:height*0.04,
    },
    contInfo:{
        flex:1,
        flexWrap:"wrap",
        alignContent:"center",
        justifyContent:"space-evenly",
        height:height*0.50,
        backgroundColor:"#232425",
        marginTop:5,
        marginBottom:1,
    },
    contInfoDetalle:{
        marginTop:height*0.048,
        alignItems:"center",
        width:width*0.45,
    },
    infoDetalles:{
        height:height*0.1,
        width:width*0.4,
        fontFamily:"Roboto",
        color:"#fff",
        fontSize:15,
        textAlign:"center",
    },
    climaXHora:{
        backgroundColor:"#232425",
        height:height*0.05,
        justifyContent:"center",
        alignItems:"center",
    },
});

export default ScrInfoexten;
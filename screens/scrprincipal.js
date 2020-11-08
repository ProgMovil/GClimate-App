import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions,FlatList } from "react-native";
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

const {apiKey,apiHost}= getEnvVars();

const { width, height } = Dimensions.get("window");


//PantallaPrincipal
const ScrPrincipal=({navigation})=>{
    //Variables
    const[clima,setclima]=useState(null);
    const [error, setError] = useState(false);
    const [search,setSearch]=useState("");
    

    //Gets
    const getclima = async ()=>{
        try
        {
            const response= await backend.get('/forecast.json?q=Villanueva&lang=es',{
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
    
    //Busqueda Error
    


    if (!clima) {
        return (
        <Content style={{backgroundColor:"#000"}}>
            <Spinner color="#fff" />
        </Content>
        )
    }
    //console.log(clima.forecast.forecastday[0].day.mintemp_c);
  return( 
    <Container style={styles.Container}>
        <Header searchBar rounded style={styles.header}  >
            <Item style={styles.addc}> 
             <Icon name="add-circle"/>
            </Item>
         <Item style={styles.buscar}>
             <Input placeholder="Buscar"  value={search} onChangeText={setSearch}  style={{color:"#fff"}} placeholderTextColor="#fff"/>
             <Button icon onPress={() => search?navigation.navigate('busqueda', {search}):alert("Ingrese una Ciudad")} style={{backgroundColor:"#232425",height:39,borderRadius:50}}>
                <Icon name="search" color='#fff'/>
             </Button>
         </Item>
        </Header>
        <Content style={styles.Content} >

            <Card style={{height:height*0.2,backgroundColor:"#232425",justifyContent:"center",borderColor:"#000"}}>
                <H1 style={styles.h1}> {clima.location.name}</H1>
                <Text style={styles.h1}>{clima.current.condition.text}</Text>
            </Card>

            <Card style={{height:height*0.1,backgroundColor:"#232425",justifyContent:"center",marginTop:10,borderLeftWidth:0,borderRightWidth:0, borderTopWidth:0.5,borderbottomWidth:0.5}}>
                <H2 style={{color:"#fff",textAlign:"center"}}>Clima Actual</H2>
            </Card>

            <Card style={{flex:1, flexDirection:"row",height:height*0.1,width:width*0.94,backgroundColor:"#232425",justifyContent:"space-around",alignItems:"center",margin:10,marginLeft:10}}>
                <H2 style={{color:"#fff"}}>{clima.current.temp_c}C</H2>
                <H2 style={{color:"#fff"}}>{clima.current.temp_f}F</H2>
            </Card>

            <View style={{flex:1,flexDirection:"row",flexWrap:"wrap",alignContent:"space-betweens",marginLeft:8,marginRight:10}}>
                <Card style={{flex:1,height:90,justifyContent:"center",alignItems:"center",backgroundColor:"#232425"}}>
                    <H2 style={{color:"#fff"}}>Minima</H2>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.mintemp_c}C</H3>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.mintemp_f}F</H3>
                </Card>
                <Card style={{flex:1,height:90,justifyContent:"center",alignItems:"center",backgroundColor:"#232425"}}>
                    <H2 style={{color:"#fff"}}>Maxima</H2>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.maxtemp_c}C</H3>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.maxtemp_f}F</H3>
                </Card>
                <Card style={{flex:1,height:90,justifyContent:"center",alignItems:"center",backgroundColor:"#232425"}}>
                    <H2 style={{color:"#fff"}}>Lluvia</H2>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].daily_chance_of_rain}%</H3>
                </Card>
                <Card style={{flex:1,height:90,justifyContent:"center",alignItems:"center",backgroundColor:"#232425"}}>
                    <H2 style={{color:"#fff"}}>Humedad</H2>
                    <H3 style={{color:"#fff"}}>{clima.forecast.forecastday[0].day.avghumidity}%</H3>
                </Card>

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
    },
    cuadros:{
        flexWrap:"wrap",
        flex:1,
        width:width*15,
        height:height*0.5
    },

});

export default ScrPrincipal;
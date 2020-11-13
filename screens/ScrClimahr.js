import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions,ScrollView,Image } from "react-native";
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
    H3,
    CardItem,
    Body
} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../enviroment";

const {apiKey,apiHost}= getEnvVars();
const { width, height } = Dimensions.get("window");

//PantallaPrincipal
const ScrInfoexten=({route,navigation})=>{
    //Variables
    const[clima,setclima]=useState(null);
    const [error, setError] = useState(false);
    const [search,setSearch]=useState("");
    let city=null;

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
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#000"}}>
                <Image source={require("../icons/clima2.png")} style = {{height:200,width:200}}/>
            </View>
        )
    }
    let hora=null;
    const horadi = (data)=>{
        hora=data.split(" ")
    }
  return( 
    <Container style={styles.Container}>
        <ScrollView>
        {
            clima.forecast.forecastday[0].hour.map((hour,index) => (
                <View style={styles.cardCont }key={index}>
                    <Card style={styles.cards}>
                        <CardItem style={styles.cardItems}>   
                            <Body style = {styles.cardBody} >
                                {horadi(hour.time)}
                                   <Text style={styles.cardTexth}>{hora[1]}</Text>
                                  <View style = {styles.tempCont} >
                                    <Text style={styles.cardTextc} >{hour.temp_c}°C</Text>
                                    <Text style={styles.divi}>|</Text>
                                    <Text style={styles.cardTextf} >{hour.temp_f}°F</Text>
                                </View>
                            </Body>
                        </CardItem>
                    </Card>
                </View>
            ))
        }
        </ScrollView>
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
    cardCont:{
        backgroundColor:"#000",
        alignItems:"center",
    },
    cards:{
        height:height*0.12,
        width:width*0.92,
        backgroundColor:"#232425",
        justifyContent:"center",
        marginBottom:7,
        marginTop:3,
    },
    cardItems:{
        backgroundColor:"#232425",
      
    },
    cardBody:{
        justifyContent:"center",
        flexDirection:"row",
        alignContent:"center",
        alignItems:"center",
        backgroundColor:"#232425",
    },
    cardTexth:{
        flex:1/3,
        color:"#fff",
        fontSize:30,
        marginRight:width*0.1
    },
    tempCont:{
        flex:1,
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#232425"
    },
    cardTextc:{
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        color:"#bbb",
        fontSize:30,
    },
    divi:{
        flex:1/5,
        justifyContent:"center",
        textAlign:"center",
        fontSize:30,
        color:"#fff",
       
    },
    cardTextf:{
        flex:1,
        justifyContent:"center",
        textAlign:"center",
        color:"#bbb",
        fontSize:30,
    },
    
});

export default ScrInfoexten;
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions,FlatList, Keyboard,ScrollView } from "react-native";
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
    let hora=null;
    const horadi = (data)=>{
        hora=data.split(" ")
    }
  return( 
    <Container style={styles.Container}>
        <ScrollView>
        {
          clima.forecast.forecastday[0].hour.map((hour) => (
            <View style={{backgroundColor:"#000",alignItems:"center"}}>
                <Card style={{height:70,width:width*0.9,backgroundColor:"#232425",justifyContent:"center"}}>
                  <CardItem style={{backgroundColor:"#232425",}}>
                    <Body>
                        {horadi(hour.time)}
                     <Text style={{color:"#fff",fontSize:22}}>{hora[1]}{`\t`}{`\t`}{hour.temp_c}°C{`\t`}{`\t`}{hour.temp_f}°F </Text>
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

export default ScrInfoexten;
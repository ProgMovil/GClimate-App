import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Content,
    Card,
    Spinner,
    H1,
    Row,
    View,
    H2

} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../enviroment";

const {apiKey,apiHost}= getEnvVars();
//
const { width, height } = Dimensions.get("window");
//PantallaPrincipal
const ScrPrincipal=()=>{
    //Variables
    const[clima,setclima]=useState(null);
    const [error, setError] = useState(false);

    //Gets
    const getclima = async ()=>{
        try
        {
            const response= await backend.get('/forecast.json?q=Villanueva',{
                headers:
                    {
                        "x-rapidapi-key":apiKey,
                        "x-rapidapi-host":apiHost,
                        "Content-Type":"aplication/json"
                    }
            });
            setclima(response.data);
            console.log(clima);
        }
        catch(error)
        {
            setError(true);
        }
    }

    useEffect(()=>{
        getclima();
    },[]);

    if (!clima) {
        return (
        <Content style={{backgroundColor:"#000"}}>
            <Spinner color="#fff" />
        </Content>
        )
    }
  return( 
    <Container style={styles.Container}>
        <Header searchBar rounded style={styles.header}  >
            <Item style={styles.addc}> 
             <Icon name="add-circle"/>
            </Item>
         <Item style={styles.buscar}>
             <Input placeholder="Buscar"  placeholderTextColor="#fff" style={{color:"#fff"}}/>
             <Icon name="search" color='#fff'/>
         </Item>
        </Header>
        <Content style={styles.Content} >
                <H1 style={styles.h1}> {clima.location.name}</H1>
        </Content>
        <View style={styles.Content2} >
            <H2>Clima Actual</H2>
            <Text>Clima {clima.current.temp_c}</Text>
        </View>
    </Container>

  );
}; //Termina ScrPrincipal

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
        backgroundColor:"#000",
        
    },
    addc:{
        maxWidth:width*0.11,
        backgroundColor:"#000",
    },
    Content:{
        backgroundColor:"#fff", 
        height:height*0.25    
    },
    h1:{
        color:"#000",
        textAlign:"center",
    },

});

export default ScrPrincipal;
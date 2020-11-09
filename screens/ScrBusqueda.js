import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Dimensions, Image } from "react-native";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    Content,
    Spinner,
    H1,
    H2,
    Button,
    View,
    Card,
    CardItem,
    Body,
    H3

} from "native-base";
import backend from "../api/backend";
import getEnvVars from "../enviroment";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const {apiKey,apiHost}= getEnvVars();

const { width, height } = Dimensions.get("window");

const ScrBusqueda=({ route , navigation })=>{
    const {search}=route.params;
    const[city,setcity]=useState(null);
    const [error, setError] = useState(false);

   
    const getcity = async ()=>{
        try
        {
            const response= await backend.get(`/search.json?q=${search}&lang=es`,{
                headers:
                    {
                        "x-rapidapi-key":apiKey,
                        "x-rapidapi-host":apiHost,
                        "Content-Type":"aplication/json"
                    }
            });
            setcity(response.data);
            
            
        }
        catch(error)
        {
            setError(true);
        }
    }

    useEffect(()=>{
        getcity();
    },[]);
    if (!city) {
        return (
            <View style={{flex:1,justifyContent:"center",backgroundColor:"#000"}}>
             <Spinner color="#fff"  />
            </View>
        )
    }
    return(
        <Container>
        <FlatList
        data={city}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>¡No hay Ciudades!</Text>}
        renderItem={({ item }) => {
          return (
            <View style={{backgroundColor:"#000",alignItems:"center"}}>
              <TouchableOpacity onPress={() => navigation.navigate('Principal', { params:{id:item.name}})}>
                <Card style={{height:70,width:width*0.9,backgroundColor:"#232425",justifyContent:"center"}}>
                  <CardItem style={{backgroundColor:"#232425",}}>
                    <Body>
                      <H3 style={{color:"#fff"}}>{item.name}</H3>
                    </Body>
                  </CardItem>
                </Card>
              </TouchableOpacity>
          </View>
          )
        }}
      />
        </Container>
        
    )
}

export default ScrBusqueda;
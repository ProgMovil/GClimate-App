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

//Pantalla de Búsqueda de Ciudades
const ScrBusqueda=({ route , navigation })=>{
    //Variables
    const {search}=route.params;
    const[city,setcity]=useState(null);
    const [error, setError] = useState(false);   

    //Gets
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
    //Obtener clima
    useEffect(()=>{
        getcity();
    },[]);

    if (!city) {
      return (
        <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#000"}}>
          <Image source={require("../icons/clima2.png")} style = {{height:200,width:200}}/>
        </View>
      )
    }

    //Pantalla de resultados de búsqueda
    return(
      <Container>
        <FlatList
          data={city}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<View style = {styles.error}><Text style = {styles.errorText}>¡No hay Ciudades!</Text></View>}
          renderItem={({ item }) => {
            return (
              <View style={{backgroundColor:"#000",borderColor:"#fff",alignItems:"center"}}>
                <TouchableOpacity onPress={() => navigation.navigate('Principal', { params:{id:item.name}})}>
                  <Card style={styles.cards}>
                    <CardItem style={styles.cardItems}>
                      <Body>
                        <H3 style={{color:"#ddd"}}>{item.name}</H3>
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
//Termina ScrBusqueda

const styles = StyleSheet.create({
  error:{
    backgroundColor:"#232425",
    width:width,
    height:height*0.9,
    alignItems:"center",
    justifyContent:"center",
  },
  errorText:{
    color:"#ccc",
    fontSize:40,
  },
  cards:{
    height:height*0.12,
    width:width*0.92,
    backgroundColor:"#232425",
    justifyContent:"center",
    marginVertical:5,
    borderColor:"#fff",
  },
  cardItems:{
    backgroundColor:"#232425",
    
  },
})
export default ScrBusqueda;
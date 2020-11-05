import React from "react";
import { StyleSheet, Text, Dimensions } from "react-native";
import {
    Container,
    Header,
    Item,
    Input,
    Icon,
    searchBar


} from "native-base";
//
const { width, height } = Dimensions.get("window");
//PantallaPrincipal
const ScrPrincipal=()=>{
  return( 
    <Container style={styles.Container}>
        <Header searchBar rounded style={styles.header} >
            <Item style={styles.addc}> 
             <Icon name="add-circle"/>
         </Item>
         <Item style={styles.buscar}>
             
             <Input placeholder="Buscar"/>
             <Icon name="search" />
         </Item>
        </Header>
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

});

export default ScrPrincipal;
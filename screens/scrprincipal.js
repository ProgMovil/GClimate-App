import React from "react";
import { StyleSheet, Text } from "react-native";
import {
    Container,
    Header


} from "native-base";
const ScrPrincipal=()=>{
  return( 
    <Container style={styles.Container}>
        <Header>
        <Text style={styles.Text}>Cualquiera</Text>
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

});

export default ScrPrincipal;
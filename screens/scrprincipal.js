import React from "react";
import { StyleSheet, Text } from "react-native";
import {Container} from "native-base";
const ScrPrincipal=()=>{
  return( 
    <Container>
        <Text>Cualquiera</Text>
    </Container>

  );
}; //Termina ScrPrincipal

const styles = StyleSheet.create({
Container:{
    flex:1,
    backgroundColor: "#000000 ",
    justifyContent: "center",
},
Text:{
    color:"#fff",
},

});

export default ScrPrincipal;
import React from "react";
import { StyleSheet, Text } from "react-native";
import {Contanier} from "native-base";
const ScrPrincipal=()=>{
  return( 
    <Contanier>
        <Text>Cualquiera</Text>
    </Contanier>

  );
}; //Termina ScrPrincipal

const styles = StyleSheet.create({
Contanier:{
    flex:1,
    backgroundColor: "#000000 ",
    justifyContent: "center",
},
Text:{
    color:"#fff",
},

});

export default ScrPrincipal;
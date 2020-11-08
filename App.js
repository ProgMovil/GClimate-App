import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScrPrincipal from './screens/ScrPrincipal';
import ScrBusqueda from './screens/ScrBusqueda';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal"  >
        <Stack.Screen name = "Principal" component={ScrPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="busqueda" component={ScrBusqueda} options={({ route }) => ({ title: route.params })} options={{headerStyle:{backgroundColor:'#000'},headerTintColor: "#fff"}} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  head: {

    backgroundColor:"#000",
    
  },
});

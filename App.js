import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ScrPrincipal from './screens/scrprincipal';
import ScrBusqueda from './screens/ScrBusqueda';
import ScrClimahr from './screens/ScrClimahr';
import ScrInfoexten from './screens/ScrInfoexten';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal"  >
        <Stack.Screen name = "Principal" component={ScrPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="busqueda" component={ScrBusqueda}  options={({ route }) => ({headerStyle:{backgroundColor:'#000'},title: route.params.search,headerTintColor: "#fff"})}  />
        <Stack.Screen name="Info" component={ScrInfoexten} options={{ headerShown: false }} />
        <Stack.Screen name="horas" component={ScrClimahr}  options={({ route }) => ({headerStyle:{backgroundColor:'#000'},title: "Clima por Hora",headerTintColor: "#fff"})}  />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  
});

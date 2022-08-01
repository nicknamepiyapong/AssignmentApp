import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Test from "./src/screens/Test";
import Place from "./src/screens/Place";

export default function App() {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        {/* Test screen  */}
        <Stack.Screen
          name="Test"
          component={Test}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              color:"white"
            },
            headerTitle: "Test",
            headerTitleAlign: "center",
            headerStyle:{
              backgroundColor: '#0085E6',
            }
          }}>
        </Stack.Screen>


        {/* About Screen  */}
        <Stack.Screen
          name="Place"
          component={Place}
          options={{
            headerTitleStyle: {
              fontSize: 25,
              color:"white"
            },
            headerTitle: "Place",
            headerTitleAlign: "center",
            headerStyle:{
              backgroundColor: '#0085E6',
            }
          }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

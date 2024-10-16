// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import HomePage from './Pages/Home/Index';
// import TopHeader from './Componants/TopHeader/Index';

// export default function App() {
//   return (
//     <>
//      <TopHeader/>
//      <HomePage/>
//     </>
//   );
// }

// const styles = StyleSheet.create({
  
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './Pages/Home/Index';
 
const Stack = createNativeStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage}  options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
 
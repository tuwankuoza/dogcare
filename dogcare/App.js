import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './stores/index'

import intro from './screens/intro';
import homePage from './screens/homePage';
import detailPage from './screens/detailPage';

export default function App({navigation}) {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="intro" component={intro} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={homePage} options={{ headerShown: false }}/>
          <Stack.Screen name="Detail" component={detailPage}
                  options={{
                    headerShown: true,
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: '#FFC163' },
                    headerShadowVisible: false,
                    headerTitleStyle: { color: "black" },
                    headerTintColor: "black"
                  }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

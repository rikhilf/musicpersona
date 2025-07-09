import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { maybeCompleteAuthSession } from 'expo-auth-session';
import React from 'react';
import { Appearance } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import ResultScreen from './screens/ResultScreen';
import { getTheme } from './theme';

maybeCompleteAuthSession();

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  const theme = getTheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
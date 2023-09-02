import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { dark, primary } from './theme/colors';
import TasksScreen from './screens/TasksScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();
export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      } persistor={persistor}>

        <NavigationContainer>
          <StatusBar style={"light"} />
          <Stack.Navigator>
            <Stack.Screen name="Home"
              options={{
                headerStyle: {
                  backgroundColor: dark,
                },
                headerTitleStyle: {
                  color: '#fff'
                }
              }}
              component={HomeScreen} />
            <Stack.Screen name="Tasks"
              options={{
                headerStyle: {
                  backgroundColor: dark,
                },
                headerTitleStyle: {
                  color: '#fff'
                },
                headerTitle: "Goals"
              }}
              component={TasksScreen} />
            <Stack.Screen name="About"
              options={{
                headerStyle: {
                  backgroundColor: dark,
                },
                headerTitleStyle: {
                  color: '#fff'
                }
              }}
              component={AboutScreen} />
          </Stack.Navigator>

        </NavigationContainer>

      </PersistGate>
    </Provider>
  );
}
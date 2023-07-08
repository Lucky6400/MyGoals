import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { dark } from './theme/colors';
import TasksScreen from './screens/TasksScreen';

const Stack = createStackNavigator();
export default function App() {

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={
        <ActivityIndicator size="large" color="#00ff00" />
      } persistor={persistor}>

        <StatusBar style="light" />
        <NavigationContainer>
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
                }
              }}
              component={TasksScreen} />
              
          </Stack.Navigator>

        </NavigationContainer>

      </PersistGate>
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigator } from './app/navigation/AppNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './app/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { setupNotifications } from './app/services/notification-service';
setupNotifications();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <AppNavigator />
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
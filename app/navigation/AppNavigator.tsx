import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './BottomTabNavigator';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { useLocation } from '../hooks/locationHook';
import { Platform } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';


export const AppNavigator = () => {
    useEffect(() => {
        // Handle notification tapped (app in background/killed)
        const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(async () => {            
            await BackgroundGeolocation.setConfig({ heartbeatInterval: 0 })
            await BackgroundGeolocation.stopWatchPosition();
            console.log('Background location tracking stopped');
        });

        return () => {
            backgroundSubscription.remove();
        };
    }, []); 
    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    );
}
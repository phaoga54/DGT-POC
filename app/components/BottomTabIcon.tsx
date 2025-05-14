import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
type Props = {
    tab: "Locations" | "Settings"
    focused: boolean
}
const iconMap = {
    Locations: (focused: boolean) => (
        <Ionicons
            name="location-outline"
            size={24}
            color={focused ? '#2196F3' : '#666'}
        />
    ),
    Settings: (focused: boolean) => (
        <Ionicons
            name="settings"
            size={24}
            color={focused ? '#2196F3' : '#666'}
        />
    ),
};

export const BottomTabIcon = ({ focused, tab }: Props) => {
    return iconMap[tab](focused);
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
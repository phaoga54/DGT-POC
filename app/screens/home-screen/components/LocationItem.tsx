import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MappedLocationType } from '../../../constant/types';

interface LocationItemComponentProps {
    item: MappedLocationType;
    onDelete: (item: MappedLocationType) => void;
}

export const LocationItemComponent: React.FC<LocationItemComponentProps> = ({ item, onDelete }) => {
    const openMap = () => {
        const latitude = item.latitude;
        const longitude = item.longitude;
        const label = 'Tracked Location';
        const url = Platform.select({
            ios: `maps:${latitude},${longitude}?q=${encodeURIComponent(label)}`,
            android: `geo:${latitude},${longitude}?q=${encodeURIComponent(label)}`,
        });
    
        Linking.openURL(url || '');
    };
    // Format date to YYYY/MM/DD - HH:mm:ss
    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
    };

    const handleDelete = (): void => {
        if (onDelete) {
            onDelete(item);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={openMap}>
            <View style={styles.infoContainer}>
                <Text style={styles.text}>Latitude: {item.latitude}</Text>
                <Text style={styles.text}>Longitude: {item.longitude}</Text>
                <Text style={styles.text}>Timestamp: {formatDate(item.timestamp)}</Text>
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={handleDelete}
            >
                <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    infoContainer: {
        flex: 1,
    },
    text: {
        fontSize: 16,
        marginBottom: 2,
    },
    deleteButton: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
import { Alert } from "react-native";
import { MappedLocationType } from "../constant/types";
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';

export const calculateDistance = (loc1: MappedLocationType, loc2: MappedLocationType): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

// 1. PERMISSIONS REQUEST
export const requestLocationPermissions = async () => {
    try {
        // Request location permission
        const permissionStatus = await BackgroundGeolocation.requestPermission();
        console.log('[requestPermission] Status:', permissionStatus);

        // Check current permission state
        const providerState = await BackgroundGeolocation.getProviderState();
        console.log('[getProviderState]', providerState);

        return permissionStatus;
    } catch (error) {
        console.error('[requestPermission] Error:', error);
        throw error;
    }
};

// 2. BACKGROUND GEOLOCATION CONFIGURATION
export const configureBackgroundGeolocation = async () => {
    try {
        const state = await BackgroundGeolocation.ready({
            // Location Config
            desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
            distanceFilter: 10, // meters

            // Activity Recognition
            stopTimeout: 1, // minutes

            // App Config
            debug: true, // Remove in production
            logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
            stopOnTerminate: false,
            startOnBoot: false,

            // Permission settings
            locationAuthorizationRequest: 'Always',
            backgroundPermissionRationale: {
                title: "Allow location access",
                message: "This app needs location access in background to track your position",
                positiveAction: "Allow",
                negativeAction: "Deny"
            }
        });

        console.log('[BackgroundGeolocation ready] State:', state);
        return state;
    } catch (error) {
        console.error('[BackgroundGeolocation ready] Error:', error);
        throw error;
    }
};

// 3. WATCH POSITION CONFIGURATION
export const startWatchPosition = (intervalSeconds = 8, onLocationFetched: (location: MappedLocationType) => void) => {
    // Start watchPosition with your configuration
    BackgroundGeolocation.watchPosition(
        // Success callback
        (location) => {
            const { coords: { latitude, longitude }, timestamp } = location;
            const mappedLocation: MappedLocationType = {
                latitude,
                longitude,
                timestamp: new Date(timestamp).getTime(),
            };
            onLocationFetched(mappedLocation);
        },
        // Error callback
        (error) => {
            console.error('[watchPosition] Error:', error);
            // Handle error (e.g., GPS disabled, permission denied)
        },
        // Options
        {
            interval: intervalSeconds * 1000, // Convert seconds to milliseconds
            persist: false, // Save to SQLite database
            desiredAccuracy: 10, // meters
            timeout: 30, // seconds
            extras: {
                // Custom metadata you want to attach
                source: 'watchPosition',
                timestamp: Date.now()
            }
        }
    );
};

// 4. STOP WATCH POSITION
export const stopWatchPosition = async () => {
    try {
        await BackgroundGeolocation.stopWatchPosition();
        console.log('[stopWatchPosition] Stopped successfully');
    } catch (error) {
        console.error('[stopWatchPosition] Error:', error);
    }
};
 
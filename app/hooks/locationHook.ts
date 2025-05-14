import { Alert } from 'react-native';
import { MappedLocationType } from '../constant/types';
import { useDispatch } from 'react-redux';
import { clearLocations, deleteLocationAction } from '../redux/slices/location-slice';

import BackgroundGeolocation from 'react-native-background-geolocation';
import { sendNotification } from '../services/notification-service';
const MIN_MOVEMENT_DISTANCE = 1; // meters
export const useLocation = () => {
    const dispatch = useDispatch();

    const startMovementTracking = async (
        heartBeatInteval: number = 10 * 60,
        shouldSendNotification: boolean = true
    ) => {

        try {
            await configureBackgroundGeolocation(heartBeatInteval);
            // Set up heartbeat listener for interval checking
            BackgroundGeolocation.onHeartbeat((event) => {
                console.log('[onHeartbeat] Checking location');

                if (shouldSendNotification) sendNotification('From Background: You are not moving', 'You are not moving for some time, are you ok?');
            });

            await BackgroundGeolocation.start();

            console.log('[startMovementTracking] Started with interval');
        } catch (error) {
            console.error('[startMovementTracking] Error:', error);
            throw error;
        }
    };

    const stopMovementTracking = async () => {
        try {
            await BackgroundGeolocation.stop();
            console.log('[stopMovementTracking] Stopped');
        } catch (error) {
            console.error('[stopMovementTracking] Error:', error);
            throw error;
        }
    };

    const requestLocationPermissions = async () => {
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
    const configureBackgroundGeolocation = async (heartbeatInterval: number = 10 * 60) => {
        try {
            const state = await BackgroundGeolocation.ready({
                // Location Config
                desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
                distanceFilter: MIN_MOVEMENT_DISTANCE, // meters

                // Activity Recognition
                stopTimeout: 1, // minutes
                heartbeatInterval: heartbeatInterval, // seconds
                preventSuspend: true,
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

            return state;
        } catch (error) {
            console.error('[BackgroundGeolocation ready] Error:', error);
            throw error;
        }
    };
    const startWatchPosition = (intervalSeconds = 8, onLocationFetched: (location: MappedLocationType) => void) => {
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
    const stopWatchPosition = async () => {
        try {
            await BackgroundGeolocation.stopWatchPosition();
            console.log('[stopWatchPosition] Stopped successfully');
        } catch (error) {
            console.error('[stopWatchPosition] Error:', error);
        }
    };

    const resetLocations = () => {
        dispatch(clearLocations());
        Alert.alert('Locations Cleared')
    };

    const deleteLocation = (location: MappedLocationType) => {
        dispatch(deleteLocationAction(location.timestamp));
    }
    const updateFetchingInterval = ({
        locationMovementInterval
    }: { locationMovementInterval?: number }) => {
        
        BackgroundGeolocation.setConfig({
            heartbeatInterval:locationMovementInterval
        });
    }
    
    return {
        startMovementTracking,
        stopMovementTracking,
        requestLocationPermissions,
        configureBackgroundGeolocation,
        startWatchPosition,
        stopWatchPosition,
        resetLocations,
        deleteLocation,

        updateFetchingInterval
    };
};
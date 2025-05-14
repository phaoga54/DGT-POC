export interface MappedLocationType {
    latitude: number;
    longitude: number;
    timestamp: number;
}

// Define the interface for our settings state
export interface SettingsState {
    fetchLocationInterval: number;
    isNotificationOn: boolean;
    movementCheckingInterval: number;
  }
  
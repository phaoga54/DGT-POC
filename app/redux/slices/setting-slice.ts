import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../constant/types';


// Define the initial state
const initialState: SettingsState = {
  fetchLocationInterval: 8,
  movementCheckingInterval: 10 * 60,
  isNotificationOn: true,
};

// Create the settings slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // Action to update fetch location interval
    setFetchLocationInterval: (state, action: PayloadAction<number>) => {
      state.fetchLocationInterval = action.payload;
    },
    setmovementCheckingInterval: (state, action: PayloadAction<number>) => {
      state.movementCheckingInterval = action.payload;
    },
    // Action to update notification setting
    setIsNotificationOn: (state, action: PayloadAction<boolean>) => {
      state.isNotificationOn = action.payload;
    },
    // Optional: Action to reset all settings to default
    resetSettings: (state) => {
      state.fetchLocationInterval = initialState.fetchLocationInterval;
      state.isNotificationOn = initialState.isNotificationOn;
    },
  },
});

// Export action creators
export const { 
  setFetchLocationInterval, 
  setmovementCheckingInterval,
  setIsNotificationOn, 
  resetSettings 
} = settingsSlice.actions;

// Export the reducer
export default settingsSlice.reducer;

// Export the initial state for testing purposes (optional)
export { initialState };

// Export selector functions for getting values
export const selectFetchLocationInterval = (state: { settings: SettingsState }) => 
  state.settings.fetchLocationInterval;

export const selectIsNotificationOn = (state: { settings: SettingsState }) => 
  state.settings.isNotificationOn;
export const selectMovementCheckingInterval = (state: { settings: SettingsState }) =>
  state.settings.movementCheckingInterval;
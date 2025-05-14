import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MappedLocationType } from '../../constant/types'

// Define the state interface
interface LocationState {
  locations: MappedLocationType[]
}

// Define the initial state
const initialState: LocationState = {
  locations: []
}

// Create the location slice
const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    // Add a new location to the array
    addLocation: (state, action: PayloadAction<MappedLocationType>) => {
      state.locations.push(action.payload)
    },
    
    // Delete a location by timestamp
    deleteLocationAction: (state, action: PayloadAction<number>) => {
      state.locations = state.locations.filter(location => location.timestamp !== action.payload)
    },
    
    // Clear the entire locations array
    clearLocations: (state) => {
      state.locations = []
    }
  }
})

// Export actions
export const { addLocation, deleteLocationAction, clearLocations } = locationSlice.actions

// Selector to get all locations
export const selectLocations = (state: { location: LocationState }) => state.location.locations

// Export the reducer
export default locationSlice.reducer
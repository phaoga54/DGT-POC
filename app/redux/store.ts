import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import locationSlice from './slices/location-slice';
import settingSlice from './slices/setting-slice';

// Root state type
export type RootState = ReturnType<typeof appReducer>;

// Combined reducers
const appReducer = combineReducers({
    location: locationSlice,
    settings: settingSlice,
});

// Persist configuration
const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: AsyncStorage,
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Configure store with persisted reducer
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

// Infer the RootState and AppDispatch types from the store
export type AppDispatch = typeof store.dispatch;
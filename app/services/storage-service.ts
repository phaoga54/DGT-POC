import AsyncStorage from '@react-native-async-storage/async-storage';

// Get value from AsyncStorage - returns any type or null
export const getValue = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    
    if (value !== null) {
      try {
        // Try to parse as JSON, in case it's a stored object/array
        return JSON.parse(value);
      } catch (e) {
        // If it's not valid JSON, return as string
        return value;
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error getting value for key "${key}":`, error);
    return null;
  }
};

// Add/Set value in AsyncStorage
export const setValue = async (key: string, value: any): Promise<boolean> => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`Error setting value for key "${key}":`, error);
    return false;
  }
};

// Remove value from AsyncStorage
export const removeValue = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing value for key "${key}":`, error);
    return false;
  }
};
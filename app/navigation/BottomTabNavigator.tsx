import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home-screen';
import { SettingScreen } from '../screens/setting-screen';
import { BottomTabIcon } from '../components/BottomTabIcon';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Locations" component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Locations',
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon focused={focused} tab='Locations' />
                    ),
                }}
            />
            <Tab.Screen name="Settings" component={SettingScreen}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused }) => (
                        <BottomTabIcon focused={focused} tab='Settings' />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
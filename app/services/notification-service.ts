import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export const setupNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};


export const requestPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  
  if(existingStatus !== Notifications.PermissionStatus.GRANTED) {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
      android: {
        priority: Notifications.AndroidNotificationPriority.HIGH,
      },
    });
    if (status !== 'granted') {
      console.error('Notification permissions not granted');
      return false;
    }
  }

  return true;
}

export const sendNotification = async (title: string, body: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
    },
    trigger: null,
  });
}
export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}
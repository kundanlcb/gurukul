// src/services/notificationService.ts

// import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

class NotificationService {
  async requestUserPermission() {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    // if (enabled) {
    //   console.log('Authorization status:', authStatus);
    // }
    console.log('Notification permission request stubbed');
    return true;
  }

  async getToken() {
    // const token = await messaging().getToken();
    // console.log('FCM Token:', token);
    // return token;
    console.log('Get FCM Token stubbed');
    return 'clean-stub-token';
  }

  setupForegroundListener() {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('New Notification', remoteMessage.notification?.body);
    // });
    // return unsubscribe;
    console.log('Foreground listener setup stubbed');
    return () => {};
  }
}

export const notificationService = new NotificationService();

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState, Linking, PermissionsAndroid, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import Geolocation from '@react-native-community/geolocation';

export async function createChannel() {
  PushNotification.createChannel({
    channelId: 'lioushealthcare',
    channelName: 'lioushealthcare',
    channelDescription: 'lioushealthcare',
    importance: 4,
    vibrate: true,
    smallIcon: 'ic_notification',
    largeIcon: 'ic_launcher',
  });
}

export async function requestUserPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFcmToken();
    } else {
      console.log('notification disabled');
    }
  } catch (err) {
    console.warn(err);
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('fcmToken', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('New token stored successfully in asynStorage', fcmToken);
      }
    } catch (error) {
      console.log(error, ' error in storing/retrieving fcm token');
      console.log(error.message);
    }
  }
};

const handleNotification = (body, title, clickAction) => {
  PushNotification.localNotification({
    channelId: 'lioushealthcare', // Use the correct channel ID
    title: title,
    message: body,
    smallIcon: 'app_logo',
    largeIcon: 'app_logo',
  });

  const isInBackground = AppState.currentState !== 'active';
};

export async function openApp() {
  console.log('20');
  messaging().onMessage(async remoteMessage => {
    console.log('remoteMessage remoteMessage', remoteMessage);
    useNotification(remoteMessage);
  });
}

const useNotification = remoteMessage => {
  try {
    const data = remoteMessage;

    if (data && data.data) {
      const {body, title, clickAction} = data.data;
      handleNotification(body, title, clickAction);
    }
  } catch (error) {
    console.error('Error parsing remoteMessage.data:', error);
  }
};

export const getLocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject);
    });

    const {coords} = position;
    return coords; // Return the coordinates
  } catch (error) {
    console.error('Error getting location:', error);
    return null; // Return null in case of error
  }
};

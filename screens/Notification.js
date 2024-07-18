import React, { useEffect } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function MyNotificationScreen() {
  useEffect(() => {
    // Subscribe to notifications when the component mounts
    Notifications.addNotificationReceivedListener(handleNotification);
    
    // Clean up by unsubscribing from notifications when the component unmounts
    return () => {
      Notifications.removeNotificationReceivedListener(handleNotification);
    };
  }, []);

  useEffect(() => {
    // Set up a notification handler to handle notifications in the background
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }, []);

  const handleNotification = (notification) => {
    // Display the notification content
    Alert.alert(
      notification.request.content.title,
      notification.request.content.body,
    );
  };

  const handleNotificationButtonPress = async () => {
    // Send a test notification
    await sendNotification();
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'My Notification',
        body: 'This is a test notification',
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>My Notification Screen</Text>
      <Button title="Send Notification" onPress={handleNotificationButtonPress} />
    </View>
  );
}

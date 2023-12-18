import { useState, useEffect } from "react";
import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
  OSNotification,
  OneSignal,
  NotificationWillDisplayEvent,
} from "react-native-onesignal";

import { AppRoutes } from "./app.routes";

import { Notification } from "../components/Notification";

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const onReceived = (event: NotificationWillDisplayEvent) => {
    const response = event.notification;
    if (response) {
      setNotification(response);
    }
  };

  useEffect(() => {
    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      onReceived
    );

    return () => {
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        onReceived
      );
    };
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {notification?.title && (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      )}
    </NavigationContainer>
  );
}

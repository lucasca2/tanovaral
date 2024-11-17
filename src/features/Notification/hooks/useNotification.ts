import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const useNotification = () => {
  const handleGetScheduledNotifications =
    Notifications.getAllScheduledNotificationsAsync;

  const handleScheduleNotification = Notifications.scheduleNotificationAsync;

  const handleCancelScheduledNotification =
    Notifications.cancelScheduledNotificationAsync;

  useEffect(() => {
    async function log() {
      const allNotifications = await handleGetScheduledNotifications();

      console.log(
        "allNotifications > ",
        JSON.stringify(
          allNotifications.map((n) => JSON.parse(n.identifier)),
          null,
          2
        )
      );
    }

    log();
  }, []);

  return {
    scheduleNotification: handleScheduleNotification,
    getScheduledNotifications: handleGetScheduledNotifications,
    cancelScheduledNotification: handleCancelScheduledNotification,
  };
};

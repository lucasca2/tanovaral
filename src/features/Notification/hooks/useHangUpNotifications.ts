import {
  Day,
  Days,
  useOnboarding,
} from "@/features/Onboarding/providers/useOnboarding";
import { useNotification } from "./useNotification";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { useCallback, useEffect } from "react";
import { useTakeDownNotifications } from "./useTakeDownNotifications copy";

export const DAY_NUMBER: Record<Day, number> = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
};

export const useHangUpNotifications = () => {
  const { days } = useOnboarding();
  const { getTakeDownNotifications } = useTakeDownNotifications();
  const {
    scheduleNotification,
    getScheduledNotifications,
    cancelScheduledNotification,
  } = useNotification();

  const getHangUpNotifications = useCallback(async () => {
    const scheduledNotifications = await getScheduledNotifications();
    const hangUpNotifications = scheduledNotifications
      .filter((notification) => {
        const identifier = JSON.parse(notification.identifier);
        return identifier.type === "hangup";
      })
      .map((notification) => ({
        ...notification,
        identifier: JSON.parse(notification.identifier),
      }));

    return hangUpNotifications;
  }, []);

  const getHangupNotificationsByDay = useCallback(
    async ({ day }: { day: Day }) => {
      const hangUpNotifications = await getHangUpNotifications();
      const notificationsByDay = hangUpNotifications.filter((notification) => {
        return notification.identifier.day === day;
      });

      return notificationsByDay;
    },
    []
  );

  const getIdentifier = ({ day, index }: { day: Day; index: number }) => {
    return JSON.stringify({
      index,
      type: "hangup",
      day,
      dayNumber: DAY_NUMBER[day],
    });
  };

  const createHangUpNotifications = useCallback(async () => {
    if (!days) return;

    await Promise.all(
      Object.keys(days).map(async (_day) => {
        const day = _day as Day;

        if (!days[day]) return;

        const notificationsByDay = await getHangupNotificationsByDay({
          day,
        });

        const hasAlreadyScheduled = notificationsByDay.length > 0;

        if (hasAlreadyScheduled) return;

        await scheduleNotification({
          content: {
            title: "Hoje é dia de lavar e estender 🧼",
            body: "Não esqueça de nos avisar no App o momento em que estender as roupas!",
          },
          trigger: {
            type: SchedulableTriggerInputTypes.WEEKLY,
            weekday: DAY_NUMBER[day as Day],
            hour: 10,
            minute: 0,
          },
          identifier: getIdentifier({ index: 0, day }),
        });

        await scheduleNotification({
          content: {
            title: "Cadê as roupas no varal? 🌬",
            body: "Confira se as roupas estão lavadas e aproveite para estender. Não esqueça de nos avisar pelo App!",
          },
          trigger: {
            type: SchedulableTriggerInputTypes.WEEKLY,
            weekday: DAY_NUMBER[day],
            hour: 14,
            minute: 0,
          },
          identifier: getIdentifier({ index: 1, day }),
        });
      })
    );
  }, [days]);

  const cancelHangUpNotifications = useCallback(async () => {
    const hangupNotifications = await getHangUpNotifications();

    await Promise.all(
      hangupNotifications.map(async (notification) => {
        await cancelScheduledNotification(
          JSON.stringify(notification.identifier)
        );
      })
    );
  }, []);

  const renewHangUpNotifications = useCallback(async () => {
    const takeDownNotifications = await getTakeDownNotifications();
    const hasTakeDownNotifications = takeDownNotifications.length > 0;

    // Because it means that the user never take down the clothes
    if (hasTakeDownNotifications) return;

    await createHangUpNotifications();
  }, [createHangUpNotifications]);

  useEffect(() => {
    renewHangUpNotifications();
  }, [renewHangUpNotifications]);

  return {
    createHangUpNotifications,
    cancelHangUpNotifications,
  };
};

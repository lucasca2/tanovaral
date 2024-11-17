import { useCallback, useEffect } from "react";
import dayjs from "dayjs";
import {
  NotificationRequestInput,
  SchedulableTriggerInputTypes,
} from "expo-notifications";

import { useNotification } from "@/features/Notification/hooks/useNotification";
import { Day } from "@/features/Onboarding/providers/useOnboarding";

export const DAY_NUMBER: Record<Day, number> = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
};

const NOTIFICATIONS = [
  {
    title: "Roupa estendida há 1 dia!",
    body: "Talvez esteja na hora de dar um pulinho no varal.",
  },
  {
    title: "Roupa estendida há 2 dias!",
    body: "Acho que essa roupa já secou mais do que devia, não?!",
  },
  {
    title: "3 dias no varal? 🫣",
    body: "Você já recolheu e esqueceu de nos avisar? Hora de atualizar o App.",
  },
];

export const useTakeDownNotifications = () => {
  const {
    getScheduledNotifications,
    scheduleNotification,
    cancelScheduledNotification,
  } = useNotification();

  const getTakeDownNotifications = useCallback(async () => {
    const scheduledNotifications = await getScheduledNotifications();
    const takeDownNotifications = scheduledNotifications
      .filter((notification) => {
        const identifier = JSON.parse(notification.identifier);
        return identifier.type === "takedown";
      })
      .map((notification) => ({
        ...notification,
        identifier: JSON.parse(notification.identifier),
      }));

    return takeDownNotifications;
  }, []);

  const getIdentifier = ({
    day,
    index,
    date,
  }: {
    day: Day;
    index: number;
    date: Date;
  }) => {
    return JSON.stringify({
      index,
      type: "takedown",
      day,
      dayNumber: DAY_NUMBER[day],
      date,
    });
  };

  const generateNextDaysNotifications = ({
    from,
  }: {
    from: Date;
  }): NotificationRequestInput[] => {
    return Array.from({ length: 10 }).map((_, index) => {
      const day = dayjs(from).add(index + 1, "day");

      const notification = NOTIFICATIONS?.[index] || {
        title: "A roupa ainda tá no varal?",
        body: `Já fazem mais de ${
          index + 1
        } dias que você estendeu. Você já recolheu e esqueceu de nos avisar?`,
      };

      return {
        content: {
          title: notification.title,
          body: notification.body,
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: day.toDate(),
        },
        identifier: getIdentifier({
          index: index + 1,
          date: day.toDate(),
          day: day.format("dddd").toLowerCase() as Day,
        }),
      };
    });
  };

  const createTakeDownNotifications = useCallback(
    async ({ dryingTime }: { dryingTime: number }) => {
      const today = dayjs().add(dryingTime, "seconds");
      const todayName = today.format("dddd").toLowerCase() as Day;
      const nextDaysNotifications = generateNextDaysNotifications({
        from: today.toDate(),
      });

      await Promise.all([
        await scheduleNotification({
          content: {
            title: "Segundo meus cálculos, sua roupa já ta seca! 🧼",
            body: "Não esqueça de nos avisar no App o momento em que recolher as roupas!",
          },
          trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date: dayjs().add(dryingTime, "seconds").toDate(),
          },
          identifier: getIdentifier({
            index: 0,
            day: todayName,
            date: today.toDate(),
          }),
        }),
        ...nextDaysNotifications.map(async (notification) => {
          await scheduleNotification(notification);
        }),
      ]);
    },
    []
  );

  const cancelTakeDownNotifications = useCallback(async () => {
    const TakeDownNotifications = await getTakeDownNotifications();

    await Promise.all(
      TakeDownNotifications.map(async (notification) => {
        await cancelScheduledNotification(
          JSON.stringify(notification.identifier)
        );
      })
    );
  }, []);

  return {
    createTakeDownNotifications,
    cancelTakeDownNotifications,
    getTakeDownNotifications,
  };
};

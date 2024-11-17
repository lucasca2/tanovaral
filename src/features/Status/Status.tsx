import { useMemo, useState } from "react";
import { Toggle } from "native-design-system";
import { useLogs } from "@/features/Logs/providers/useLogs";

import { Wrapper, WrapperToggle, Label } from "@/features/Status/Status.styles";

import { Image } from "@/features/Status/components/Image/Image";
import { LastLog } from "@/features/Status/components/LastLog/LastLog";
import { useHangUpNotifications } from "../Notification/hooks/useHangUpNotifications";
import { useTakeDownNotifications } from "../Notification/hooks/useTakeDownNotifications copy";
import { useLocation } from "../Location/hooks/useLocation";

export const Status = () => {
  const { log, lastLog } = useLogs();
  const { getCurrentLocation } = useLocation();
  const { cancelHangUpNotifications, createHangUpNotifications } =
    useHangUpNotifications();
  const { createTakeDownNotifications, cancelTakeDownNotifications } =
    useTakeDownNotifications();

  const isOnClothesline = useMemo(() => {
    if (lastLog?.type === "hangup") return true;
    if (lastLog?.type === "takedown") return false;

    return false;
  }, [lastLog]);

  const handleToggleOnClothesline = async () => {
    log({ type: isOnClothesline ? "takedown" : "hangup" });
    // If user toggle a lot of times, the notifications will be right, because we are always canceling the old one and then creating a new one

    if (isOnClothesline) {
      // Cancel taking down notifications
      await cancelTakeDownNotifications();

      // Reschedule hanging up notifications
      await createHangUpNotifications();
    } else {
      // Make a calculation of how many hours the clothes will take to dry based on weather information
      const { weather } = await getCurrentLocation();

      console.log(JSON.stringify(weather, null, 2));
      //
      // Cancel ALL hanging up's notification (for every day of the week)
      // Why? Because if the user hangs up the clothes today, we don't need to notify him to hang up the clothes tomorrow, because the clothes will be already hanged up........
      // So we need to wait for taking down the clothes to reschedule the notifications
      await cancelHangUpNotifications();

      // Create notification for taking down the clothes
      await createTakeDownNotifications({ dryingTime: 10 });
    }
  };

  return (
    <Wrapper>
      <Image isOnClothesline={isOnClothesline} />

      <WrapperToggle>
        <Toggle
          size="md"
          onChange={handleToggleOnClothesline}
          value={isOnClothesline}
        />
        <Label>{isOnClothesline ? "Tá no varal" : "Não tá no varal"}</Label>
      </WrapperToggle>

      <LastLog />
    </Wrapper>
  );
};

import { useLogs } from "@/features/Logs/providers/useLogs";
import { Text } from "@/features/Status/components/LastLog/LastLog.styles";
import dayjs from "dayjs";
import { useMemo } from "react";

const TEXT_BY_LOG = {
  hangup: "Estendido",
  takedown: "Recolhido",
};

export const LastLog = () => {
  const { lastLog } = useLogs();

  const lastLogText = useMemo(() => {
    if (!lastLog) return "Você ainda não estendeu.";

    const formattedDate = dayjs(lastLog.date).format("DD/MM [às] HH:mm");

    return `${TEXT_BY_LOG[lastLog.type]} ${formattedDate}`;
  }, [lastLog]);

  return <Text>{lastLogText}</Text>;
};

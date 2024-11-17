import { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type LogType = "hangup" | "takedown";

export type Log = {
  type: LogType;
  date: Date;
};

interface LogsContextProps {
  logs: Log[];
  log: (params: { type: LogType }) => void;
  lastLog?: Log;
  isEmpty?: boolean;
}

const LogsKey = "@tanovaral/logs";

const LogsContext = createContext({} as LogsContextProps);

interface LogsProviderProps {
  children: React.ReactNode;
}

function LogsProvider({ children }: LogsProviderProps) {
  const [logs, setLogs] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLog = async ({ type }: { type: LogType }) => {
    const newLog = { type, date: new Date() };
    const updatedLogs = [newLog, ...logs];

    setLogs(updatedLogs);

    await AsyncStorage.setItem(LogsKey, JSON.stringify(updatedLogs));
  };

  const fetchInitialLogs = async () => {
    const initialLogs = await AsyncStorage.getItem(LogsKey);
    setLogs(initialLogs ? JSON.parse(initialLogs) : []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitialLogs();
  }, []);

  const lastLog = useMemo(() => {
    return logs?.[0];
  }, [logs]);

  const isEmpty = useMemo(() => {
    return logs?.length === 0 && !isLoading;
  }, [logs, isLoading]);

  return (
    <LogsContext.Provider
      value={{
        logs: logs || [],
        log: handleLog,
        lastLog,
        isEmpty,
      }}
    >
      {children}
    </LogsContext.Provider>
  );
}

function useLogs(): LogsContextProps {
  return useContext(LogsContext);
}

export { LogsProvider, useLogs };

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type Days = Record<Day, boolean>;

interface OnboardingContextProps {
  days?: Days;
  complete: (params: { days: Days }) => void;
  hasComplete?: boolean;
  isLoading?: boolean;
}

const OnboardingKey = {
  complete: "@tanovaral/onboarding:complete",
  days: "@tanovaral/onboarding:days",
};

const OnboardingContext = createContext({} as OnboardingContextProps);

interface OnboardingProviderProps {
  children: React.ReactNode;
}

function OnboardingProvider({ children }: OnboardingProviderProps) {
  const [days, setDays] = useState<Days>();

  // It's completed until proven otherwise
  const [hasComplete, setHasComplete] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const handleComplete = async (params: { days: Days }) => {
    setDays(params.days);

    await AsyncStorage.setItem(OnboardingKey.days, JSON.stringify(params.days));
    await AsyncStorage.setItem(OnboardingKey.complete, JSON.stringify(true));

    setHasComplete(true);
  };

  const fetchInitialData = async () => {
    const checkComplete = await AsyncStorage.getItem(OnboardingKey.complete);

    if (!checkComplete) setHasComplete(false);

    const initialDays = await AsyncStorage.getItem(OnboardingKey.days);
    setDays(initialDays ? JSON.parse(initialDays) : []);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        complete: handleComplete,
        days,
        hasComplete,
        isLoading,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

function useOnboarding(): OnboardingContextProps {
  return useContext(OnboardingContext);
}

export { OnboardingProvider, useOnboarding };

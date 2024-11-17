import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Logs } from "@/features/Logs/Logs";
import { Status } from "@/features/Status/Status";
import { Onboarding } from "@/features/Onboarding/Onboarding";

import { Wrapper } from "@/features/Home/Home.styles";

import { Clouds } from "@/features/Home/components/Clouds/Clouds";
import { Header } from "@/features/Home/components/Header/Header";

export const Home = () => {
  const { top } = useSafeAreaInsets();

  if (!top) return null;

  return (
    <Wrapper safeTop={top}>
      <Clouds />
      <Header />
      <Status />
      <Logs />
      <Onboarding />
    </Wrapper>
  );
};

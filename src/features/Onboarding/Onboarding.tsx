import { useMemo, useState } from "react";
import { Pressable } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BaseIcon, BaseText, Button, Toggle } from "native-design-system";

import {
  Overlay,
  SubTitle,
  Title,
  WeekDayName,
  WeekDayWrapper,
  BottomSheet,
  Header,
  Form,
} from "@/features/Onboarding/Onboarding.styles";
import { useAnimatedStyles } from "@/features/Onboarding/hooks/useAnimatedStyles";
import {
  Day,
  useOnboarding,
} from "@/features/Onboarding/providers/useOnboarding";

const DAYS: { name: Day; label: string }[] = [
  { name: "monday", label: "Segunda-feira" },
  { name: "tuesday", label: "Terça-feira" },
  { name: "wednesday", label: "Quarta-feira" },
  { name: "thursday", label: "Quinta-feira" },
  { name: "friday", label: "Sexta-feira" },
  { name: "saturday", label: "Sábado" },
  { name: "sunday", label: "Domingo" },
];

const daysDefaultValue = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const Onboarding = () => {
  const { complete } = useOnboarding();
  const [selectedDays, setSelectedDays] =
    useState<Record<Day, boolean>>(daysDefaultValue);

  const { bottom } = useSafeAreaInsets();
  const { bottomSheetStyles, overlayStyles, handleBottomSheetOnLayout } =
    useAnimatedStyles();

  const handleComplete = () => {
    if (selectedDays) {
      return complete({
        days: selectedDays,
      });
    }
  };

  const isAllowedToSubmit = useMemo(() => {
    if (Object.values(selectedDays).includes(true)) return true;

    return false;
  }, [selectedDays]);

  const handleSelectDay = (day: Day) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <>
      <Overlay style={overlayStyles} />
      <BottomSheet
        onLayout={handleBottomSheetOnLayout}
        style={bottomSheetStyles}
        safeBottom={bottom}
      >
        <Header>
          <Title>Bem vindo!</Title>
          <SubTitle>
            Em quais dias da semana você costuma lavar suas roupas?
          </SubTitle>
        </Header>
        <Form>
          {DAYS.map((day, index) => (
            <Pressable
              key={`${day.name}-${index}`}
              onPress={() => handleSelectDay(day.name)}
            >
              <WeekDayWrapper>
                <Toggle
                  onChange={() => handleSelectDay(day.name)}
                  value={selectedDays[day.name]}
                />
                <WeekDayName>{day.label}</WeekDayName>
              </WeekDayWrapper>
            </Pressable>
          ))}
        </Form>
        <Button.Link variant="color" onPress={handleComplete} size={5} disabled={!isAllowedToSubmit}>
          <Button.Text>Continuar</Button.Text>
          <Button.Icon name="arrow-right" size={3}/>
        </Button.Link>
      </BottomSheet>
    </>
  );
};

import { BaseText } from "native-design-system";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";

export const Overlay = styled(Animated.View)`
  /* Animated Styles */
  opacity: 0;

  /* ------- */
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(224, 242, 254, 0.7);
`;

type BottomSheetProps = {
  safeBottom: number;
};

export const BottomSheet = styled(Animated.View)<BottomSheetProps>`
  /* Animated Styles */
  opacity: 0;

  /* ------- */

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.primary.base.white};

  border-top-right-radius: ${({ theme }) => theme.space[10]};
  border-top-left-radius: ${({ theme }) => theme.space[10]};
  padding: ${({ theme }) => theme.space[10]};
  padding-bottom: ${({ theme, safeBottom }) =>
    safeBottom + theme.raw.space[10]}px;

  align-items: center;
  gap: ${({ theme }) => theme.space[10]};
`;

export const Header = styled.View`
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
  max-width: 240px;
`;

export const Title = styled(BaseText).attrs({
  size: "6",
  weight: 500,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[800]};
  text-align: center;
`;

export const SubTitle = styled(BaseText).attrs({
  size: "4",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[400]};
  text-align: center;
`;

export const Form = styled.View`
  gap: ${({ theme }) => theme.space[4]};
`;

export const WeekDayWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const WeekDayName = styled(BaseText).attrs({
  size: "4",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[800]};
`;

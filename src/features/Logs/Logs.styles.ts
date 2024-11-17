import { BaseText } from "native-design-system";
import styled from "styled-components/native";
import { Log } from "./providers/useLogs";
import { FlatList } from "react-native";

export const Wrapper = styled.View`
  margin-left: ${({ theme }) => theme.raw.space[6] * -1}px;
  margin-right: ${({ theme }) => theme.raw.space[6] * -1}px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondary.blueLight[25]};
`;

export const Title = styled(BaseText).attrs({
  size: "3",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[700]};
`;

type LogsListProps = {
  safeBottom: number;
};

export const LogsList = styled(FlatList<Log>).attrs<LogsListProps>(
  ({ theme, safeBottom }) => ({
    contentContainerStyle: {
      gap: theme.raw.space[8],
      padding: theme.raw.space[8],
      paddingBottom: theme.raw.space[8] + (safeBottom || 0),
    },
  })
)``;

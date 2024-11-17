import { BaseText } from "native-design-system";
import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Icon = styled.View`
  width: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.space[6]};
  background-color: ${({ theme }) => theme.colors.secondary.grayCool[300]};
  border-radius: ${({ theme }) => theme.borderRadius[1]};
`;

export const WrapperText = styled.View``;

export const Title = styled(BaseText).attrs({
  size: "4",
  weight: 500,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[800]};
`;

export const Subtitle = styled(BaseText).attrs({
  size: "4",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[400]};
`;

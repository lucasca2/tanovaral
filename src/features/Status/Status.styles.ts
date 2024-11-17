import styled from "styled-components/native";

import { BaseText } from "native-design-system";

export const Wrapper = styled.View`
  padding: ${({ theme }) => theme.space[8]};
  background-color: ${({ theme }) => theme.colors.primary.base.white};
  border-radius: ${({ theme }) => theme.space[10]};

  aspect-ratio: 10/9;

  align-items: center;

  gap: ${({ theme }) => theme.space[2]};
`;

export const WrapperToggle = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Label = styled(BaseText).attrs({
  size: "4",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[800]};
  text-align: center;
`;

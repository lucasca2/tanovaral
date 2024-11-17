import styled from "styled-components/native";

import { BaseText } from "native-design-system";

export const Text = styled(BaseText).attrs({
  size: "4",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[400]};
  text-align: center;
`;

import styled from "styled-components/native";
import { BaseText } from "native-design-system";

import TShirtDisabledImage from "@/assets/static/t-shirt-disabled.png";

export const Wrapper = styled.View`
  align-items: center;
  justify-content: center;

  gap: ${({ theme }) => theme.space[4]};
`;

export const TShirtDisabled = styled.Image.attrs({
  source: TShirtDisabledImage,
})`
  width: 64px;
  height: 64px;

  object-fit: contain;
`;

export const Message = styled(BaseText).attrs({
  size: "3",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[400]};
  text-align: center;
`;

import styled from "styled-components/native";
import { BaseText } from "native-design-system";

import TShirtImage from "@/assets/static/t-shirt.png";
import BasketImage from "@/assets/static/basket.png";

export const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

export const Text = styled(BaseText).attrs({
  size: "3",
  weight: 400,
})`
  flex: 1;
  color: ${({ theme }) => theme.colors.secondary.grayCool[600]};
`;

export const Date = styled(BaseText).attrs({
  size: "3",
  weight: 400,
})`
  color: ${({ theme }) => theme.colors.secondary.grayCool[400]};
`;

export const TShirtIcon = styled.Image.attrs({
  source: TShirtImage,
})`
  width: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.space[6]};

  object-fit: contain;
`;

export const BasketIcon = styled.Image.attrs({
  source: BasketImage,
})`
  width: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.space[6]};

  object-fit: contain;
`;

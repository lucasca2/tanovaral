import styled from "styled-components/native";

import ClothesImage from "@/assets/static/clothes.png";
import BasketImage from "@/assets/static/basket.png";

export const Wrapper = styled.View`
  padding: ${({ theme }) => theme.space[4]};
  
  align-items: center;
  justify-content: center;

  width: 100%;
  flex: 1
`;

export const Clothes = styled.Image.attrs({
  source: ClothesImage,
})`
    width: 100%;
    height: 100%;
    
    object-fit: contain;
`;

export const Basket = styled.Image.attrs({
    source: BasketImage,
  })`
      width: 100%;
      height: 100%;

      max-width: 96px;
      max-height: 96px;

      object-fit: contain;
  `;
  
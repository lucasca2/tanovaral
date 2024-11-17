import {
  Basket,
  Clothes,
  Wrapper,
} from "@/features/Status/components/Image/Image.styles";

type ImageProps = {
  isOnClothesline: boolean;
};

export const Image = ({ isOnClothesline }: ImageProps) => {
  return <Wrapper>{isOnClothesline ? <Clothes /> : <Basket />}</Wrapper>;
};

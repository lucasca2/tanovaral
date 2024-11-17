import styled from "styled-components/native";

import LeftCloudImage from "@/assets/static/left-cloud.png";
import RightCloudImage from "@/assets/static/right-cloud.png";

type SafeProps = {
  safeTop?: number;
};

export const WrapperClouds = styled.View<SafeProps>`
  flex-direction: row;

  position: absolute;
  top: ${({ safeTop }) => (safeTop || 0) - 20}px;
  left: -164px;

  height: auto;
`;

export const RightCloud = styled.Image.attrs<SafeProps>({
  source: RightCloudImage,
})`
  width: 400px;
  height: 228px;

  left: ${({ theme }) => theme.raw.space[6] * -1}px;
`;

export const LeftCloud = styled.Image.attrs<SafeProps>({
  source: LeftCloudImage,
})`
  width: 400px;
  height: 228px;
`;
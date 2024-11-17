import {
  SkeletonIcon,
  SkeletonText,
  SkeletonWrapper,
  Wrapper,
  WrapperText,
} from "./Skeleton.styles";

export const Skeleton = () => {
  return (
    <Wrapper>
      <WrapperText>
        <SkeletonIcon />
      </WrapperText>
      <WrapperText>
        <SkeletonWrapper>
          <SkeletonText width={"100px"} />
        </SkeletonWrapper>
        <SkeletonWrapper>
          <SkeletonText width={"80px"} />
        </SkeletonWrapper>
      </WrapperText>
    </Wrapper>
  );
};

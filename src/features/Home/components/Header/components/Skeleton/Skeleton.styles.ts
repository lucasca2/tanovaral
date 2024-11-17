import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.space[2]};
`;

export const WrapperText = styled.View``;

export const SkeletonWrapper = styled.View`
  height: ${({ theme }) => theme.space[6]};
  justify-content: center;
`;

export const SkeletonText = styled.View<{ width: string }>`
  background-color: ${({ theme }) => theme.colors.secondary.grayCool[300]};
  width: ${({ width }) => width};
  height: ${({ theme }) => theme.space[4]};
  border-radius: ${({ theme }) => theme.borderRadius[1]};
`;

export const SkeletonIcon = styled.View`
  height: ${({ theme }) => theme.space[5]};
  width: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[0.5]};
  background-color: ${({ theme }) => theme.colors.secondary.grayCool[300]};
  border-radius: ${({ theme }) => theme.borderRadius[1]};
`;

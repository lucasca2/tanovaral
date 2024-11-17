import styled from "styled-components/native";

type SafeProps = {
  safeTop?: number;
};

export const Wrapper = styled.View<SafeProps>`
  background-color: #c7ebff;
  flex: 1;

  padding: ${({ theme }) => theme.space[8]} ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme, safeTop }) => (safeTop || 0) + theme.raw.space[8]}px;
  padding-bottom: 0;

  gap: ${({ theme }) => theme.space[8]};
`;
import styled from "styled-components/native";

export const StyledIcon = styled.Image`
  width: ${({ theme }) => theme.space[6]};
  height: ${({ theme }) => theme.space[6]};

  object-fit: contain;
`;

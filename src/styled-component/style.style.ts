import styled from "styled-components";

export const Button = styled.button`
  color: #BF4F74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

export const Input = styled.input<{ $invalidColor?: string; }>`
    border-radius: 4px;
    border: 1px solid grey;
    padding: 12px;
    border-color: ${props=> props.$invalidColor ?? 'grey'}
`;
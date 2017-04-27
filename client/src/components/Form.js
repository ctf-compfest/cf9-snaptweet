import styled from 'styled-components';

export const Field = styled.div`
  display: flex;
  padding: 1rem;

  @media screen and (max-width: 40rem) {
    flex-direction: column;
  }
`;

export const Label = styled.span`
  max-width: 16rem;
  margin-right: 3rem;
  font-family: ${props => props.theme.headingFont};
  font-weight: 700;
  font-size: 1.25rem;
`;

export const Input = styled.input`
  padding: .25rem;
  font-size: 1.2rem;
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
  border: 0;
  border-bottom: 1px solid ${props => props.theme.gray};
  flex: 1;
`;

import styled from 'styled-components';

export default styled.button`
  background: ${props => (props.transparent ? 'transparent' : props.theme.secondary)};
  padding: ${props => (props.large ? '.4rem 1.2rem' : '.25rem 1rem')};
  border-radius: ${props => (props.large ? '.4rem' : '.25rem')};
  font-family: ${props => props.theme.headingFont};
  text-decoration: none;
  color: ${props => (props.transparent ? props.theme.black : props.theme.white)};
  font-weight: 700;
  cursor: pointer;
  font-size: ${props => (props.large ? '1.3rem' : '1rem')};
  margin: 0;
  margin-left: ${props => (props.marginLeft ? '1rem' : '0')};
  border: 0;
`;

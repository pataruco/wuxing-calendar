import React from 'react';
import styled from 'styled-components';

import Coordinates from '../coordinates';

const StyledFooter = styled.footer`
  background-color: var(--black);
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;

  p {
    color: var(--white);
    text-align: center;
    max-width: 100%;
    span {
      color: red;
    }

    a {
      color: var(--white);
      &:hover {
        text-decoration: underline 2px solid white;
      }
    }
  }

  @media screen and (max-width: 600px) {
    & {
      flex-direction: column;
      justify-content: flex-start;
    }

    p {
      text-align: start;
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;

const Footer: React.FC = () => (
  <StyledFooter>
    <p>
      Made with{' '}
      <span role="img" aria-labelledby="heart">
        ❤️
      </span>{' '}
      by{' '}
      <a href="https://github.com/pataruco" target="_blank" rel="noreferrer">
        @pataruco
      </a>{' '}
      {new Date().getFullYear()}
    </p>
    <Coordinates />
  </StyledFooter>
);

export default Footer;

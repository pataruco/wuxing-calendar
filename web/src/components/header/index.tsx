import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

const StyledHeader = styled.header`
  padding: 1.25rem;
  display: flex;
  justify-content: flex-end;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const Header: React.FC = () => {
  const history = useHistory();

  const {
    location: { pathname },
  } = history;

  const isHome = pathname === '/';

  return (
    <StyledHeader>
      <nav>
        <ul>
          {isHome ? (
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
          ) : (
            <li>
              <Link to="/">Now</Link>
            </li>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;

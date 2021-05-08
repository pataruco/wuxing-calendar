import React from 'react';
import styled from 'styled-components';

import Footer from '../footer';
import Header from '../header';

const StyledPage = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    flex: 1 auto;
    width: 100%;
    padding: 1.25rem;
  }
`;
interface PagePros {
  className?: string;
  children: React.ReactNode;
}

const Page: React.FC<PagePros> = ({ className, children }) => {
  return (
    <StyledPage className={className}>
      <Header />
      <main role="main">{children}</main>
      <Footer />
    </StyledPage>
  );
};

export default Page;

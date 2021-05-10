import React from 'react';
import { Helmet } from 'react-helmet';
import { useAppSelector } from '../../redux/hooks';
import { selectTimer } from '../../redux/timer';

const Head: React.FC = () => {
  const { solar, lunar, hour } = useAppSelector(selectTimer);

  return (
    <Helmet>
      <title>{`☀️ ${solar} |🌙 ${lunar} | ⌛️ ${hour}`}</title>
    </Helmet>
  );
};

export default Head;

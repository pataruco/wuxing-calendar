import React from 'react';

import { useAppSelector } from '../../redux/hooks';
import { selectTimer } from '../../redux/timer';
import { convertToDMS } from '../../lib/helpers';

const Coordinates: React.FC = () => {
  const { latitude, longitude } = useAppSelector(selectTimer);

  return (
    <>
      {latitude && longitude && (
        <p>
          <small>
            Location: {convertToDMS({ lat: latitude, lng: longitude })}
          </small>
        </p>
      )}
    </>
  );
};

export default Coordinates;

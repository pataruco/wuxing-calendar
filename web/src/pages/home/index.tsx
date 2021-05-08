import React, { useEffect } from 'react';

import Page from '../../components/page';
import PhaseLabel from '../../components/phase-label';
import {
  dateStringAsIsoString,
  dateText,
  dayOptions,
  getMoonPhase,
  timeOptions,
} from '../../lib/helpers';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectTimer, setTimeAndCalendars } from '../../redux/timer';
import { getCoordinatesThunk } from '../../redux/timer/actions';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { date, solar, lunar, hour, latitude, longitude } = useAppSelector(
    selectTimer,
  );

  const areCoordinates = Boolean(latitude) && Boolean(longitude);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(setTimeAndCalendars());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (!areCoordinates) {
      dispatch(getCoordinatesThunk());
    }
  }, [areCoordinates, dispatch]);

  return (
    <Page>
      <article>
        {areCoordinates ? (
          <dl>
            <dt>Latitude:</dt>
            <dd>{latitude}</dd>
            <dt>Longitude:</dt>
            <dd>{longitude}</dd>
          </dl>
        ) : null}

        <section>
          <h2>
            <time dateTime={dateStringAsIsoString(date)}>
              {dateText({ dateString: date, options: dayOptions })}
            </time>
          </h2>
          {solar ? <PhaseLabel phase={solar} /> : null}
        </section>
        <section>
          <h1>
            <time dateTime={dateStringAsIsoString(date)}>
              {dateText({ dateString: date, options: timeOptions })}
            </time>
          </h1>
          {hour ? <PhaseLabel phase={hour} /> : null}
        </section>
        <section>
          <p>
            <span role="img">{getMoonPhase(new Date(date))}</span>
          </p>
          <h2>Moon phase</h2>
          {lunar ? <PhaseLabel phase={lunar} /> : null}
        </section>
      </article>
    </Page>
  );
};

export default Home;

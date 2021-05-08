import { Phase } from 'five-phases/@types/phase';
import React, { useEffect } from 'react';

import Page from '../components/page';
import { capitalize, getMoonPhase } from '../lib/helpers';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectTimer, setTimeAndCalendars } from '../redux/timer';
import { getCoordinatesThunk } from '../redux/timer/actions';

interface DateText {
  dateString: string;
  options: Intl.DateTimeFormatOptions;
}

const dayOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  weekday: 'long',
};

const timeOptions: Intl.DateTimeFormatOptions = {
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
};

const dateStringAsIsoString = (date: string) => new Date(date).toISOString();

const dateText = ({ dateString, options }: DateText) =>
  new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));

interface PhaseLabelProp {
  phase: Phase;
}

const PhaseLabel: React.FC<PhaseLabelProp> = ({ phase }) => {
  const classNameString = phase.toLowerCase();
  const phaseString = capitalize(phase);

  return <p className={classNameString}>{phaseString}</p>;
};

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

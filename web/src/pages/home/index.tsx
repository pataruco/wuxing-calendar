import React, { useEffect } from 'react';
import styled from 'styled-components';

import {
  dateStringAsIsoString,
  dateText,
  dayOptions,
  getMoonPhase,
  timeOptions,
} from '../../lib/helpers';
import { getCoordinatesThunk } from '../../redux/timer/actions';
import { selectTimer, setTimeAndCalendars } from '../../redux/timer';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Page from '../../components/page';
import PhaseLabel from '../../components/phase-label';

const StyledPage = styled(Page)`
  main {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article {
    width: 50vw;
  }

  section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 6rem;
    text-align: center;
    margin: 0;
    flex: 1;
  }

  h2 {
    font-size: 4.5rem;
    text-align: center;
    margin: 0;
    flex: 1;
  }

  p {
    margin: 0;
  }

  .lunar {
    div {
      flex: 1;
      p:first-of-type {
        font-size: 8rem;
        text-align: center;
        margin: 0;
      }

      p:nth-of-type(2) {
        text-align: center;
        max-width: unset;
      }
    }
  }
`;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { date, solar, lunar, hour, latitude, longitude } = useAppSelector(
    selectTimer,
  );

  const areCoordinates = Boolean(latitude) && Boolean(longitude);

  const { emoji, text: moonPhase } = getMoonPhase(new Date(date));

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
    <StyledPage>
      <article>
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
        <section className="lunar">
          <div>
            <p>
              <span role="img">{emoji}</span>
            </p>
            <p>{moonPhase}</p>
          </div>
          {lunar ? <PhaseLabel phase={lunar} /> : null}
        </section>
      </article>
    </StyledPage>
  );
};

export default Home;

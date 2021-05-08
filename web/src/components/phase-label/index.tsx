import React from 'react';
import { Phase } from 'five-phases/@types';

import { capitalize } from '../../lib/helpers';
import styled from 'styled-components';

const StyledP = styled.p`
  padding: 1rem;
  color: white;
  font-size: 1.5rem;
  width: 100px;
  text-align: center;
  margin: 0;

  &.wood {
    background-color: var(--wood);
  }
  &.fire {
    background-color: var(--fire);
  }
  &.earth {
    background-color: var(--earth);
  }
  &.metal {
    background-color: var(--metal);
  }
  &.water {
    background-color: var(--water);
  }
`;

interface PhaseLabelProp {
  phase: Phase;
}

const PhaseLabel: React.FC<PhaseLabelProp> = ({ phase }) => {
  const classNameString = phase.toLowerCase();
  const phaseString = capitalize(phase);

  return <StyledP className={classNameString}>{phaseString}</StyledP>;
};

export default PhaseLabel;

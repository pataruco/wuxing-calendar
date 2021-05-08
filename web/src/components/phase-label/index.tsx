import React from 'react';
import { Phase } from 'five-phases/@types';

import { capitalize } from '../../lib/helpers';

interface PhaseLabelProp {
  phase: Phase;
}

const PhaseLabel: React.FC<PhaseLabelProp> = ({ phase }) => {
  const classNameString = phase.toLowerCase();
  const phaseString = capitalize(phase);

  return <p className={classNameString}>{phaseString}</p>;
};

export default PhaseLabel;

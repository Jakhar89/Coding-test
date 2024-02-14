import React from 'react';

import Hino from '@/assets/logo/hino';
import Lexus from '@/assets/logo/lexus';
import Mazda from '@/assets/logo/mazda';
import PowerAlliance from '@/assets/logo/power-alliance';
import PowerTorque from '@/assets/logo/powertorque';
import Suzuki from '@/assets/logo/suzuki';
import Toyota from '@/assets/logo/toyota';
// reversed
import HinoReversed from '@/assets/logo/hino-reversed';
import LexusReversed from '@/assets/logo/lexus-reversed';
import MazdaReversed from '@/assets/logo/mazda-reversed';
import PowerAllianceReversed from '@/assets/logo/power-alliance-reversed';
import PowerTorqueReversed from '@/assets/logo/powertorque-reversed';
import SuzukiReversed from '@/assets/logo/suzuki-reversed';
import ToyotaReversed from '@/assets/logo/toyota-reversed';

import { toTitleCase } from '@/utility/helpers/string';

import { Wrapper } from './StyledLogo';
import { LogoProps } from './definitions';

const logoOptions = {
  hino: Hino,
  lexus: Lexus,
  mazda: Mazda,
  'power-alliance': PowerAlliance,
  powertorque: PowerTorque,
  suzuki: Suzuki,
  toyota: Toyota,
};

const reversedLogoOptions = {
  hino: HinoReversed,
  lexus: LexusReversed,
  mazda: MazdaReversed,
  'power-alliance': PowerAllianceReversed,
  powertorque: PowerTorqueReversed,
  suzuki: SuzukiReversed,
  toyota: ToyotaReversed,
};

const Logo: React.FC<LogoProps> = ({ site, reversed = false }) => {
  //@ts-ignore
  const SiteLogo = reversed ? reversedLogoOptions?.[site] : logoOptions?.[site];
  //@ts-ignore
  const altText = toTitleCase(site.replace('-', ' '));
  return (
    SiteLogo && (
      <Wrapper className={site}>
        <SiteLogo alt={`${altText} logo`} />
      </Wrapper>
    )
  );
};

export default Logo;

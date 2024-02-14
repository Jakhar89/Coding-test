import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import { THEMES } from '@/storybook/preview';

import ActionButton from '@/utility/components/FormElement/ActionButton';
import { button } from '@/utility/styles/button';
import { default as ToyotaButtons } from '@/utility/theme/toyota/button';
import { default as HinoButtons } from '@/utility/theme/hino/button';
import { default as LexusButtons } from '@/utility/theme/lexus/button';
import { default as MazdaButtons } from '@/utility/theme/mazda/button';
import { default as PowerAllianceButtons } from '@/utility/theme/power-alliance/button';
import { default as PowerTorqueButtons } from '@/utility/theme/powertorque/button';
import {default as SuzukiButtons} from '@/utility/theme/suzuki/button';

const buttonConfig = {
  Hino: HinoButtons,
  Lexus: LexusButtons,
  Mazda: MazdaButtons,
  'Power-Alliance': PowerAllianceButtons,
  PowerTorque: PowerTorqueButtons,
  Toyota: ToyotaButtons,
  Suzuki: SuzukiButtons
};

const DarkBackground = styled.div`
  background: #e3a2b1;
  background-position: top left, bottom left;
  background-repeat: no-repeat;
  background-size: 100%;
  margin-bottom: 20px;
  margin-right: auto;
  padding: 20px 20px 0 0;

  p {
    margin: -10px 0 10px 20px;
  }
 `;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: left;
`;

const config = {
  primary: ['primary', 'primaryDisabled'],
  secondary: ['secondary', 'secondaryDisabled'],
  tertiary: ['tertiary'],
  reversed: ['reversed', 'reversedDisabled'],
};

const Heading = styled.h2`
  border-color: grey;
  border-style: dashed;
  border-width: 0 0 1px 0;
  margin: 50px 0;
  text-transform: capitalize;
`;

const LoadingButton = styled.div`
  button {
    margin-left: 20px;
  }
`;

const renderButtons = (size, colorOptions) =>
  colorOptions.map((colorKey) => {
    const StyledButton = styled.a`
    ${button(size, colorKey)}

    // just ensures gaps bw buttons
    margin: 0 0 20px 20px;
    margin-right: auto;
  `;

    return (
      <DarkBackground>
        <StyledButton href="#">Button: {colorKey}</StyledButton>
        {(colorKey === 'primary' || colorKey === 'secondary' || colorKey === 'tertiary' || colorKey === 'reversed') && (
          <LoadingButton>
            <ActionButton
              buttonType={colorKey}
              isLoading={true}
              label={`Button: ${colorKey}`}
            />
          </LoadingButton>
        )}
      </DarkBackground>
    );
  });

const Buttons: any = (props) => {
  return Object.keys(config).map((size) => (
    <>
      <Heading>{size}</Heading>
      {renderButtons(size, config[size])}
    </>
  ));
};

const ButtonGroup = ({ settings, title }) => (
  <>
    <h1>{title.replace('-', ' ')}</h1>
    <Container>
      <Buttons settings={settings} />
    </Container>
  </>
);
export default {
  title: 'Foundations/Buttons',
  component: ButtonGroup,
  argTypes: {},
} as ComponentMeta<any>;

const Template = ({ site }) => (
  <>
    <ButtonGroup
      settings={buttonConfig?.[site].colors}
      title={site}
    />
  </>
);
export const Example = (args, { globals: { site } }) => {
  const Theme = THEMES?.[site] ?? THEMES.Toyota;
  return (
    // temporary hack until AEM integration completed
    <Theme>
      <Template site={site} />
    </Theme>
  );
};
Example.storyName = 'Buttons';

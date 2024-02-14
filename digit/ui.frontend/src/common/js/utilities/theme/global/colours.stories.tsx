import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';
import Toyota from '../toyota/theme';
import Lexus from '../lexus/theme';
import PowerTorque from '../powertorque/theme';
import PowerAlliance from '../power-alliance/theme';
import Hino from '../hino/theme';
import Mazda from '../mazda/theme';
import Suzuki from '../suzuki/theme';

const toyotaColors = Toyota?.colors;
const lexusColors = Lexus?.colors;
const powerTorqueColors = PowerTorque?.colors;
const powerAllianceColors = PowerAlliance?.colors;
const hinoColors = Hino?.colors;
const mazdaColors = Mazda?.colors;
const suzukiColors = Suzuki?.colors;

const Color = styled.div`
  background: ${({ theme }) => theme.color};
  border: 1px solid #444;
  flex: 0 1 100px;
  min-height: 80px;
  margin: 0 10px 10px 0;
  padding-bottom: 20px;
`;

const Label = styled.div`
  background-color: rgba(255,255,255,0.6);
  color: black;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 14px;
  padding: 4px;

  span {
    font-weight: bold;
  }
`;

const Palette = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content:left;
`;

const interate = (obj) => {
  return Object.keys(obj).map((key) => {
    const color = obj[key];

    // nested obj
    if (typeof color === 'object') {
      return interate(color);
    }

    return (
      <Color
        theme={{ color }}
        key={`${key}`}
      >
        <Label>
          {key}
          <span>{color}</span>
        </Label>
      </Color>
    );
  });
};
const Colours = (props) => {
  const { settings } = props;

  return interate(settings);
};

const GlobalColors = ({ colorConfig }) => (
  <>
    <h2>Global</h2>
    <Palette>
      <Colours settings={colorConfig} />
    </Palette>
  </>
);

const ColourPalette = ({ colorConfig }) => {
  return !colorConfig ? null : (
    <>
      <h2>Buttons</h2>
      <h3>Primary</h3>
      <Palette>
        <Colours settings={colorConfig.button.primary} />
      </Palette>
      <h3>Secondary</h3>
      <Palette>
        <Colours settings={colorConfig.button.secondary} />
      </Palette>
      <h3>Tertiary</h3>
      <Palette>
        <Colours settings={colorConfig.button.tertiary} />
      </Palette>
      <h3>Reversed</h3>
      <Palette>
        <Colours settings={colorConfig.button.reversed} />
      </Palette>
      <h2>Text</h2>
      <h3>Headings</h3>
      <Palette>
        <Colours settings={colorConfig.text.heading} />
      </Palette>
      <h3>Body</h3>
      <Palette>
        <Colours settings={colorConfig.text.body} />
      </Palette>
      <h3>Links</h3>
      <Palette>
        <Colours settings={colorConfig.link} />
      </Palette>
      <h2>Backgrounds</h2>
      <Palette>
        <Colours settings={colorConfig.background} />
      </Palette>
      <h2>Icons</h2>
      <Palette>
        <Colours settings={colorConfig.icon} />
      </Palette>
      <h2>Dividers &amp; borders</h2>
      <Palette>
        <Colours settings={colorConfig.border} />
      </Palette>

      {colorConfig?.forms && (
        <>
          <h2>Forms</h2>
          <Palette>
            <Colours settings={colorConfig?.forms} />
          </Palette>
        </>
      )}
    </>
  );
};

export default {
  title: 'Foundations/Colours',
  component: ColourPalette,
  argTypes: {},
} as Meta;

const Template: Story<React.FC> = () => <GlobalColors colorConfig={toyotaColors?.global} />;
export const Example = Template.bind({});
Example.storyName = 'Global';

const Template1: Story<React.FC> = () => <ColourPalette colorConfig={toyotaColors} />;
export const Example1 = Template1.bind({});
Example1.storyName = 'Toyota';

const Template2: Story<React.FC> = () => <ColourPalette colorConfig={lexusColors} />;
export const Example2 = Template2.bind({});
Example2.storyName = 'Lexus';

const Template3: Story<React.FC> = () => <ColourPalette colorConfig={powerTorqueColors} />;
export const Example3 = Template3.bind({});
Example3.storyName = 'Power Torque';

const Template4: Story<React.FC> = () => <ColourPalette colorConfig={powerAllianceColors} />;
export const Example4 = Template4.bind({});
Example4.storyName = 'Power Alliance';

const Template5: Story<React.FC> = () => <ColourPalette colorConfig={hinoColors} />;
export const Example5 = Template5.bind({});
Example5.storyName = 'Hino';

const Template6: Story<React.FC> = () => <ColourPalette colorConfig={mazdaColors} />;
export const Example6 = Template6.bind({});
Example6.storyName = 'Mazda';

const Template7: Story<React.FC> = () => <ColourPalette colorConfig={suzukiColors} />;
export const Example7 = Template7.bind({});
Example7.storyName = 'Suzuki';

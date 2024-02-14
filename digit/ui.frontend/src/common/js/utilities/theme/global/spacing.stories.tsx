import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';
import { spacing } from '../../theme/global/spacing';

const Card = styled.div`
  background-color: ${({ theme }) => theme.color};
  flex: 0 1 120px;
  height: 120px;
  margin: 20px 20px 0 0;

  span {
    display: block;
    height: ${({ theme }) => theme.spacingVal}px;
    width: ${({ theme }) => theme.spacingVal}px;
    background-color: grey;
  }
`;
const Label = styled.div`
  background-color: rgba(255,255,255,0.8);
  color: black;
  font-size:12px;
  line-height: 14px;
  padding: 4px;
`;

const Palette = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
`;

const interate = (obj, heading) => {
  return Object.keys(obj).map((key) => {
    const spacingVal = obj[key];

    // nested obj
    if (typeof spacingVal === 'object') {
      return interate(spacingVal, key);
    }

    return (
      <Card
        theme={{ spacingVal }}
        key={`${key}`}
      >
        <h1>{heading}</h1>
        <Label>
          {key}
          <br />
          {spacingVal} <span></span>
        </Label>
      </Card>
    );
  });
};
const Config = ({ settings }) => interate(settings, null);

const SpacingOutput = () => (
  <>
    <h1>XS</h1>
    <Palette>
      <Config settings={spacing.xs} />
    </Palette>
    <hr />
    <h1>SM</h1>
    <Palette>
      <Config settings={spacing.sm} />
    </Palette>
    <hr />
    <h1>MD</h1>
    <Palette>
      <Config settings={spacing.md} />
    </Palette>
    <hr />
    <h1>L</h1>
    <Palette>
      <Config settings={spacing.lg} />
    </Palette>
    <hr />
    <h1>XL</h1>
    <Palette>
      <Config settings={spacing.xl} />
    </Palette>
  </>
);
export default {
  title: 'Foundations/Spacing',
  component: SpacingOutput,
  argTypes: {},
} as Meta;

const Template: Story<React.FC> = () => <SpacingOutput />;

export const Example = Template.bind({});
Example.storyName = 'Spacing';
Example.parameters = {
  docs: {
    source: {},
  },
};

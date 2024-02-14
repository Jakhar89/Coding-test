import React from 'react';
import styled from 'styled-components';

import { THEMES } from '@/storybook/preview';

import {
  body0,
  body1,
  body2,
  body3,
  body4,
  boldBody0,
  boldBody1,
  boldBody2,
  boldBody3,
  boldBody4,
  boldFixedBody10,
  boldFixedBody12,
  boldFixedBody14,
  boldFixedBody16,
  boldFixedBody8,
  fixedBody10,
  fixedBody12,
  fixedBody14,
  fixedBody16,
  fixedBody8,
  headingH1,
  headingH2,
  headingH3,
  headingH4,
  headingH5,
  headingH6,
  headingWithDivider,
  label1,
  label2,
  label3,
  underlineBody1,
  underlineBody2,
  underlineBody3,
  underlineBody4,
  underlineFixedBody10,
  underlineFixedBody12,
  underlineFixedBody14,
  underlineFixedBody16,
  underlineFixedBody8,
} from './index';

export default {
  title: 'Foundations',
  argTypes: {},
};

const HeadingH1 = styled.h1`
  ${headingH1}
`;
const HeadingH2 = styled.h2`
  ${headingH2}
`;
const HeadingH3 = styled.h3`
  ${headingH3}
`;
const HeadingH4 = styled.h4`
  ${headingH4}
`;
const HeadingH5 = styled.h5`
  ${headingH5}
`;
const HeadingH6 = styled.h6`
  ${headingH6}
`;

const HeadingH2WithDefaultDivider = styled.h2`
  ${headingWithDivider(undefined, 'default')}
`;

const HeadingH2WithSlimDivider = styled.h2`
  ${headingWithDivider(headingH2, 'slim')}
`;

const HeadingH2WithUndefinedType = styled.h2`
  ${headingWithDivider(undefined, 'default')}
`;

const Body0 = styled.p`
  ${body0}
`;
const Body1 = styled.p`
  ${body1}
`;
const Body2 = styled.p`
  ${body2}
`;
const Body3 = styled.p`
  ${body3}
`;
const Body4 = styled.p`
  ${body4}
`;

const BoldBody0 = styled.p`
  ${boldBody0}
`;
const BoldBody1 = styled.p`
  ${boldBody1}
`;
const BoldBody2 = styled.p`
  ${boldBody2}
`;
const BoldBody3 = styled.p`
  ${boldBody3}
`;
const BoldBody4 = styled.p`
  ${boldBody4}
`;

const UnderlineBody1 = styled.p`
  ${underlineBody1}
`;
const UnderlineBody2 = styled.p`
  ${underlineBody2}
`;
const UnderlineBody3 = styled.p`
  ${underlineBody3}
`;
const UnderlineBody4 = styled.p`
  ${underlineBody4}
`;

const FixedBody16 = styled.p`
  ${fixedBody16}
`;
const FixedBody14 = styled.p`
  ${fixedBody14}
`;
const FixedBody12 = styled.p`
  ${fixedBody12}
`;
const FixedBody10 = styled.p`
  ${fixedBody10}
`;
const FixedBody8 = styled.p`
  ${fixedBody8}
`;

const BoldFixedBody16 = styled.p`
  ${boldFixedBody16}
`;
const BoldFixedBody14 = styled.p`
  ${boldFixedBody14}
`;
const BoldFixedBody12 = styled.p`
  ${boldFixedBody12}
`;
const BoldFixedBody10 = styled.p`
  ${boldFixedBody10}
`;
const BoldFixedBody8 = styled.p`
  ${boldFixedBody8}
`;

const UnderlineFixedBody16 = styled.p`
  ${underlineFixedBody16}
`;
const UnderlineFixedBody14 = styled.p`
  ${underlineFixedBody14}
`;
const UnderlineFixedBody12 = styled.p`
  ${underlineFixedBody12}
`;
const UnderlineFixedBody10 = styled.p`
  ${underlineFixedBody10}
`;
const UnderlineFixedBody8 = styled.p`
  ${underlineFixedBody8}
`;

const Label1 = styled.label`
  ${label1}
`;
const Label2 = styled.label`
  ${label2}
`;
const Label3 = styled.label`
  ${label3}
`;

export const Typography = (args, { globals: { site } }) => {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt.';

  const Theme = THEMES?.[site] ?? THEMES.Toyota;

  return (
    // temporary hack until AEM integration completed
    <Theme>
      <HeadingH1>Heading H1</HeadingH1>
      <HeadingH2WithDefaultDivider>Heading with divider - Default</HeadingH2WithDefaultDivider>
      <HeadingH2WithSlimDivider>Heading with divider - Slim</HeadingH2WithSlimDivider>
      <HeadingH2WithUndefinedType>Heading with invalid type - (this is return default type)</HeadingH2WithUndefinedType>
      <HeadingH2>Heading H2</HeadingH2>
      <HeadingH3>Heading H3</HeadingH3>
      <HeadingH4>Heading H4</HeadingH4>
      <HeadingH5>Heading H5</HeadingH5>
      <HeadingH6>Heading H6</HeadingH6>
      <Body0>
        Body 0 - Regular
        <br />
        {loremIpsum}
      </Body0>
      <Body1>
        Body 1 - Regular
        <br />
        {loremIpsum}
      </Body1>
      <Body2>
        Body 2 - Regular
        <br />
        {loremIpsum}
      </Body2>
      <Body3>
        Body 3 - Regular
        <br />
        {loremIpsum}
      </Body3>
      <Body4>
        Body 4 - Regular
        <br />
        {loremIpsum}
      </Body4>
      <BoldBody0>
        Body 0 - Bold <br />
        {loremIpsum}
      </BoldBody0>
      <BoldBody1>
        Body 1 - Bold <br />
        {loremIpsum}
      </BoldBody1>
      <BoldBody2>
        Body 2 - Bold
        <br />
        {loremIpsum}
      </BoldBody2>
      <BoldBody3>
        Body 3 - Bold
        <br />
        {loremIpsum}
      </BoldBody3>
      <BoldBody4>
        Body 4 - Bold
        <br />
        {loremIpsum}
      </BoldBody4>
      <UnderlineBody1>
        Underline - Body 1
        <br />
        {loremIpsum}
      </UnderlineBody1>
      <UnderlineBody2>
        Underline - Body 2
        <br />
        {loremIpsum}
      </UnderlineBody2>
      <UnderlineBody3>
        Underline - Body 3
        <br />
        {loremIpsum}
      </UnderlineBody3>
      <UnderlineBody4>
        Underline - Body 4
        <br />
        {loremIpsum}
      </UnderlineBody4>
      <FixedBody16>
        Fixed Body 16 - Regular
        <br />
        {loremIpsum}
      </FixedBody16>
      <FixedBody14>
        Fixed Body 14 - Regular
        <br />
        {loremIpsum}
      </FixedBody14>
      <FixedBody12>
        Fixed Body 12 - Regular
        <br />
        {loremIpsum}
      </FixedBody12>
      <FixedBody10>
        Fixed Body 10 - Regular
        <br />
        {loremIpsum}
      </FixedBody10>
      <FixedBody8>
        Fixed Body 8 - Regular
        <br />
        {loremIpsum}
      </FixedBody8>
      <BoldFixedBody16>
        Fixed Body 16 - Bold
        <br />
        {loremIpsum}
      </BoldFixedBody16>
      <BoldFixedBody14>
        Fixed Body 14 - Bold
        <br />
        {loremIpsum}
      </BoldFixedBody14>
      <BoldFixedBody12>
        Fixed Body 12 - Bold
        <br />
        {loremIpsum}
      </BoldFixedBody12>
      <BoldFixedBody10>
        Fixed Body 10 - Bold
        <br />
        {loremIpsum}
      </BoldFixedBody10>
      <BoldFixedBody8>
        Fixed Body 8 - Bold
        <br />
        {loremIpsum}
      </BoldFixedBody8>
      <UnderlineFixedBody16>
        Fixed Body 16 - Underline
        <br />
        {loremIpsum}
      </UnderlineFixedBody16>
      <UnderlineFixedBody14>
        Fixed Body 14 - Underline
        <br />
        {loremIpsum}
      </UnderlineFixedBody14>
      <UnderlineFixedBody12>
        Fixed Body 12 - Underline
        <br />
        {loremIpsum}
      </UnderlineFixedBody12>
      <UnderlineFixedBody10>
        Fixed Body 10 - Underline
        <br />
        {loremIpsum}
      </UnderlineFixedBody10>
      <UnderlineFixedBody8>
        Fixed Body 8 - Underline
        <br />
        {loremIpsum}
      </UnderlineFixedBody8>
      <Label1>
        Label 1 <br />
      </Label1>
      <Label2>
        Label 2 <br />
      </Label2>
      <Label3>
        Label 3 <br />
      </Label3>
    </Theme>
  );
};

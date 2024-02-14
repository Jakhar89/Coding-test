import { ComponentMeta } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

import Logo from '@/utility/components/Logo';

export default {
  title: 'Components',
  component: Logo,
} as ComponentMeta<typeof Logo>;

const LogoContainer = styled.div`
  .black-bg {
    background-color: black;
  }
`;

export const Example = (args, { globals: { site } }) => {
  return (
    <LogoContainer>
      <Logo site={site?.toLowerCase()} />
      <div className="black-bg">
        <Logo
          site={site?.toLowerCase()}
          reversed={true}
        />
      </div>
    </LogoContainer>
  );
};

Example.storyName = 'Logo';

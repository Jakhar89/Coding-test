import React from 'react';
import styled from 'styled-components';
import { default as Grid } from './index';

import ToyotaTheme from '../../theme/toyota';

import { useBreakpoint } from '../../hooks/useBreakpoint';

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const Item = styled(Grid.Item)`
  background-color: #00000011;
  z-index: -1;

  &.selected-column {
    background-color: yellow;
  }
`;

export const Fill = styled.div`
  background-color: #00000011;
  height: 100vh;
  width: 100%;
  z-index: 999;
`;

export const GridVisualiser = () => {
  const bp = useBreakpoint();

  const colCount = {
    xs: 4,
    sm: 4,
  };

  const colSelected = {
    xs: 4,
    sm: 4,
    md: 9,
    lg: 6,
    xl: 12,
  };

  return (
    <ToyotaTheme>
      <Container>
        <Grid.Container>
          <Grid.Row>
            {Array.from({ length: colCount[bp] ?? 12 }, (_, i) => (
              <Item
                key={i}
                config={{ xs: 4, md: 1 }}
                className={i < colSelected[bp] ? 'selected-column' : null}
              >
                <Fill />
              </Item>
            ))}
          </Grid.Row>
        </Grid.Container>
      </Container>
    </ToyotaTheme>
  );
};

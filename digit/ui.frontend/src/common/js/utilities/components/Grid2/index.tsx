import styled from 'styled-components';

import { isPlainValue } from '@/props/types';
import { spacing } from '@/utility/props';

import mq, { getZeroMediaQuery } from '../../styles/mq';
import { ITheme } from '../../theme/global/definitions';

const toPercent = (col: any, colCount: number): string => `${(parseInt(col) / colCount) * 100}%`;

const spaces = (spaces, theme) => {
  const parm = { theme, ...spaces };
  return spacing(parm);
};

const wrapWithMediaQuery = (breakpoint: string, value): string => {
  value = Array.isArray(value) ? value.join('') : value;
  if (breakpoint !== getZeroMediaQuery()) {
    return `
    ${mq(breakpoint)} {
      ${value}
    }
    `;
  }
  return `${value}`;
};

const getColStyles = (col: any, colCount: number, gutterSize: number): string => {
  if (col === 'auto') {
    return `
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
    `;
  }

  // Remove left and right gutter to ensure container staying within the column
  if (col !== colCount || col === col) {
    return `
      max-width: calc(${toPercent(col, colCount)} - ${gutterSize}px);
    `;
  }
};
//flex: 0 0 calc(${toPercent(col, colCount)} - ${gutterSize}px);

const columns = (col: any, theme: ITheme, gutterSize: any) => {
  // 1 grid size all breakpoints
  if (isPlainValue(col)) {
    return getColStyles(col, theme.grid.defaultColCount, typeof gutterSize === 'number' ? gutterSize : 0);
  }
  // At this point cols should be an object;
  // {sm: 4, md: 6}
  return Object.keys(col).map((size) => {
    return wrapWithMediaQuery(
      size,
      getColStyles(
        col[size],
        theme.grid.defaultColCount,
        typeof gutterSize === 'number'
          ? gutterSize
          : gutterSize[size]
          ? gutterSize[size]
          : theme.grid.gutter.size[size],
      ),
    );
  });
};

const offset = (offset, theme) => {
  // 1 grid size all breakpoints
  if (isPlainValue(offset)) {
    return `margin-left: ${toPercent(offset, theme.grid.colCount)};`;
  }

  // At this point value should be an object;
  // {sm: 4, md: 6}
  return Object.keys(offset).map((size) =>
    wrapWithMediaQuery(size, `margin-left: ${toPercent(offset[size], theme.grid.colCount)};`),
  );
};

const push = (push, theme) => {
  // 1 grid size all breakpoints
  if (isPlainValue(push)) {
    return `margin-right: ${toPercent(push, theme.grid.colCount)};`;
  }

  // At this point value should be an object;
  // {sm: 4, md: 6}
  return Object.keys(push).map((size) =>
    wrapWithMediaQuery(size, `margin-right: ${toPercent(push[size], theme.grid.colCount)};`),
  );
};

const order = (order) => {
  const propType = typeof order;

  // 1  grid size all breakpoints
  if (propType === 'string' || propType === 'number') {
    return `order: ${order};`;
  }

  // At this point value should be an object;
  // {sm: 4, md: 6}
  return Object.keys(order).map((size) => wrapWithMediaQuery(size, `order: ${order[size]};`));
};

const gutters = ({ config, theme }) => {
  const gutters = theme.grid.gutter.directions;

  return Object.keys(theme.grid.gutter.size).map((breakpoint) =>
    wrapWithMediaQuery(
      breakpoint,
      gutters.map((dir) => `padding-${dir}: ${theme.grid.gutter.size[breakpoint] / 2}px;`),
    ),
  );
};

// reverse effect of item gutters with negative margins
const rowGutters = ({ config, theme }) => {
  const gutters = config && config.gutters ? config.gutters : theme.grid.gutter.directions;

  return Object.keys(theme.grid.gutter.size).map((breakpoint) =>
    wrapWithMediaQuery(
      breakpoint,
      gutters.map((dir) => `margin-${dir}: -${theme.grid.gutter.size[breakpoint] / 2}px;`),
    ),
  );
};

const calculateItemConfig = ({ config, theme }) => {
  const styles: any = [];

  if (typeof config.spaces !== 'undefined') {
    styles.push(spaces(config.spaces, theme));
  }

  if (typeof config.col !== 'undefined') {
    styles.push(columns(config.col, theme, config.gutters));
  }

  if (typeof config.order !== 'undefined') {
    styles.push(order(config.order));
  }

  if (typeof config.offset !== 'undefined') {
    styles.push(offset(config.offset, theme));
  }

  if (typeof config.push !== 'undefined') {
    styles.push(push(config.push, theme));
  }

  return styles;
};

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.grid.containerMaxWidth}px;
  min-width: ${({ theme }) => theme.grid.containerMinWidth}px;
  margin-right: auto;
  margin-left: auto;

  padding-left: ${({ theme }) => theme.grid.margin.xs}px;
  padding-right: ${({ theme }) => theme.grid.margin.xs}px;

  ${mq('sm')} {
    padding-left: ${({ theme }) => theme.grid.margin.sm}px;
    padding-right: ${({ theme }) => theme.grid.margin.sm}px;
  }

  ${mq('md')} {
    padding-left: ${({ theme }) => theme.grid.margin.md}px;
    padding-right: ${({ theme }) => theme.grid.margin.md}px;
  }

  ${mq('lg')} {
    padding-left: ${({ theme }) => theme.grid.margin.lg}px;
    padding-right: ${({ theme }) => theme.grid.margin.lg}px;
  }

  ${mq('xl')} {
    padding-left: ${({ theme }) => theme.grid.margin.xl}px;
    padding-right: ${({ theme }) => theme.grid.margin.xl}px;
  }
`;

const Row: any = styled.div`
  display: flex;
  ${rowGutters}
`;

Row.defaultProps = {
  flexWrap: 'wrap',
};

const Item: any = styled.div`
  width:100%;
  position: relative;
  display:flex;
  box-sizing: border-box;
  padding:0;
  flex-wrap:wrap;

  ${calculateItemConfig}
`;

Item.defaultProps = {
  config: {
    gridX: true,
    gridY: true,
  },
};

export default {
  Container,
  Row,
  Item,
};

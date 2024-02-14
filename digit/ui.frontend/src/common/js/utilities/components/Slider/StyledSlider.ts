import styled, { css } from 'styled-components';

import { mq } from '@/utility/styles';
import { body1, headingH2 } from '@/utility/styles/text';

export const SliderContainer = styled.div<{ isMulti?: boolean; isLastActive?: boolean }>`
  box-sizing: border-box;
  ${({ isMulti, isLastActive }) =>
    isMulti &&
    !isLastActive &&
    `
  ${mq('lg')} {
    &::after {
      content: '';
      background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
      height: 100%;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 75px;
    }
  }
  `};
`;

export const SliderInner = styled.div<{ activeIndex: number; isLastChild: boolean; transformValues?: any }>`
  display: flex;
        
  overflow: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const SliderItemContainer = styled.div<{ isMulti: boolean; gaps?: any; itemWidth?: any }>`
  scroll-snap-align: start;
  flex-shrink: 0;
  ${({ isMulti }) => isMulti && `max-width: 1100px`};
  ${({ itemWidth, isMulti }) => isMulti && `width: ${itemWidth?.mobile}`};
  ${({ isMulti }) => isMulti && `margin-right: 4vw`};
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  margin-bottom: 30px;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);

  &:last-child {
    scroll-snap-align: end;
  }

  ${mq('md')} {
    margin-bottom:20px;
  }

  ${mq('lg')} {
    ${({ itemWidth, isMulti }) => isMulti && `width: ${itemWidth?.desktop}`};

    &:not(:last-child) {
      ${({ gaps }) => `margin-right: ${gaps?.[1]}px`};
    }
  }
`;

export const SliderItem = styled.div`
    white-space: normal;
    display: block;
    width: 100%;
`;

export const IndicatorsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`;

export const SliderButton = styled.button<{ active?: any; category?: any }>`
    margin: 0 7px;
    padding: 0;
    color: #BEBEBE;
    cursor: pointer;
    ${({ category, active, theme }) =>
      category === 'cta' &&
      `
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1px solid #BEBEBE;
      background: ${active ? `#BEBEBE` : 'transparent'};
    `};
    
    ${({ category }) =>
      category === 'arrow' &&
      `
      border: none;
      background: none;
    `};
`;

export const Title = styled.h1`
    ${headingH2}
`;

export const Copy = styled.p`
    ${body1}
`;

export const PlaceHolderContainer = styled.div`
  background: #fff;
  min-height: 200px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
`;

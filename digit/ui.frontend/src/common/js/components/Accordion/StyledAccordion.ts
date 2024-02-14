import { mq } from '@/utility/styles';
import { fixedBody16, headingH6 } from '@/utility/styles/text';
import styled, { css } from 'styled-components';
import { AccordionStylingProps } from './definitions';

export const AccordionContainer = styled.div`
    border-top: 1px solid  #CACDD6;
    border-bottom: 1px solid  #CACDD6;
    padding:20px 0px;
`;

export const AccordionItem = styled.div`
    display: flex;
`;

export const AccordionTitleContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const AccordionTitle = styled.h6<AccordionStylingProps>`
    ${headingH6}
    margin-bottom: 0px !important;
    position: relative;
    ${({ isActive }) =>
      !isActive &&
      css`
        font-weight: 400 !important;
    `}
    &:hover {
        cursor: pointer;
    }
`;

export const AccordionContent = styled.div`
    ${fixedBody16}
    padding-top: 40px;

    ${mq.lessThan('lg')}{
        padding-top: 30px;
    }
`;

export const IconContainer = styled.div`
    margin: auto;
    position: relative;
    float: right;
    display: inline-block;
    -webkit-box-pack: center;
`;

import React from 'react';
import Styled from 'styled-components';
import logo from './suzuki.png';

const LogoImg = Styled.img.attrs({
  src: `${logo}`,
})``;

const Svg = () => (
  <>
    <LogoImg />
  </>
);

export default Svg;

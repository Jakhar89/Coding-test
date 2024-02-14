import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => {
  return (
    <>
      <path d="M41 20H37V15C37 11.8174 35.7357 8.76515 33.4853 6.51472C31.2348 4.26428 28.1826 3 25 3C21.8174 3 18.7652 4.26428 16.5147 6.51472C14.2643 8.76515 13 11.8174 13 15V15.27H15V15C15 12.3478 16.0536 9.8043 17.9289 7.92893C19.8043 6.05357 22.3478 5 25 5C27.6522 5 30.1957 6.05357 32.0711 7.92893C33.9464 9.8043 35 12.3478 35 15V20H9C8.20435 20 7.44129 20.3161 6.87868 20.8787C6.31607 21.4413 6 22.2044 6 23V47C6 47.7957 6.31607 48.5587 6.87868 49.1213C7.44129 49.6839 8.20435 50 9 50H41C41.7957 50 42.5587 49.6839 43.1213 49.1213C43.6839 48.5587 44 47.7957 44 47V23C44 22.2044 43.6839 21.4413 43.1213 20.8787C42.5587 20.3161 41.7957 20 41 20ZM42 47C42 47.2652 41.8946 47.5196 41.7071 47.7071C41.5196 47.8946 41.2652 48 41 48H9C8.73478 48 8.48043 47.8946 8.29289 47.7071C8.10536 47.5196 8 47.2652 8 47V23C8 22.7348 8.10536 22.4804 8.29289 22.2929C8.48043 22.1054 8.73478 22 9 22H41C41.2652 22 41.5196 22.1054 41.7071 22.2929C41.8946 22.4804 42 22.7348 42 23V47Z" />
      <path d="M27.0001 35.18V37.99C27.0001 38.5204 26.7894 39.0291 26.4143 39.4042C26.0393 39.7793 25.5306 39.99 25.0001 39.99C24.4697 39.99 23.961 39.7793 23.5859 39.4042C23.2108 39.0291 23.0001 38.5204 23.0001 37.99V35.18C22.6832 34.9105 22.4294 34.5746 22.2566 34.1962C22.0838 33.8178 21.9962 33.406 22.0001 32.99C22.0001 32.1943 22.3162 31.4313 22.8788 30.8687C23.4414 30.3061 24.2045 29.99 25.0001 29.99C25.7958 29.99 26.5588 30.3061 27.1214 30.8687C27.6841 31.4313 28.0001 32.1943 28.0001 32.99C28.004 33.406 27.9165 33.8178 27.7437 34.1962C27.5709 34.5746 27.317 34.9105 27.0001 35.18Z" />
    </>
  );
};

export default withSvg(50, 50)(Svg);

import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M38.0111 38C36.5942 38.0014 35.2235 38.5042 34.1418 39.4194C33.0602 40.3345 32.3372 41.6029 32.1011 43H26.8211C26.607 42.4275 26.2232 41.934 25.721 41.5857C25.2189 41.2373 24.6223 41.0506 24.0111 41.0506C23.3999 41.0506 22.8033 41.2373 22.3011 41.5857C21.7989 41.934 21.4151 42.4275 21.2011 43H16.9211C16.6774 41.5127 15.883 40.1716 14.6958 39.2433C13.5086 38.315 12.0155 37.8675 10.5134 37.9897C9.0113 38.112 7.61021 38.795 6.58868 39.903C5.56715 41.011 5 42.4629 5 43.97C5 45.477 5.56715 46.9289 6.58868 48.0369C7.61021 49.145 9.0113 49.828 10.5134 49.9502C12.0155 50.0724 13.5086 49.6249 14.6958 48.6966C15.883 47.7683 16.6774 46.4272 16.9211 44.94H21.2011C21.4151 45.5124 21.7989 46.0059 22.3011 46.3543C22.8033 46.7026 23.3999 46.8893 24.0111 46.8893C24.6223 46.8893 25.2189 46.7026 25.721 46.3543C26.2232 46.0059 26.607 45.5124 26.8211 44.94H32.1011C32.2918 46.0681 32.8011 47.1183 33.569 47.9666C34.3368 48.8148 35.3312 49.4259 36.4349 49.7276C37.5386 50.0293 38.7056 50.0092 39.7982 49.6695C40.8908 49.3299 41.8636 48.6849 42.6017 47.8106C43.3398 46.9364 43.8126 45.8693 43.9642 44.7352C44.1159 43.6011 43.9401 42.4472 43.4576 41.4097C42.975 40.3723 42.2059 39.4944 41.2409 38.8796C40.2759 38.2648 39.1553 37.9388 38.0111 37.94V38ZM11.0111 48C10.22 48 9.44658 47.7654 8.78879 47.3259C8.13099 46.8863 7.6183 46.2616 7.31555 45.5307C7.0128 44.7998 6.93361 43.9955 7.08795 43.2196C7.24229 42.4437 7.62324 41.7309 8.18265 41.1715C8.74206 40.6121 9.45479 40.2312 10.2307 40.0768C11.0066 39.9225 11.8109 40.0017 12.5418 40.3045C13.2727 40.6072 13.8974 41.1199 14.3369 41.7777C14.7765 42.4355 15.0111 43.2088 15.0111 44C15.0111 45.0608 14.5897 46.0782 13.8395 46.8284C13.0894 47.5785 12.0719 48 11.0111 48ZM38.0111 48C37.22 48 36.4466 47.7654 35.7888 47.3259C35.131 46.8863 34.6183 46.2616 34.3156 45.5307C34.0128 44.7998 33.9336 43.9955 34.088 43.2196C34.2423 42.4437 34.6232 41.7309 35.1826 41.1715C35.7421 40.6121 36.4548 40.2312 37.2307 40.0768C38.0066 39.9225 38.8109 40.0017 39.5418 40.3045C40.2727 40.6072 40.8974 41.1199 41.3369 41.7777C41.7765 42.4355 42.0111 43.2088 42.0111 44C42.0111 45.0608 41.5897 46.0782 40.8395 46.8284C40.0894 47.5785 39.0719 48 38.0111 48Z" />
    <path d="M47.91 18.37C46.9138 17.2695 45.6907 16.3983 44.325 15.8165C42.9594 15.2346 41.4838 14.9561 40 15C39.2353 14.7771 38.5171 14.418 37.88 13.94C36.82 13.22 35.56 12.2 34.19 11.19C31.43 9.19 28.27 7 25 7H14.5C11.3 7 8.55 9.19 6.34 11.56C4.59919 13.5051 3.04253 15.6074 1.69 17.84L1.59 17.97C1.19312 18.5676 0.838907 19.1925 0.529999 19.84C0.21214 20.3599 0.0299038 20.9513 0 21.56V27.16C0.00263541 27.9124 0.302684 28.6332 0.834717 29.1653C1.36675 29.6973 2.08759 29.9974 2.84 30H8V29C8 27.9391 8.42142 26.9217 9.17157 26.1716C9.92172 25.4214 10.9391 25 12 25C13.0609 25 14.0783 25.4214 14.8284 26.1716C15.5786 26.9217 16 27.9391 16 29V30H35V29C35 27.9391 35.4214 26.9217 36.1716 26.1716C36.9217 25.4214 37.9391 25 39 25C40.0609 25 41.0783 25.4214 41.8284 26.1716C42.5786 26.9217 43 27.9391 43 29V30H47.16C47.9124 29.9974 48.6333 29.6973 49.1653 29.1653C49.6973 28.6332 49.9974 27.9124 50 27.16V23.48C49.9141 21.5865 49.1757 19.781 47.91 18.37ZM22.22 9H25C27.62 9 30.39 10.88 33 12.8C33.53 13.19 34 13.57 34.52 13.95C35.15 14.43 35.75 14.88 36.31 15.28H22.22V9ZM7.79999 12.92C10.26 10.28 12.46 9 14.5 9H20.22V15.28H5.84C6.43 14.48 7.08999 13.69 7.79999 12.92ZM48 27.16C47.9974 27.382 47.9081 27.5941 47.7511 27.7511C47.5941 27.9081 47.382 27.9974 47.16 28H44.92C44.6886 26.5969 43.9663 25.3217 42.882 24.4016C41.7978 23.4816 40.422 22.9765 39 22.9765C37.578 22.9765 36.2022 23.4816 35.118 24.4016C34.0337 25.3217 33.3114 26.5969 33.08 28H17.92C17.6886 26.5969 16.9663 25.3217 15.882 24.4016C14.7978 23.4816 13.422 22.9765 12 22.9765C10.578 22.9765 9.20221 23.4816 8.11795 24.4016C7.03369 25.3217 6.31143 26.5969 6.07999 28H2.84C2.61802 27.9974 2.40587 27.9081 2.2489 27.7511C2.09193 27.5941 2.0026 27.382 2 27.16V21.56C2 21.42 2 21.36 2.25 20.87L2.32999 20.71C2.58698 20.162 2.88449 19.6338 3.22 19.13L3.29001 19.04V18.97L3.34 18.9C3.58 18.51 3.94 17.95 4.34 17.28H42.24C42.8514 17.424 43.4451 17.6353 44.01 17.91C44.8844 18.336 45.6634 18.9347 46.3 19.67C47.2843 20.7092 47.8841 22.0534 48 23.48V27.16Z" />
  </>
);

export default withSvg(50, 50)(Svg);

import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M45.23 28.32H44.23C45.092 27.6647 45.8951 26.9353 46.63 26.14C49 23.52 48.7 19.98 47.33 14.34C46.53 11.07 45.33 9.39997 43.83 9.39997C43.255 9.45865 42.7175 9.71327 42.3079 10.1211C41.8982 10.5289 41.6413 11.0652 41.58 11.64C41.26 13.09 39.13 15.28 36.74 16.07C36.74 15.85 36.74 15.6 36.74 15.37C36.9597 13.2585 36.6964 11.1247 35.97 9.13001C34.38 4.93001 30.79 1.71003 29.03 2.02003C28.7182 2.06816 28.4344 2.22713 28.2305 2.46778C28.0266 2.70844 27.9163 3.01462 27.92 3.33003C27.6356 5.45444 27.0532 7.52814 26.19 9.49C25.6508 10.4611 25.0249 11.3816 24.32 12.24C23.3373 13.3495 22.5556 14.6219 22.01 16C21.812 17.0181 21.7782 18.0612 21.91 19.09H12.8C12.658 19.0902 12.5177 19.1206 12.3884 19.1792C12.259 19.2378 12.1437 19.3233 12.05 19.43L4.45001 28.12C4.39069 28.1845 4.34327 28.2589 4.31 28.34C3.12165 28.4473 2.01641 28.9953 1.21149 29.876C0.406562 30.7568 -0.0398844 31.9068 -0.0400391 33.1V37.44C-0.0373969 38.7043 0.466009 39.916 1.35999 40.81C2.25396 41.704 3.46571 42.2074 4.72998 42.21H5.12C5.12 42.21 5.12 42.28 5.12 42.32C5.44993 43.6237 6.2083 44.7788 7.27338 45.5999C8.33845 46.4209 9.64846 46.8604 10.9932 46.8477C12.338 46.835 13.6395 46.3709 14.6889 45.5299C15.7383 44.6889 16.4747 43.5197 16.78 42.21H33.1C33.1 42.21 33.1 42.28 33.1 42.32C33.4299 43.6237 34.1883 44.7788 35.2534 45.5999C36.3184 46.4209 37.6284 46.8604 38.9732 46.8477C40.318 46.835 41.6195 46.3709 42.6689 45.5299C43.7183 44.6889 44.4547 43.5197 44.76 42.21H45.15C46.4142 42.2074 47.626 41.704 48.52 40.81C49.4139 39.916 49.9173 38.7043 49.92 37.44V33.09C49.9176 31.8394 49.4252 30.6396 48.5484 29.7479C47.6716 28.8561 46.4803 28.3436 45.23 28.32ZM24 16.45C24.5304 15.3656 25.203 14.3567 26 13.45C26.7999 12.4773 27.5032 11.429 28.1 10.32C28.9373 8.36621 29.548 6.32285 29.92 4.22999C31.8951 5.60731 33.3885 7.56936 34.19 9.83997C34.8103 11.5681 35.0291 13.4148 34.83 15.24C34.76 16.39 34.7 17.29 35.42 17.85C35.7086 18.0272 36.036 18.1317 36.374 18.1544C36.7119 18.177 37.0503 18.1171 37.36 17.98C40.28 17.04 43.07 14.39 43.59 12.08C43.6396 11.8361 43.7383 11.6047 43.88 11.4C43.88 11.4 44.71 11.75 45.46 14.82C46.85 20.54 46.79 23.06 45.22 24.82C43.9989 26.1181 42.6598 27.2998 41.22 28.35H39.65C39.6161 28.2776 39.5724 28.2103 39.52 28.15L38.72 27.25L39.64 26.86C39.64 26.86 42.51 23.33 41.97 21.86C41.43 20.39 37.84 22.37 36.23 22.44C34.62 22.51 33.69 20.19 33.37 18.44C33.05 16.69 32.11 14.59 30.86 14.95C29.86 15.23 28.02 17.95 27.28 19.11H23.98C23.8455 18.2279 23.8523 17.33 24 16.45ZM14.85 41.93C14.8313 42.0113 14.8079 42.0914 14.78 42.17C14.5861 42.827 14.2209 43.4206 13.7218 43.8898C13.2227 44.3591 12.6077 44.687 11.94 44.84C10.9617 45.0691 9.93301 44.9217 9.05847 44.4269C8.18393 43.9322 7.52759 43.1265 7.21997 42.17C7.09867 41.7885 7.03794 41.3903 7.03998 40.99C7.03973 40.7142 7.06994 40.4392 7.13 40.17C7.35373 39.314 7.85492 38.5563 8.55518 38.0156C9.25544 37.4748 10.1152 37.1815 11 37.1815C11.8848 37.1815 12.7445 37.4748 13.4448 38.0156C14.145 38.5563 14.6463 39.314 14.87 40.17C14.9941 40.7509 14.9872 41.3521 14.85 41.93ZM42.85 41.93C42.8313 42.0113 42.8079 42.0914 42.78 42.17C42.5861 42.827 42.2209 43.4206 41.7218 43.8898C41.2227 44.3591 40.6077 44.687 39.94 44.84C38.9617 45.0691 37.933 44.9217 37.0585 44.4269C36.1839 43.9322 35.5276 43.1265 35.22 42.17C35.0987 41.7885 35.0379 41.3903 35.04 40.99C35.0397 40.7142 35.0699 40.4392 35.13 40.17C35.3537 39.314 35.8549 38.5563 36.5552 38.0156C37.2554 37.4748 38.1152 37.1815 39 37.1815C39.8848 37.1815 40.7445 37.4748 41.4448 38.0156C42.145 38.5563 42.6463 39.314 42.87 40.17C42.9941 40.7509 42.9872 41.3521 42.85 41.93ZM48 37.4C48 38.1346 47.7081 38.8392 47.1887 39.3587C46.6692 39.8782 45.9646 40.17 45.23 40.17H44.9C44.6451 38.7913 43.9154 37.5454 42.8376 36.6486C41.7599 35.7519 40.4021 35.2609 39 35.2609C37.5979 35.2609 36.2401 35.7519 35.1624 36.6486C34.0846 37.5454 33.3549 38.7913 33.1 40.17H16.9C16.6451 38.7913 15.9154 37.5454 14.8376 36.6486C13.7599 35.7519 12.4021 35.2609 11 35.2609C9.59794 35.2609 8.24013 35.7519 7.16235 36.6486C6.08458 37.5454 5.35489 38.7913 5.09998 40.17H4.77002C4.03537 40.17 3.33075 39.8782 2.81128 39.3587C2.2918 38.8392 2 38.1346 2 37.4V33.05C2 32.3153 2.2918 31.6108 2.81128 31.0913C3.33075 30.5718 4.03537 30.28 4.77002 30.28H4.87C4.9949 30.2791 5.11822 30.252 5.23193 30.2003C5.34564 30.1486 5.44717 30.0735 5.52997 29.98L6.95996 28.29L12.96 21.4C13.0537 21.2933 13.169 21.2079 13.2983 21.1492C13.4277 21.0906 13.568 21.0602 13.71 21.06H29.63C29.9022 21.0613 30.171 21.1198 30.4191 21.2318C30.6672 21.3437 30.889 21.5067 31.07 21.71L37.89 29.33C37.9281 29.6041 38.063 29.8555 38.2702 30.0388C38.4774 30.2222 38.7434 30.3255 39.02 30.33H45.18C45.5454 30.3287 45.9075 30.3997 46.2454 30.5389C46.5833 30.6782 46.8903 30.8829 47.1487 31.1413C47.4071 31.3997 47.6118 31.7067 47.751 32.0446C47.8903 32.3824 47.9613 32.7445 47.96 33.11L48 37.4Z" />
  </>
);

export default withSvg(50, 50)(Svg);
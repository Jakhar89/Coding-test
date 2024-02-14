import React from 'react';

import { withSvg } from '@/utility/components/Icon/Svg';

const Svg = () => (
  <>
    <path d="M28.0001 27C28.0001 28.3019 27.1708 29.4101 26.0116 29.8252V32C26.0116 32.5587 25.5587 33.0116 25.0001 33.0116C24.4414 33.0116 23.9885 32.5587 23.9885 32V29.8252C22.8294 29.4101 22.0001 28.3019 22.0001 27C22.0001 25.6981 22.8294 24.5899 23.9885 24.1748V11C23.9885 10.4414 24.4414 9.98846 25.0001 9.98846C25.5587 9.98846 26.0116 10.4414 26.0116 11V24.1748C27.1708 24.5899 28.0001 25.6981 28.0001 27Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23.0001 0H27.0001V4.07417C38.7725 5.0877 48.0116 14.9649 48.0116 27C48.0116 39.7089 37.709 50.0116 25.0001 50.0116C12.2911 50.0116 1.98853 39.7089 1.98853 27C1.98853 14.9649 11.2276 5.08772 23.0001 4.07417V0ZM4.01163 27C4.01163 15.4084 13.4085 6.01156 25.0001 6.01156C36.5917 6.01156 45.9885 15.4084 45.9885 27C45.9885 38.5916 36.5917 47.9885 25.0001 47.9885C13.4085 47.9885 4.01163 38.5916 4.01163 27Z"
    />
    <path d="M43.7575 1.99973L40.9291 4.82812L42.2206 6.11963L40.7144 7.62626L42.3735 9.28488L43.8794 7.77849L45.171 9.07002L47.9994 6.24162L43.7575 1.99973Z" />
  </>
);

export default withSvg(50, 50)(Svg);
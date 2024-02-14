import React from 'react';

import { RichTextWrapper, RICH_TEXT_CLASSNAME } from './StyledRichText';

const RichText = ({ children }) => {
  const encodedText = encodeURI(children);
  const decodedText = decodeURIComponent(encodedText);
  return (
    <RichTextWrapper
      className={RICH_TEXT_CLASSNAME}
      dangerouslySetInnerHTML={{ __html: decodedText }}
    />
  );
};

export default RichText;

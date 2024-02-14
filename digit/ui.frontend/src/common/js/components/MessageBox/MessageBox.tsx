import React from 'react';

import { MessageBoxElement } from './StyledMessageBox';

const MessageBox = ({ children }) => {
  return <MessageBoxElement>{children}</MessageBoxElement>;
};

export default MessageBox;

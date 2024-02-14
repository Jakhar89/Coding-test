import React from 'react';

import { InvalidMessage } from './StyledErrorMessage';

const ErrorMessage = ({ children }) => <InvalidMessage>{children}</InvalidMessage>;

export default ErrorMessage;

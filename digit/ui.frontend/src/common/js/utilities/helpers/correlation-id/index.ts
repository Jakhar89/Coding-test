import Cookies from 'js-cookie';

import { v4 as uuidv4 } from 'uuid';

const CORRELATION_ID_KEY = 'correlation-id';
const DELIMITER = '|';
const ONE_HOUR = 0.0416667; // 1/24
/**
 * gets existing from session or generates new and stores
 * @return string
 */
export const getCorrelationId = (): string => {
  let correlationID: string;

  if (Cookies.get(CORRELATION_ID_KEY)) {
    correlationID = Cookies.get(CORRELATION_ID_KEY);
    return correlationID;
  }

  correlationID = uuidv4();
  Cookies.set(CORRELATION_ID_KEY, correlationID, { expires: ONE_HOUR, sameSite: 'strict' });

  return correlationID;
};

/**
 * creates correlation id from session + unique identifier on the end
 * example format: 03289ce8-d540-45ab-a26e-3c9aaa93ee49|75xb4y
 * @return string
 */
export const createUniqueCorrelationId = (): string => {
  const firstChunk = getCorrelationId();
  const uuid = uuidv4();
  const secondChunk = uuid.substring(0, 6);
  return [firstChunk, secondChunk].join(DELIMITER);
};

/**
 * clears correlation id from session
 * @return void
 */
export const clearCorrelationId = (): void => {
  Cookies.remove(CORRELATION_ID_KEY);
};

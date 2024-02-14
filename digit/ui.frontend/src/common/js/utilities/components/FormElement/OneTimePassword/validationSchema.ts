import * as Yup from 'yup';

import { AEMErrorMap } from '@/types/global/aem-definition';
import { errorSuccessValues } from '@/utility/helpers/validation';
import { OTP_KEY } from './definitions';

const ERROR_MSG = 'Your OTP code must be 6 digits';
const validationSchema = (errors: AEMErrorMap = errorSuccessValues?.errorMap) =>
  Yup.object().shape({
    [OTP_KEY]:
      //prettier-ignore
      Yup.string()
        .required(ERROR_MSG)
        .length(6, ERROR_MSG),
  });

export default validationSchema;

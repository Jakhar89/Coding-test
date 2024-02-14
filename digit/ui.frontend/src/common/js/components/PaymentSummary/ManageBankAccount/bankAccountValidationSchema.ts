import * as Yup from 'yup';

const validBSBFormat = (value) => /^\d{3}-?\d{3}$/.test(value);
const validAccountNumberFormat = (value) => /^(\d *?){6,10}$/.test(value);

export const validationSchema = {
  accountname: Yup.string()
    .required('Enter a valid account name.')
    .matches(/^[aA-zZ\s]+$/, 'Enter a valid account name'),
  bsbnumber: Yup.string()
    .required('Enter a valid bsb number.')
    .test('Valid bsb number', 'Enter a valid bsb number', validBSBFormat),
  accountnumber: Yup.string()
    .required('Enter a valid account number.')
    .test('Valid Account number', 'Enter a valid account number', validAccountNumberFormat),
};

export const bankAccountValidationSchema = Yup.object().shape({
  ...validationSchema,
});

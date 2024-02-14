import * as Yup from 'yup';

const validationSchema = {
  vehicleRegoNumber: Yup.string()
    .required('Please enter your vehicle registration number')
    .max(15, 'Vehicle Registration Number can be maxiumum of 15 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Enter a valid registration number'),
  surname: Yup.string()
    .required('Please enter your surname')
    .max(60, 'Surname can be a maximum of 60 characters')
    .matches(/^[a-zA-Z-' ]+$/, 'Enter a valid surname'),
  recaptcha:
    //prettier-ignore
    Yup.string()
    .nullable()
    .required('Please verify reCAPTCHA'),
};

export const portalGatewayComponentValidationSchema = Yup.object().shape({
  ...validationSchema,
});

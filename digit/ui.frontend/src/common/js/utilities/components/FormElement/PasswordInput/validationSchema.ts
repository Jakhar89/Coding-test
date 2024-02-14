import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      // To read more: https://regexr.com/
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)\_])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Character',
    )
    .required('Please Enter your password'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match with new password'),
});

export default validationSchema;

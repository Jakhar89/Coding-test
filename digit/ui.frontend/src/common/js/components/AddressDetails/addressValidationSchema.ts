import * as Yup from 'yup';

import { validationMessage } from '@/utility/helpers/validation';

const lettersNumbersDashesSpacesRegex = /^[a-zA-Z0-9- ]+$/;
const lettersDashesSpacesRegex = /^[a-zA-Z- ]+$/;

export const residentialAddressValidationSchema = {
  'residential-citySuburb': Yup.string()
    .required(validationMessage('a suburb'))
    .matches(lettersNumbersDashesSpacesRegex, validationMessage('a suburb using only letters, dashes and spaces')),

  'residential-country': Yup.string()
    .required(validationMessage('a country'))
    .matches(lettersDashesSpacesRegex, validationMessage('a country using only letters, dashes and spaces')),

  'residential-postZipCode': Yup.string()
    .required(validationMessage('a postcode'))
    .matches(/^\d{3,4}$/, validationMessage('a postcode using 3-4 numbers')),

  'residential-propertyName': Yup.string()
    .optional()
    .nullable()
    .matches(
      lettersNumbersDashesSpacesRegex,
      validationMessage('a property name using only letters, numbers, dashes and spaces'),
    ),

  'residential-stateProvince': Yup.string().required(validationMessage('a state or territory')),

  'residential-streetName': Yup.string()
    .required(validationMessage('a street name'))
    .matches(lettersDashesSpacesRegex, validationMessage('a street name using only letters, dashes and spaces')),

  'residential-streetNumber': Yup.string()
    .required(validationMessage('a street number'))
    .matches(
      lettersNumbersDashesSpacesRegex,
      validationMessage('a street number using only letters, numbers, dashes and spaces'),
    ),

  'residential-streetType': Yup.string()
    .required(validationMessage('a street type'))
    .matches(lettersDashesSpacesRegex, validationMessage('a street type using only letters, dashes and spaces')),

  'residential-unitNumber': Yup.string()
    .optional()
    .nullable()
    .matches(
      lettersNumbersDashesSpacesRegex,
      validationMessage('a unit number using only letters, numbers, dashes and spaces'),
    ),
};

export const mailingAddressValidationSchema = {
  'mailing-citySuburb': Yup.string().when('copyAddressTo', {
    is: false,
    then: Yup.string()
      .required(validationMessage('a suburb'))
      .matches(lettersNumbersDashesSpacesRegex, validationMessage('a suburb using only letters, dashes and spaces')),
  }),

  'mailing-country': Yup.string()
    .nullable()
    .when('copyAddressTo', {
      is: false,
      then: Yup.string()
        .required(validationMessage('a country'))
        .matches(lettersDashesSpacesRegex, validationMessage('a country using only letters, dashes and spaces')),
    }),
  'mailing-postZipCode': Yup.string().when('copyAddressTo', {
    is: false,
    then: Yup.string()
      .required(validationMessage('a postcode'))
      .matches(/^\d{3,4}$/, validationMessage('a postcode using 3-4 numbers')),
  }),

  'mailing-propertyName': Yup.string().when('copyAddressTo', {
    is: false,
    then: Yup.string()
      .optional()
      .nullable()
      .matches(
        lettersNumbersDashesSpacesRegex,
        validationMessage('a property name using only letters, numbers, dashes and spaces'),
      ),
  }),

  'mailing-stateProvince': Yup.string().when('copyAddressTo', {
    is: false,
    then: Yup.string().required(validationMessage('a state or territory')),
  }),

  'mailing-addressLine1': Yup.string().when(['copyAddressTo', 'isPoBox'], {
    is: (copyAddressTo, isPoBox) => !copyAddressTo && isPoBox,
    then: Yup.string()
      .required(validationMessage('a PO Box or Locked Bag number'))
      .matches(
        lettersNumbersDashesSpacesRegex,
        validationMessage('a PO Box or Locked Bag number using only letters, numbers, dashes and spaces'),
      ),
  }),

  'mailing-streetName': Yup.string().when(['copyAddressTo', 'isPoBox'], {
    is: (copyAddressTo, isPoBox) => !copyAddressTo && !isPoBox,
    then: Yup.string()
      .required(validationMessage('a street name'))
      .matches(lettersDashesSpacesRegex, validationMessage('a street name using only letters, dashes and spaces')),
  }),

  'mailing-streetNumber': Yup.string().when(['copyAddressTo', 'isPoBox'], {
    is: (copyAddressTo, isPoBox) => !copyAddressTo && !isPoBox,
    then: Yup.string()
      .required(validationMessage('a street number'))
      .matches(
        lettersNumbersDashesSpacesRegex,
        validationMessage('a street number using only letters, numbers, dashes and spaces'),
      ),
  }),

  'mailing-streetType': Yup.string().when(['copyAddressTo', 'isPoBox'], {
    is: (copyAddressTo, isPoBox) => !copyAddressTo && !isPoBox,
    then: Yup.string()
      .required(validationMessage('a street type'))
      .matches(lettersDashesSpacesRegex, validationMessage('a street type using only letters, dashes and spaces')),
  }),

  'mailing-unitNumber': Yup.string().when(['copyAddressTo', 'isPoBox'], {
    is: (copyAddressTo, isPoBox) => !copyAddressTo && !isPoBox,
    then: Yup.string()
      .optional()
      .nullable()
      .matches(
        lettersNumbersDashesSpacesRegex,
        validationMessage('a unit number using only letters, numbers, dashes and spaces'),
      ),
  }),
};

export const addressDetailsValidationSchema = Yup.object().shape({
  ...mailingAddressValidationSchema,
  ...residentialAddressValidationSchema,
});

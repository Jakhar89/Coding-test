import { digitsOnly, getAEMErrorMessageByCode, validAusMobilePhoneFormat } from '.';

describe('digitsOnly', () => {
  it('tests string contains only digits', () => {
    let str = 'irure qui 123';
    expect(digitsOnly(str)).toEqual(false);

    str = '123456';
    expect(digitsOnly(str)).toEqual(true);

    str = '12 34';
    expect(digitsOnly(str)).toEqual(false);
  });
});

describe('validAusMobilePhoneFormat', () => {
  it('tests string is valid 10 char AU mobile format starting with 04...', () => {
    let str = '123456';
    expect(validAusMobilePhoneFormat(str)).toEqual(false);

    str = '0412345x';
    expect(validAusMobilePhoneFormat(str)).toEqual(false);

    str = '04123456';
    expect(validAusMobilePhoneFormat(str)).toEqual(false);

    str = '0412345678';
    expect(validAusMobilePhoneFormat(str)).toEqual(true);
  });
});

// Error code mapping
describe('get error code from AEM', () => {
  it('tests error message returned from array', () => {
    const E14Message = 'Please ensure you have entered a valid phone number.';

    const errorMap = [
      { errorCode: 'E14', errorMessage: E14Message },
      {
        errorCode: 'E21',
        errorMessage: 'A valid Phone number is required to be set as your Preferred contact number.',
      },
    ];

    expect(getAEMErrorMessageByCode('E14', errorMap)).toEqual(E14Message);
    expect(getAEMErrorMessageByCode('', errorMap)).toEqual('Unknown validation error occurred.');
    expect(getAEMErrorMessageByCode('E30', errorMap)).toEqual('Unknown validation error occurred.');
  });
});

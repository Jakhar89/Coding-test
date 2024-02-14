import { CallbackType } from '@forgerock/javascript-sdk';

import { emailLookupTable, getFirstCallbackByType, sortCallbacksByType } from './';
import mockResortedCaptcha from './mock-resorted-recaptcha.json';
import mockResortedText from './mock-resorted-textoutput.json';
import mock from './mock.json';

describe('sortCallbacksByType', () => {
  it('reorder callbacks so TextOutput last', () => {
    expect(sortCallbacksByType(mock?.callbacks)).toEqual(mockResortedText?.callbacks);
  });

  it('reorder callbacks so Recaptcha last', () => {
    expect(sortCallbacksByType(mock?.callbacks, CallbackType.ReCaptchaCallback)).toEqual(
      mockResortedCaptcha?.callbacks,
    );
  });
});

describe('getFirstCallbackByType', () => {
  it('get callbacks by TextOutputCallback', () => {
    const response = {
      type: 'TextOutputCallback',
      output: [
        {
          name: 'message',
          value: 'E01',
        },
        {
          name: 'messageType',
          value: '2',
        },
      ],
      _id: 2,
    };
    expect(getFirstCallbackByType(mock?.callbacks)).toEqual(response);
  });

  it('get callbacks by string attribute callback', () => {
    const response = {
      type: 'StringAttributeInputCallback',
      output: [
        { name: 'name', value: 'frUnindexedString4' },
        { name: 'prompt', value: 'Brand' },
        { name: 'required', value: true },
        { name: 'policies', value: {} },
        { name: 'failedPolicies', value: [] },
        { name: 'validateOnly', value: false },
        { name: 'value', value: '' },
      ],
      input: [
        { name: 'IDToken1', value: '' },
        { name: 'IDToken1validateOnly', value: false },
      ],
      _id: 0,
    };
    expect(getFirstCallbackByType(mock?.callbacks, CallbackType.StringAttributeInputCallback)).toEqual(response);
  });

  it('get returns undefined if type not found', () => {
    expect(getFirstCallbackByType(mock?.callbacks, CallbackType.ChoiceCallback)).toEqual(undefined);
  });
});

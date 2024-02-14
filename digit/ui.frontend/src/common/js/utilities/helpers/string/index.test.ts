import { toSentenceCase, toTitleCase, convertYesNotoYN } from '.';

describe('toTitleCase', () => {
  it('converts first letter of each word in string to uppercase', () => {
    const str = 'irure qui exercitation in laboris';
    const result = 'Irure Qui Exercitation In Laboris';
    expect(toTitleCase(str)).toEqual(result);
  });
});

describe('toSentenceCase', () => {
  it('converts first letter of sentence in string to uppercase', () => {
    const str = 'irure qui exercitation in laboris';
    const result = 'Irure qui exercitation in laboris';
    expect(toSentenceCase(str)).toEqual(result);
  });
});

describe('convertYesNotoYN', () => {
  it("converts 'Y' -> 'Yes'", () => {
    const str = 'Y';
    const result = 'Yes';
    expect(convertYesNotoYN(str)).toEqual(result);
  });

  it("converts 'Yes' -> 'Y'", () => {
    const str = 'Yes';
    const result = 'Y';
    expect(convertYesNotoYN(str, 'toAPI')).toEqual(result);
  });

  it("converts 'N' -> 'No'", () => {
    const str = 'N';
    const result = 'No';
    expect(convertYesNotoYN(str)).toEqual(result);
  });

  it("converts 'No' -> 'N'", () => {
    const str = 'No';
    const result = 'N';
    expect(convertYesNotoYN(str, 'toAPI')).toEqual(result);
  });
});

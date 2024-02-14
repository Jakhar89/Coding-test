import { emitTrackEvent } from '@/utility/helpers/analytics/';

let logMock: jest.SpyInstance;

describe('analytics data layer', function () {
  beforeAll(function () {
    logMock = jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  beforeEach(function () {
    window.digitalData = {};
  });

  afterAll(function () {
    logMock.mockReset();
  });

  test('digital data layer should be empty', function () {
    expect(window.digitalData).toBeNull;
  });

  test('new emitTrackEvent should populate data', function () {
    emitTrackEvent({ name: 'updateClick', data: { updateSection: 'Email Address' } });
    expect(window?.digitalData?.updateSection?.toEqual('Email Address'));
  });
});

import { isAuthorMode } from '@/utility/aem';

describe('aem author detection', function () {
  test('author mode should be undefined', function () {
    expect(window.parent.CQ).toBeUndefined();
  });

  test('author mode should be disabled', function () {
    window.parent.CQ = {};

    expect(window.parent.CQ).not.toHaveProperty('wcm');
    expect(isAuthorMode()).toBeFalsy();
  });

  test('author mode should be enabled', function () {
    window.parent.CQ = {
      wcm: true,
    };

    expect(window.parent.CQ).toHaveProperty('wcm');
    expect(isAuthorMode()).toBeTruthy();
  });
});

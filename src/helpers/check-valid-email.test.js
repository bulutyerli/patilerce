import { default as checkValidEmail } from './check-valid-email';

describe('checkValidEmail', () => {
  it('should return true if email is valid', async () => {
    const testEmail = 'bulutyerli@gmail.com';
    const actual = checkValidEmail(testEmail);

    expect(actual).toBeTruthy();
  });

  it('should return false if email is not valid', () => {
    const testEmail = 'invalid-email';
    const actual = checkValidEmail(testEmail);

    expect(actual).toBeFalsy();
  });
});

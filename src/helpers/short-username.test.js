import userNameShort from './short-username';

describe('userNameShort', () => {
  it('should return shortened first name for more than 11 chars itself', () => {
    const userName = '12345678912e surname';
    const expected = '12345678912...';

    const actual = userNameShort(userName);
    expect(actual).toBe(expected);
  });

  it('should return first name only if name and surname more than 11 chars together', () => {
    const userName = 'bulut yerli123';
    const expected = 'bulut';

    const actual = userNameShort(userName);
    expect(actual).toBe(expected);
  });

  it('should return name and surname together if total less than 11 chars', () => {
    const userName = 'bulut yerli';
    const expected = 'bulut yerli';

    const actual = userNameShort(userName);
    expect(actual).toBe(expected);
  });
});

const { dateConverter } = require('./date-converter');

describe('dateConverter', () => {
  const mockDateNow = new Date('2024-03-15T13:00:00Z');

  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => mockDateNow.getTime());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should return 2 days ago for a day 2 days in the past', () => {
    const testDate = '2024-03-13T13:00:00Z';

    const actual = dateConverter(testDate);

    expect(actual).toBe('2 days ago');
  });

  it('should return in 2 months for a day 3 months later of todays day', () => {
    const testDate = '2024-05-13T13:00:00Z';

    const actual = dateConverter(testDate);

    expect(actual).toBe('in 2 months');
  });

  it('should return just now for a time less than a second', () => {
    const testDate = '2024-03-15T12:59:59Z';

    const actual = dateConverter(testDate);

    expect(actual).toBe('just now');
  });

  it('should return "invalid date" for an invalid date input', () => {
    const testDate = 'invalid-date';

    const actual = dateConverter(testDate);

    expect(actual).toBe('Invalid date');
  });
});

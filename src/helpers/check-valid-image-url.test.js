import checkValidImageUrl from './check-valid-image-url';

describe('checkValidImageUrl', () => {
  it('should return true for valid image URLs', () => {
    const validUrls = [
      'https://example.com/image.jpg',
      'https://example.com/photo.jpeg',
      'https://example.com/picture.png',
      'https://example.com/graphic.svg',
      'https://example.com/banner.gif',
      'https://example.com/art.bmp',
    ];

    validUrls.forEach((url) => {
      expect(checkValidImageUrl(url)).toBeTruthy();
    });
  });

  it('should return false for URLs without image extensions', () => {
    const invalidUrls = [
      'https://example.com/document.pdf',
      'https://example.com/textfile.txt',
      'https://example.com/archive.zip',
      'https://example.com/script.js',
    ];

    invalidUrls.forEach((url) => {
      expect(checkValidImageUrl(url)).toBeFalsy();
    });
  });
});

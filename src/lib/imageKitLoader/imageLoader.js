'use client';

const imageKitLoader = ({ src, width, quality }) => {
  const fileName = src.split('/').pop();

  const params = [`w-${width}`];
  if (quality) {
    params.push(`q-${quality}`);
  }

  const paramsString = params.join(',');

  const urlEndpoint = 'https://ik.imagekit.io/nuvola';
  const trimmedEndpoint = urlEndpoint.endsWith('/')
    ? urlEndpoint.slice(0, -1)
    : urlEndpoint;

  return `${trimmedEndpoint}/${fileName}?tr=${paramsString}`;
};

export default imageKitLoader;

import Image from 'next/image';

async function getCats() {
  const response = await fetch('https://api.thecatapi.com/v1/breeds/beng');
  const catData = await response.json();
  return catData;
}

async function getCatsImage() {
  const apiKey = process.env.API_KEY;
  const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
  const image = await response.json();
  return image[0];
}

export default async function BreedsPage() {
  const cats = await getCats();
  const catImage = await getCatsImage();
  console.log(cats);
  console.log(catImage.url);

  return (
    <>
      <h1>Breeds </h1>
      <Image
        src={catImage.url}
        width={300}
        height={300}
        alt="cat image"
        priority
      ></Image>
      <div>title: {cats.name} </div>
    </>
  );
}

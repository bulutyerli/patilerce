import Image from 'next/image';

export async function getImages(id) {
  try {
    const apiKey = process.env.CAT_API_KEY;

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${id}`,
      {
        headers: { 'x-api-key': apiKey },
      }
    );
    if (!response.ok) {
      throw new Error('something went wrong');
    }

    return response.json();
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function CatDetails({ params }) {
  const images = await getImages(params.id);

  return (
    <div>
      <div>
        {images.map((image) => {
          return (
            <Image
              key={params.id}
              src={image.url}
              alt={`Picture of ${params.name}`}
              width={300}
              height={300}
            ></Image>
          );
        })}
      </div>
      <div>Cats: {params.id}</div>
    </div>
  );
}

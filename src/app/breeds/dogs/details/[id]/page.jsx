export async function getImages(id) {
  const apiKey = process.env.CAT_API_KEY;

  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?=limit=5&breed_ids=${id}`,
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

export default async function DogDetails({ params }) {
  const images = await getImages(params.id);
  return (
    <div>
      <div>Dogs: {params.name}</div>
      <div>{images}</div>
    </div>
  );
}

export async function getDetails(params) {
  try {
    const apiKey = process.env.CAT_API_KEY;

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&breed_ids=${params.id}&api_key=REPLACE_ME`,
      {
        headers: { 'x-api-key': apiKey },
      }
    );
    const catData = await response.json();
    if (!response.ok) {
      throw new Error('something went wrong');
    }

    return catData;
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function CatDetails({ params }) {
  const catData = await getDetails(params);
  console.log(catData);
  return <div>Cats: {params.id}</div>;
}

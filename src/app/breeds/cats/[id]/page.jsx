import Breeds from '@/components/breeds/breeds';

const apiKey = process.env.CAT_API_KEY;

let totalData;
export async function getCats() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function BreedsPage({ params }) {
  try {
    const cats = await getCats();
    totalData = cats.length;

    return <Breeds params={params} breedData={cats} type={'cats'} />;
  } catch (error) {
    throw new Error(error);
  }
}

export default BreedsPage;

export async function generateStaticParams() {
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);

  // Generate an array of dynamic page objects for numbers and alphabets.
  const dynamicPages = [];

  // Generate dynamic pages for numbers from 1 to totalPages.
  for (let index = 1; index <= totalPages; index++) {
    dynamicPages.push({
      id: index.toString(),
    });
  }

  // Generate dynamic pages for alphabets from 'a' to 'z'.
  for (let alphabet = 97; alphabet <= 122; alphabet++) {
    const alphabetChar = String.fromCharCode(alphabet);
    dynamicPages.push({
      id: alphabetChar,
    });
  }
  return dynamicPages;
}

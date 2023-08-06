import BreedCard from '@/components/breedCard/breedCard';
import styles from '@/app/breeds/breeds.module.scss';
import notFound from 'public/images/catNotFound.png';
import Link from 'next/link';
import Pagination from '@/components/pagination/pagination';

const apiKey = process.env.CAT_API_KEY;

export async function getCats() {
  try {
    const response = await fetch('https://api.thecatapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    const catData = await response.json();
    if (!response.ok) {
      throw new Error('something went wrong');
    }

    const totalData = catData.length;
    const dataPerPage = 15;
    pageNum: Math.ceil(totalData / dataPerPage);
    return catData;
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function BreedsPage({ params }) {
  const cats = await getCats();
  console.log('data fetch is done');
  const totalData = cats.length;
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);
  let currentPage = params.pageNum;
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  return (
    <section className={styles.container}>
      <h1>Cat Breeds </h1>
      <ul className={styles.cardContainer}>
        {cats.slice(startIndex, endIndex).map((cat) => {
          let imageUrl = cat.image?.url || notFound;

          return (
            <li key={cat.id}>
              <Link href={`/breeds/cats/details/${cat.id}`}>
                <BreedCard image={imageUrl} data={cat} />
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        type={'cats'}
      />
    </section>
  );
}

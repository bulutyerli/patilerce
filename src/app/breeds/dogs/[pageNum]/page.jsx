import BreedCard from '@/components/breedCard/breedCard';
import styles from '@/app/breeds/breeds.module.scss';
import notFound from 'public/images/dogNotFound.png';
import Link from 'next/link';
import Pagination from '@/components/pagination/pagination';

const apiKey = process.env.CAT_API_KEY;

export async function getDogs() {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
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

async function BreedsPage({ params }) {
  const dogs = await getDogs();
  console.log('fetched data here');
  const totalData = dogs.length;
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);
  let currentPage = params.pageNum;
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  return (
    <section className={styles.container}>
      <h1>Dog Breeds </h1>
      <ul className={styles.cardContainer}>
        {dogs.slice(startIndex, endIndex).map((dog) => {
          let imageUrl = dog.image?.url || notFound;
          console.log(params.pageNum);

          return (
            <li key={dog.id}>
              <Link href={`/breeds/dogs/details/${dog.id}`}>
                <BreedCard image={imageUrl} data={dog} />
              </Link>
            </li>
          );
        })}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        type={'dogs'}
      />
    </section>
  );
}

export default BreedsPage;

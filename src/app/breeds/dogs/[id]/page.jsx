import BreedCard from '@/components/breedCard/breedCard';
import styles from '@/app/breeds/breeds.module.scss';
import notFound from 'public/images/dogNotFound.png';
import Link from 'next/link';
import Pagination from '@/components/pagination/pagination';
import LetterFilter from '@/components/letterFilter/letterFilter';

const apiKey = process.env.DOG_API_KEY;

export async function getDogs() {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    if (!response.ok) {
      throw new Error('something went wrong');
    }

    return response.json();
  } catch (error) {
    console.log('something went wrong', error);
  }
}

async function BreedsPage({ params }) {
  const dogs = await getDogs();
  console.log('fetched data here');
  const convertNum = (id) => {
    const num = parseInt(id);
    return isNaN(num) ? id : num;
  };
  const totalData = dogs.length;
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);
  let currentPage = convertNum(params.id);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;
  const filteredData =
    typeof currentPage === 'string'
      ? dogs.filter((dog) => dog.name.toLowerCase().startsWith(currentPage))
      : dogs.slice(startIndex, endIndex);

  console.log(typeof currentPage);

  return (
    <section className={styles.container}>
      <h1>Dog Breeds </h1>
      <LetterFilter currentPage={currentPage} type="dogs" />
      <ul className={styles.cardContainer}>
        {filteredData.map((dog) => {
          let imageUrl = dog.image?.url || notFound;
          console.log(dog);
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
        type="dogs"
      />
    </section>
  );
}

export default BreedsPage;

/* export async function generateStaticParams() {
  const cards = await getDogs();
  const totalData = cards.length;
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);

  return Array.from({ length: totalPages }, (_, index) => ({
    id: (index + 1).toString(),
  }));
}
 */

import BreedCard from '@/components/BreedCard/BreedCard';
import styles from './breeds.module.scss';
import Link from 'next/link';
import Pagination from '@/components/Pagination/Pagination';
import LetterFilter from '@/components/Community/LetterFilter/LetterFilter';

export default function Breeds({ params, breedData, type }) {
  const convertNum = (id) => {
    const num = parseInt(id);
    return isNaN(num) ? id : num;
  };
  const totalData = breedData.length;
  const dataPerPage = 15;
  const totalPages = Math.ceil(totalData / dataPerPage);
  let currentPage = convertNum(params.id);
  const startIndex = (currentPage - 1) * dataPerPage;
  const endIndex = startIndex + dataPerPage;

  // check if alphabetic filter or pagination
  const filteredData =
    typeof currentPage === 'string'
      ? breedData.filter((data) =>
          data.name.toLowerCase().startsWith(currentPage)
        )
      : breedData.slice(startIndex, endIndex);

  return (
    <section className={styles.container}>
      <h1>{type === 'cats' ? 'Cat' : 'Dog'} Breeds </h1>
      <LetterFilter type={type} />
      <ul className={styles.cardContainer}>
        {filteredData.map((data) => {
          // dont render breedcard if there is no image
          if (data.image) {
            let imageUrl = data.image.url;

            return (
              <li key={data.id}>
                <Link href={`/breeds/${type}/details/${data.id}`}>
                  <BreedCard image={imageUrl} name={data.name} />
                </Link>
              </li>
            );
          } else {
            return null;
          }
        })}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        type={type}
      />
    </section>
  );
}

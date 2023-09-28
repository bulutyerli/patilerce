import { getAdopts, getBreedCounts } from '@/lib/adopt/get-adopts';
import styles from './adopt.module.scss';
import AdoptCard from '@/components/adopt/adopt-card/adopt-card';
import Pagination from '@/components/pagination/pagination';
import AdoptFilters from '@/components/adopt/adopt-filters/adopt-filters';
import Link from 'next/link';

export default async function Adopt({ params, searchParams }) {
  const petType = params.petType === 'cats' ? 'Cat' : 'Dog';
  const { page: currentPage = 1, filter: filter = 'all' } = searchParams;
  const limit = 20;
  const { adopts, totalPages } = await getAdopts(
    { query: searchParams },
    limit,
    petType
  );

  const petNamesWithCounts = await getBreedCounts(petType);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{petType} Adoption</h1>
      <h2 className={styles.warning}>
        Important Notice: Selling pets for profit is strictly forbidden on this
        platform. If you encounter any requests for payment, please{' '}
        <Link href={'/contact-us'}>notify us</Link> immediately.
      </h2>
      <div className={styles.filters}>
        <AdoptFilters filterList={petNamesWithCounts} params={params.petType} />
      </div>
      <div className={styles.cardsContainer}>
        {adopts?.length > 0 ? (
          <div className={styles.cards}>
            {adopts?.map((adopt, index) => {
              return (
                <Link key={index} href={`/adopt/${params.petType}/${adopt.id}`}>
                  <AdoptCard data={adopt} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.noPetsMessage}>There is nothing to show.</div>
        )}
        {totalPages < 1 ? (
          ''
        ) : (
          <div className={styles.pagination}>
            <Pagination
              section={'adopt'}
              petType={params.petType}
              totalPages={totalPages}
              currentPage={currentPage}
              filter={filter}
            />
          </div>
        )}
      </div>
    </section>
  );
}

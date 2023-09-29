import styles from './my-listings.module.scss';
import { getAllUserAdopts, getBreedCounts } from '@/lib/adopt/get-adopts';
import AdoptCard from '@/components/adopt/adopt-card/adopt-card';
import Pagination from '@/components/pagination/pagination';
import AdoptFilters from '@/components/adopt/adopt-filters/adopt-filters';
import Link from 'next/link';

export default async function MyListings({ searchParams }) {
  const { page: currentPage = 1, filter } = searchParams;
  const limit = 20;
  const { adopts, totalPages } = await getAllUserAdopts(
    { query: searchParams },
    limit,
    filter
  );

  return (
    <section className={styles.container}>
      {filter ? (
        <h1 className={styles.title}>My Listings Pending Approval</h1>
      ) : (
        <h1 className={styles.title}>My Listings</h1>
      )}
      <div className={styles.cardsContainer}>
        {adopts?.length > 0 ? (
          <div className={styles.cards}>
            {adopts?.map((adopt, index) => {
              return (
                <Link key={index} href={`/adopt/${adopt.petType}/${adopt.id}`}>
                  <AdoptCard data={adopt} />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className={styles.noPetsMessage}>There is nothing to show.</div>
        )}
      </div>
      {totalPages < 2 ? (
        ''
      ) : (
        <div className={styles.pagination}>
          <Pagination
            section={'adopt'}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </section>
  );
}

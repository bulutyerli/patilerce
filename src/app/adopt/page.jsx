import { getAdopts } from '@/lib/adopt/get-adopts';
import styles from './adopt.module.scss';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdoptCard from '@/components/adopt/adopt-card/adopt-card';
import Pagination from '@/components/pagination/pagination';
import AdoptFilters from '@/components/adopt/adopt-filters/adopt-filters';
import Link from 'next/link';

export default async function Adopt({ searchParams }) {
  const { page: currentPage = 1, filter: filter = 'all' } = searchParams;
  const limit = 10;
  const { adopts, totalPages } = await getAdopts(
    {
      query: searchParams,
    },
    limit
  );
  const session = await getServerSession(authOptions);
  const isUser = session?.user;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Pet Adoption</h1>

      <AdoptFilters />
      <div className={styles.adoptList}>
        {adopts.map((adopt, index) => {
          return <AdoptCard key={index} data={adopt} />;
        })}
      </div>
      <Pagination
        section={'adopt'}
        totalPages={totalPages}
        currentPage={currentPage}
        filter={filter}
      />
    </section>
  );
}

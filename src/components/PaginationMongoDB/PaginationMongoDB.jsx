import Link from 'next/link';
import styles from './PaginationMongoDB.module.scss';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';

export default function PaginationMongoDB({ totalPages, currentPage }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className={styles.pagination}>
      <Link href={`/community/?page=1`}>
        <MdFirstPage />
      </Link>
      <MdNavigateBefore />
      {pageNumbers.map((pageNumber) => (
        <Link href={`/community/?page=${pageNumber}`} key={pageNumber}>
          {pageNumber}
        </Link>
      ))}
      <MdNavigateNext />
      <Link href={`/community/?page=${totalPages}`}>
        <MdLastPage />
      </Link>
    </div>
  );
}

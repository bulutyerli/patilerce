import Link from 'next/link';
import styles from './PaginationMongoDB.module.scss';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';

export default function PaginationMongoDB({ totalPages, currentPage, filter }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className={styles.pagination}>
      <Link href={`/community?filter=${filter}&page=1`}>
        <MdFirstPage />
      </Link>
      {parseInt(currentPage) === 1 ? (
        <MdNavigateBefore />
      ) : (
        <Link
          href={`/community?filter=${filter}&page=${parseInt(currentPage) - 1}`}
        >
          <MdNavigateBefore />
        </Link>
      )}

      {pageNumbers.map((pageNumber) => (
        <Link
          className={`${styles.elements} ${
            parseInt(currentPage) === pageNumber ? styles.activePage : ''
          }`}
          href={`/community?filter=${filter}&page=${pageNumber}`}
          key={pageNumber}
        >
          {pageNumber}
        </Link>
      ))}

      {parseInt(currentPage) === totalPages ? (
        <MdNavigateNext />
      ) : (
        <Link
          href={`/community?filter=${filter}&page=${parseInt(currentPage) + 1}`}
        >
          <MdNavigateNext />
        </Link>
      )}

      <Link href={`/community?filter=${filter}&page=${totalPages}`}>
        <MdLastPage />
      </Link>
    </div>
  );
}

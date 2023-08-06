import Link from 'next/link';
import styles from './pagination.module.scss';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';

export default function Pagination({ totalPages, currentPage, type }) {
  return (
    <ul className={styles.container}>
      <li>
        <Link href={`/breeds/${type}/1`}>
          <MdFirstPage />
        </Link>
      </li>
      <li>
        {currentPage > 1 ? (
          <Link href={`/breeds/${type}/${+currentPage - 1}`}>
            <MdNavigateBefore />
          </Link>
        ) : (
          <span>
            <MdNavigateBefore />
          </span>
        )}
      </li>

      {`${currentPage} / ${totalPages}`}
      {currentPage < totalPages ? (
        <li>
          <Link href={`/breeds/${type}/${+currentPage + 1}`}>
            <MdNavigateNext />
          </Link>
        </li>
      ) : (
        <span>
          <MdNavigateNext />
        </span>
      )}
      <li>
        <Link href={`/breeds/${type}/${totalPages}`}>
          <MdLastPage />
        </Link>
      </li>
    </ul>
  );
}

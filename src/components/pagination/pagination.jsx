import Link from 'next/link';
import styles from './pagination.module.scss';
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';

export default function Pagination({ totalPages, currentPage, type }) {
  // Convert currentPage to a number using parseInt()
  const currentPageNumber = parseInt(currentPage);

  if (!isNaN(currentPageNumber)) {
    return (
      <ul className={styles.container}>
        <li>
          <Link href={`/breeds/${type}/1`}>
            <MdFirstPage />
          </Link>
        </li>
        <li>
          {currentPageNumber > 1 ? (
            <Link href={`/breeds/${type}/${currentPageNumber - 1}`}>
              <MdNavigateBefore />
            </Link>
          ) : (
            <span>
              <MdNavigateBefore />
            </span>
          )}
        </li>

        {`${
          currentPageNumber > totalPages ? totalPages : currentPageNumber
        } / ${totalPages}`}

        {currentPageNumber < totalPages ? (
          <li>
            <Link href={`/breeds/${type}/${currentPageNumber + 1}`}>
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
}

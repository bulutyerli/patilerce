import Link from 'next/link';
import styles from './pagination.module.scss';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

export default function Pagination({
  section,
  totalPages,
  currentPage,
  filter,
}) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const generatePaginationLinks = () => {
    const visiblePages = [];
    const totalPagesToShow = 5; // Number of page links to show (excluding ellipsis)

    if (totalPages <= totalPagesToShow) {
      // If there are fewer pages than totalPagesToShow, show all pages
      visiblePages.push(...pageNumbers);
    } else if (currentPage <= totalPagesToShow - 2) {
      // If current page is near the beginning, no ellipsis on the left
      visiblePages.push(...pageNumbers.slice(0, totalPagesToShow - 2));
      visiblePages.push('ellipsis');
      visiblePages.push(totalPages);
    } else if (currentPage >= totalPages - (totalPagesToShow - 2)) {
      // If current page is near the end, no ellipsis on the right
      visiblePages.push(1);
      visiblePages.push('ellipsis');
      visiblePages.push(...pageNumbers.slice(-totalPagesToShow + 1));
    } else {
      // Ellipsis on both sides
      visiblePages.push(1);
      visiblePages.push('ellipsis');
      visiblePages.push(
        ...pageNumbers.slice(currentPage - 2, parseInt(currentPage) + 1)
      );
      visiblePages.push('ellipsis');
      visiblePages.push(totalPages);
    }

    return visiblePages.map((pageNumber, index) => {
      if (pageNumber === 'ellipsis') {
        return (
          <span className={styles.ellipsis} key={index}>
            ...
          </span>
        );
      }

      return (
        <Link
          className={`${styles.elements} ${
            parseInt(currentPage) === pageNumber ? styles.activePage : ''
          }`}
          href={`/${section}?filter=${filter}&page=${pageNumber}`}
          key={index}
        >
          {pageNumber}
        </Link>
      );
    });
  };

  return (
    <div className={styles.pagination}>
      {parseInt(currentPage) === 1 ? (
        <MdNavigateBefore />
      ) : (
        <Link
          href={`/${section}?filter=${filter}&page=${
            parseInt(currentPage) - 1
          }`}
        >
          <MdNavigateBefore />
        </Link>
      )}

      {generatePaginationLinks()}

      {parseInt(currentPage) === totalPages ? (
        <MdNavigateNext />
      ) : (
        <Link
          href={`/${section}?filter=${filter}&page=${
            parseInt(currentPage) + 1
          }`}
        >
          <MdNavigateNext />
        </Link>
      )}
    </div>
  );
}

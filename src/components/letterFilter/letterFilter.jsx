import Link from 'next/link';
import styles from './letterFilter.module.scss';

function LetterFilter({ type }) {
  const alphabet = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(97 + index)
  ); // creates array of english alphabet

  const links = alphabet.map((letter) => {
    return (
      <Link key={letter} href={`/breeds/${type}/${letter}`}>
        {letter}
      </Link>
    );
  });

  return <div className={styles.filter}>{links}</div>;
}

export default LetterFilter;

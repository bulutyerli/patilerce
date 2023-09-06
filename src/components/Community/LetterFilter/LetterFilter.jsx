import Link from 'next/link';
import styles from './letterFilter.module.scss';

function LetterFilter({ type }) {
  const alphabet = [
    '#',
    ...Array.from({ length: 26 }, (_, index) =>
      String.fromCharCode(97 + index)
    ),
  ]; // creates array of "#" followed by English alphabet letters a to z

  const links = alphabet.map((char) => {
    // Use different href based on whether it's '#' or a letter
    const href = char === '#' ? `/breeds/${type}/1` : `/breeds/${type}/${char}`;

    return (
      <nav key={char}>
        <Link href={href}>{char}</Link>
      </nav>
    );
  });

  return <div className={styles.filter}>{links}</div>;
}

export default LetterFilter;

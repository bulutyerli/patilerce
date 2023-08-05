import BreedCard from '@/components/breedCard/breedCard';
import catImage from 'public/images/catNotFound.svg';
import styles from './dogPage.module.scss';

const apiKey = process.env.DOG_API_KEY;

async function getCats() {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/breeds', {
      headers: { 'x-api-key': apiKey },
    });
    const catData = await response.json();
    if (!response.ok) {
      throw new Error('something went wrong');
    }
    return catData;
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function BreedsPage() {
  const cats = await getCats();

  const catCards = cats.map((cat) => {
    let imageUrl = cat.image?.url || catImage;

    return <BreedCard key={cat.id} image={imageUrl} data={cat} />;
  });

  return (
    <section className={styles.container}>
      <h1>Dog Breeds </h1>
      <div className={styles.card}>{catCards}</div>
    </section>
  );
}

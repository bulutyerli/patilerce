import ImageSlider from '@/components/breeds/image-slider/image-slider';
import styles from './dog-details.module.scss';

export async function getImages(id) {
  try {
    const apiKey = process.env.DOG_API_KEY;

    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?limit=5&breed_ids=${id}`,
      {
        headers: { 'x-api-key': apiKey },
      }
    );
    if (!response.ok) {
      throw new Error('something went wrong');
    }

    return response.json();
  } catch (error) {
    console.log('something went wrong', error);
  }
}

export default async function DogDetailsPage({ params }) {
  const images = await getImages(params.id);
  const breedInfo = images[0].breeds[0];
  let imageList = [];
  images.map((image) => {
    imageList.push(image.url);
  });

  const temperamentsArray = breedInfo?.temperament?.split(',');
  const temperaments =
    temperamentsArray &&
    temperamentsArray.map((temperament, i) => {
      return (
        <span key={i} className={styles.temperament}>
          {temperament}
        </span>
      );
    });

  return (
    <article className={styles.container}>
      <div className={styles.slider}>
        <ImageSlider imageList={imageList} />
      </div>
      <h1 className={styles.title}>{breedInfo.name}</h1>
      <div className={styles.temperaments}>{temperaments}</div>
      <section className={styles.infoContainer}>
        {breedInfo.bred_for ? (
          <div className={styles.info}>
            <h2>Bred for:</h2> <span>{breedInfo.bred_for}</span>
          </div>
        ) : (
          ''
        )}

        <div className={styles.info}>
          <h2>Life Span:</h2> <span>{breedInfo.life_span}</span>
        </div>
        <div className={styles.info}>
          <h2>Breed Group:</h2> <span>{breedInfo.breed_group}</span>
        </div>

        <div className={styles.info}>
          <h2>Weight Range:</h2> <span>{breedInfo.weight.metric} kg</span>
        </div>
        <div className={styles.info}>
          <h2>Height Range:</h2> <span>{breedInfo.height.metric} cm</span>
        </div>
      </section>
    </article>
  );
}

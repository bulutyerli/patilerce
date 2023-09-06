import ImageSlider from '@/components/image-slider/image-slider';
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

  const temperamentsArray = breedInfo.temperament.split(',');
  const temperaments = temperamentsArray.map((temperament, i) => {
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
      <div className={styles.title}>
        <h1>{breedInfo.name}</h1>
      </div>

      <div className={styles.temperaments}>{temperaments}</div>
      <section className={styles.infoContainer}>
        {breedInfo.bred_for ? (
          <div>
            <span>Bred for:</span> {breedInfo.bred_for}
          </div>
        ) : (
          ''
        )}

        <div>
          <span>Life Span:</span> {breedInfo.life_span}
        </div>
        <div>
          <span>Breed Group:</span> {breedInfo.breed_group}
        </div>

        <div>
          <span>Weight Range:</span> {breedInfo.weight.metric} kg
        </div>
        <div>
          <span>Height Range:</span> {breedInfo.height.metric} cm
        </div>
      </section>
    </article>
  );
}

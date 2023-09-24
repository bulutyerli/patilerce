import ImageSlider from '@/components/breeds/image-slider/image-slider';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaWikipediaW } from 'react-icons/fa';
import styles from './cat-details.module.scss';
import Link from 'next/link';
import Image from 'next/image';

export async function getImages(id) {
  try {
    const apiKey = process.env.CAT_API_KEY;

    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=5&has_breeds=1&breed_ids=${id}`,
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

const starGenerator = (score) => {
  let stars = [];
  let emptyStars = [];
  let totalStars = [];
  for (let i = 1; i <= score; i++) {
    stars.push(<AiFillStar className={styles.star} />);
  }
  for (let i = 1; i <= 5 - stars.length; i++) {
    emptyStars.push(<AiOutlineStar className={styles.emptyStar} />);
  }
  totalStars = [...stars, ...emptyStars];
  return totalStars;
};

export default async function CatDetailsPage({ params }) {
  const images = await getImages(params.id);
  const breedInfo = images[0].breeds[0];
  let imageList = [];
  images.map((image) => {
    imageList.push(image.url);
  });
  const countryCode = breedInfo.country_code.toLowerCase();
  const country = countryCode
    ? `https://flagcdn.com/60x45/${countryCode}.png`
    : '';

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
        <ImageSlider petName={breedInfo.name} imageList={imageList} />
      </div>
      <div className={styles.title}>
        <h1>{breedInfo.name}</h1>
        <Image src={country} alt="country flag" width={20} height={15}></Image>
      </div>

      <p className={styles.description}>
        {breedInfo.description}
        <Link
          className={styles.moreInfo}
          href={breedInfo.wikipedia_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info: <FaWikipediaW />
        </Link>
      </p>
      <div className={styles.temperaments}>{temperaments}</div>

      <span className={styles.lifeSpan}>
        Life Span: {breedInfo.life_span} years
      </span>
      <h2>Characteristics</h2>
      <section className={styles.scores}>
        <div className={styles.column1}>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Adaptability:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.adaptability)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Affection:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.affection_level)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Dog Friendly:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.dog_friendly)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Energy Level:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.energy_level)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Grooming:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.grooming)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Health Issues:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.health_issues)}
            </span>
          </div>
        </div>

        <div className={styles.column2}>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Intelligence:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.intelligence)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Shedding Level:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.shedding_level)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Social Needs:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.social_needs)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Stranger Friendly:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.stranger_friendly)}
            </span>
          </div>
          <div className={styles.scoreItem}>
            <span className={styles.scoreTitle}>Vocalisation:</span>
            <span className={styles.stars}>
              {starGenerator(breedInfo.vocalisation)}
            </span>
          </div>
        </div>
      </section>
    </article>
  );
}

import styles from './edit.module.scss';
import ListingForm from '@/components/adopt/listing-form/listing-form';
import { getAdoptById } from '@/lib/adopt/get-adopts';

export default async function EditPage({ params }) {
  const adopt = await getAdoptById(params.id);
  return (
    <div className={styles.container}>
      <ListingForm
        petData={{
          title: adopt.title,
          details: adopt.details,
          petType: adopt.petType,
          breed: adopt.breed,
          age: adopt.age,
          gender: adopt.gender,
          images: adopt.images,
          email: adopt.email,
          phoneNumber: adopt.phoneNumber,
        }}
        isEdit={true}
        adoptId={params.id}
      />
    </div>
  );
}

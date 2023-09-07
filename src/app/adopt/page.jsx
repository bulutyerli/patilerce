import styles from './adopt.module.scss';

export default function AdoptPage() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Pet Adoption</h1>
      <div className={styles.warningMessage}>
        <p>
          Selling pets is strictly prohibited on this site. If anyone requests
          payment for a pet, please don&apos;t hesitate to report it to us.
        </p>
      </div>
      <div className={styles.sideBar}>SideBar</div>
      <div className={styles.adoptList}>Adoption Lists</div>
    </section>
  );
}

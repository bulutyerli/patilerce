import styles from './about-us.module.scss';

export const metadata = {
  title: 'About Tailwish.com',
  description: 'Find more about tailwish.com',
};

export default function AboutUsPage() {
  return (
    <section className={styles.container}>
      <h1>About Us</h1>
      <p>
        At Tailwish, our mission is simple: we&apos;re here to help animals in
        need. Whether they&apos;re stray animals without a home or pets that
        people can&apos;t care for anymore, we want to find them loving new
        homes instead of letting them roam the streets.
      </p>
      <p>
        We&apos;re all about promoting responsible pet ownership and making sure
        animals are cared for properly. That&apos;s why we don&apos;t support
        selling cats or dogs for money on our platform. We&apos;re not a place
        for transactions; we&apos;re a community of animal lovers who want to do
        what&apos;s right.
      </p>
      <p>
        Our goal is to connect people who love animals and make a positive
        impact on these furry little beings&apos; lives. Together, we can reduce
        the number of animals suffering on the streets and increase the number
        of happy animals in loving homes.
      </p>
      <p>
        Join us in this mission to give every animal a chance for a happy
        ending. Thank you for being part of the Tailwish family, where every
        tail has a story, and every story deserves a happy ending.
      </p>
    </section>
  );
}

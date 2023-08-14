export default function UserProfile({ params }) {
  return (
    <section>
      <h1>Profile</h1>
      <p>{params.id}</p>
    </section>
  );
}

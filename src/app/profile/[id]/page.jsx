import styles from './user-profile-page.module.scss';

export default function UserPofilePage({ params }) {
  return <div>{params.id}</div>;
}

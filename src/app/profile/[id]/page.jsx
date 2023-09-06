import styles from './usersProfilePage.module.scss';

export default function usersProfilePage({ params }) {
  return <div>{params.id}</div>;
}

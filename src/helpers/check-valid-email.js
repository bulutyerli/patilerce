export default function checkValidEmail(email) {
  const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(
    email
  );

  return validEmail;
}

export default function checkValidImageUrl(url) {
  // Define a regular expression to match image file extensions
  const imgExtensions = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;

  // Use the test method to check if the URL matches the regex
  return imgExtensions.test(url);
}

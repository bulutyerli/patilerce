export function checkValidPassword(password) {
  if (password.length < 6) {
    return false;
  }

  // at least one number check
  if (!/\d/.test(password)) {
    return false;
  }

  // at least one special char check
  if (!/[!@#$%^&*]/.test(password)) {
    return false;
  }

  return true;
}

export function checkPasswordMatch(password, reEnteredPass) {
  if (password === reEnteredPass) {
    return true;
  }
}

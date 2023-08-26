const userNameShort = (name) => {
  if (name && name.length > 11) {
    const firstName = name.split(' ')[0];
    if (firstName.length > 11) {
      return `${firstName.substring(0, 11)}...`;
    } else {
      return firstName;
    }
  }
  return name;
};

export default userNameShort;

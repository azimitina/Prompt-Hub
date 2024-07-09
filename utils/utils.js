// Manipulate username
export const manipulateUsername = (username) => {
  const usernameArray = username.split("");
  let newUsernameArray = [];

  // Use a deterministic algorithm to rearrange characters
  for (let i = 0; i < usernameArray.length; i++) {
    let newIndex = (i * 2 + 3) % usernameArray.length;
    newUsernameArray.push(usernameArray[newIndex]);
  }

  return newUsernameArray.join("");
};

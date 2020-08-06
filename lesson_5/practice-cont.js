function generateUUID() {
  let characters = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  const sections = [8, 4, 4, 4, 12];

  let uuid = '';

  sections.forEach(length => {
    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * characters.length);
      uuid += characters[randomIndex];
    }

    if (length !== sections[sections.length - 1]) {
      uuid += '-'
    }
  })

  return uuid;
}

console.log(generateUUID());

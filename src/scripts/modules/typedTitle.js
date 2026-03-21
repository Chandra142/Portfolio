export function initTypedTitle(words) {
  const typedTitle = document.getElementById("typed-title");

  if (!typedTitle) {
    return;
  }

  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  setInterval(() => {
    const currentWord = words[wordIndex];

    if (!deleting) {
      if (characterIndex < currentWord.length) {
        characterIndex += 1;
        typedTitle.textContent = currentWord.slice(0, characterIndex);
        return;
      }

      setTimeout(() => {
        deleting = true;
      }, 1700);
      return;
    }

    if (characterIndex > 0) {
      characterIndex -= 1;
      typedTitle.textContent = currentWord.slice(0, characterIndex);
      return;
    }

    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }, 80);
}

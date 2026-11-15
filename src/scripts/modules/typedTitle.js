export function initTypedTitle(words) {
  const typedTitle = document.getElementById("typed-title");

  if (!typedTitle || !words.length) {
    return () => {};
  }

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let wordIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  let timeoutId;

  function showStaticTitle() {
    window.clearTimeout(timeoutId);
    typedTitle.textContent = words[0];
  }

  function tick() {
    if (motionPreference.matches || document.hidden) {
      return;
    }

    const currentWord = words[wordIndex];
    let delay = 80;

    if (!deleting) {
      characterIndex += 1;
      typedTitle.textContent = currentWord.slice(0, characterIndex);
      if (characterIndex === currentWord.length) {
        deleting = true;
        delay = 1700;
      }
    } else {
      characterIndex -= 1;
      typedTitle.textContent = currentWord.slice(0, characterIndex);
      delay = 40;
      if (characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }
    }

    timeoutId = window.setTimeout(tick, delay);
  }

  function handleMotionPreference(event) {
    if (event.matches) {
      showStaticTitle();
    } else {
      timeoutId = window.setTimeout(tick, 0);
    }
  }

  function handleVisibilityChange() {
    window.clearTimeout(timeoutId);
    if (!document.hidden && !motionPreference.matches) {
      timeoutId = window.setTimeout(tick, 0);
    }
  }

  if (motionPreference.matches) {
    showStaticTitle();
  } else {
    timeoutId = window.setTimeout(tick, 0);
  }

  motionPreference.addEventListener("change", handleMotionPreference);
  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
    window.clearTimeout(timeoutId);
    motionPreference.removeEventListener("change", handleMotionPreference);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  };
}

export function playAudio(file: string) {
  const audio = new Audio(file);
  audio.play();
}

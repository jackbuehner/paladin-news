export function isVowel(character: string) {
  return (
    character.toLowerCase() === 'a' ||
    character.toLowerCase() === 'e' ||
    character.toLowerCase() === 'i' ||
    character.toLowerCase() === 'o' ||
    character.toLowerCase() === 'u'
  );
}

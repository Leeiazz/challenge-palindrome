export const verifyPalindrome = (word = '') => {
  // Le saco los ascentos a las palabras en el caso de tener
  const withoutAccent = word
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  // Le saco los espacios para poder comparar también con su versión inversa
  const withoutSpaces = withoutAccent.split(' ').join('');
  // Genero la version inversa, por ej: casa => asac
  const reverse = withoutSpaces.split('').reverse().join('');
  // comparo ya si es palindromo o no
  return withoutSpaces === reverse;
};

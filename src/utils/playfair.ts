// Prepare the 5x5 matrix from the key
export function generateMatrix(key: string): string[][] {
  key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  const seen = new Set<string>();
  const matrix: string[][] = [];
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  const fullKey = (key + alphabet)
    .split("")
    .filter((c) => {
      if (seen.has(c)) return false;
      seen.add(c);
      return true;
    });

  for (let i = 0; i < 5; i++) {
    matrix.push(fullKey.slice(i * 5, i * 5 + 5));
  }

  return matrix;
}

// Find coordinates of a letter in the matrix
function findPosition(matrix: string[][], char: string): [number, number] {
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++)
      if (matrix[i][j] === char) return [i, j];
  return [-1, -1];
}

// Prepare digraphs (pair of letters)
function prepareDigraphs(text: string): string[][] {
  text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
  const digraphs: string[][] = [];
  let i = 0;
  while (i < text.length) {
    const a = text[i];
    let b = text[i + 1] || "X";
    if (a === b) b = "X";
    digraphs.push([a, b]);
    i += a === b ? 1 : 2;
  }
  return digraphs;
}

// Encrypt a pair
function encryptPair(matrix: string[][], a: string, b: string): string {
  const [row1, col1] = findPosition(matrix, a);
  const [row2, col2] = findPosition(matrix, b);

  if (row1 === row2) {
    return matrix[row1][(col1 + 1) % 5] + matrix[row2][(col2 + 1) % 5];
  } else if (col1 === col2) {
    return matrix[(row1 + 1) % 5][col1] + matrix[(row2 + 1) % 5][col2];
  } else {
    return matrix[row1][col2] + matrix[row2][col1];
  }
}

// Decrypt a pair
function decryptPair(matrix: string[][], a: string, b: string): string {
  const [row1, col1] = findPosition(matrix, a);
  const [row2, col2] = findPosition(matrix, b);

  if (row1 === row2) {
    return matrix[row1][(col1 + 4) % 5] + matrix[row2][(col2 + 4) % 5];
  } else if (col1 === col2) {
    return matrix[(row1 + 4) % 5][col1] + matrix[(row2 + 4) % 5][col2];
  } else {
    return matrix[row1][col2] + matrix[row2][col1];
  }
}

// Encrypt Playfair
export function encryptPlayfair(text: string, key: string): string {
  const matrix = generateMatrix(key);
  const digraphs = prepareDigraphs(text);
  return digraphs.map(([a, b]) => encryptPair(matrix, a, b)).join("");
}

// Decrypt Playfair
export function decryptPlayfair(text: string, key: string): string {
  const matrix = generateMatrix(key);
  const digraphs = prepareDigraphs(text);
  return digraphs.map(([a, b]) => decryptPair(matrix, a, b)).join("");
}
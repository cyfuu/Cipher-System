// Normalize text
function normalizeText(text: string): string {
  return text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
}

// Generate 5x5 matrix
export function generateMatrix(key: string): string[][] {
  const seen = new Set<string>();
  const matrix: string[][] = [];
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

  const normalizedKey = normalizeText(key);

  const fullKey = (normalizedKey + alphabet)
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

// Find position
function findPosition(matrix: string[][], char: string): [number, number] {
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 5; j++)
      if (matrix[i][j] === char) return [i, j];
  throw new Error(`Character not found: ${char}`);
}

// Prepare digraphs for encryption (add X between repeated letters)
function prepareDigraphs(text: string): string[][] {
  const clean = normalizeText(text);
  const result: string[][] = [];

  let i = 0;
  while (i < clean.length) {
    const a = clean[i];
    let b = clean[i + 1];

    if (!b) {
      result.push([a, "X"]);
      break;
    }

    if (a === b) {
      result.push([a, "X"]);
      i += 1;
    } else {
      result.push([a, b]);
      i += 2;
    }
  }

  return result;
}

// Split ciphertext into pairs for decryption
function splitPairs(text: string): string[][] {
  const clean = normalizeText(text);
  const result: string[][] = [];
  for (let i = 0; i < clean.length; i += 2) {
    result.push([clean[i], clean[i + 1]]);
  }
  return result;
}

// Encrypt pair
function encryptPair(matrix: string[][], a: string, b: string): string {
  const [r1, c1] = findPosition(matrix, a);
  const [r2, c2] = findPosition(matrix, b);

  if (r1 === r2) return matrix[r1][(c1 + 1) % 5] + matrix[r2][(c2 + 1) % 5];
  if (c1 === c2) return matrix[(r1 + 1) % 5][c1] + matrix[(r2 + 1) % 5][c2];

  return matrix[r1][c2] + matrix[r2][c1];
}

// Decrypt pair
function decryptPair(matrix: string[][], a: string, b: string): string {
  const [r1, c1] = findPosition(matrix, a);
  const [r2, c2] = findPosition(matrix, b);

  if (r1 === r2) return matrix[r1][(c1 + 4) % 5] + matrix[r2][(c2 + 4) % 5];
  if (c1 === c2) return matrix[(r1 + 4) % 5][c1] + matrix[(r2 + 4) % 5][c2];

  return matrix[r1][c2] + matrix[r2][c1];
}

// Encrypt
export function encryptPlayfair(text: string, key: string): string {
  const matrix = generateMatrix(key);
  const digraphs = prepareDigraphs(text);
  return digraphs.map(([a, b]) => encryptPair(matrix, a, b)).join("");
}

// Decrypt with intelligent X removal
export function decryptPlayfair(text: string, key: string): string {
  const matrix = generateMatrix(key);
  const pairs = splitPairs(text);
  let result = pairs.map(([a, b]) => decryptPair(matrix, a, b)).join("");

  // Intelligent X removal: remove Xs between repeated letters
  let cleaned = "";
  for (let i = 0; i < result.length; i++) {
    const current = result[i];
    const prev = cleaned[cleaned.length - 1];
    const next = result[i + 1];

    // Remove X if it is between two identical letters
    if (current === "X" && prev && next && prev === next) continue;
    cleaned += current;
  }

  return cleaned;
}
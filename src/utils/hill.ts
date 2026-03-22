const MOD = 26;

// =====================
// Helpers
// =====================

// Safe modulo
const mod26 = (n: number) => ((n % MOD) + MOD) % MOD;

// GCD
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

// Modular inverse (brute force)
const modInverse = (a: number, m: number) => {
  a = mod26(a);
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error("No modular inverse exists");
};

// Letter ↔ number
const charToNum = (c: string) => c.charCodeAt(0) - 65;
const numToChar = (n: number) => String.fromCharCode(mod26(n) + 65);

// Clean input
const cleanText = (text: string) => text.toUpperCase().replace(/[^A-Z]/g, "");

// =====================
// Matrix operations
// =====================

// Multiply 3x3 matrix with 3x1 vector
const multiplyMatrixVector = (matrix: number[][], vector: number[]) =>
  matrix.map((row) =>
    mod26(row.reduce((sum, val, i) => sum + val * vector[i], 0)),
  );

// =====================
// MATRIX INVERSE (3x3 mod 26)
// =====================

export const invertMatrix = (matrix: number[][]) => {
  const [a, b, c] = matrix[0];
  const [d, e, f] = matrix[1];
  const [g, h, i] = matrix[2];

  // determinant
  let det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);

  det = mod26(det);

  if (gcd(det, MOD) !== 1) {
    throw new Error("Matrix not invertible mod 26");
  }

  const invDet = modInverse(det, MOD);

  // Cofactor matrix (NO modulo yet!)
  const cof = [
    [e * i - f * h, -(d * i - f * g), d * h - e * g],
    [-(b * i - c * h), a * i - c * g, -(a * h - b * g)],
    [b * f - c * e, -(a * f - c * d), a * e - b * d],
  ];

  // Apply mod AFTER fixing signs
  const modCof = cof.map((row) => row.map((v) => mod26(v)));

  // Adjugate (transpose)
  const adj = modCof[0].map((_, i) => modCof.map((row) => row[i]));

  // Multiply by determinant inverse
  return adj.map((row) => row.map((val) => mod26(val * invDet)));
};

// =====================
// ENCRYPTION
// =====================

export const encryptHill = (text: string, matrix: number[][]): string => {
  let clean = cleanText(text);

  // pad with X
  while (clean.length % 3 !== 0) clean += "X";

  let result = "";

  for (let i = 0; i < clean.length; i += 3) {
    const vector = [
      charToNum(clean[i]),
      charToNum(clean[i + 1]),
      charToNum(clean[i + 2]),
    ];

    const encrypted = multiplyMatrixVector(matrix, vector);
    result += encrypted.map(numToChar).join("");
  }

  return result;
};

// =====================
// DECRYPTION
// =====================

export const decryptHill = (text: string, matrix: number[][]): string => {
  const clean = cleanText(text);
  const inverse = invertMatrix(matrix);

  let result = "";

  for (let i = 0; i < clean.length; i += 3) {
    const vector = [
      charToNum(clean[i]),
      charToNum(clean[i + 1]),
      charToNum(clean[i + 2]),
    ];

    const decrypted = multiplyMatrixVector(inverse, vector);
    result += decrypted.map(numToChar).join("");
  }

  return result;
};

// Affine Cipher Logic
// E(x) = (a*x + b) mod 26
// D(x) = a^-1 * (x - b) mod 26

// Helper: find modular inverse of a under mod 26
function modInverse(a: number, m: number): number {
  a = a % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error("No modular inverse found. 'a' must be coprime with 26.");
}

// Helper: make sure result is positive
function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

// Encrypt
export function affineEncrypt(text: string, a: number, b: number): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const x = char.charCodeAt(0) - 65;
        const encrypted = mod(a * x + b, 26);
        return String.fromCharCode(encrypted + 65);
      }
      return char; // keep spaces/symbols
    })
    .join("");
}

// Decrypt
export function affineDecrypt(text: string, a: number, b: number): string {
  const aInv = modInverse(a, 26);

  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      if (char >= "A" && char <= "Z") {
        const x = char.charCodeAt(0) - 65;
        const decrypted = mod(aInv * (x - b), 26);
        return String.fromCharCode(decrypted + 65);
      }
      return char;
    })
    .join("");
}
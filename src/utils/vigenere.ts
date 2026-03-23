// Encrypt using Vigenère Cipher
export function encryptVigenere(text: string, key: string): string {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (!cleanKey) return text;

  let result = "";
  let keyIndex = 0;

  for (const char of text) {
    const code = char.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const encChar = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      result += char === char.toLowerCase() ? encChar.toLowerCase() : encChar;
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
}

// Decrypt using Vigenère Cipher
export function decryptVigenere(text: string, key: string): string {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  if (!cleanKey) return text;

  let result = "";
  let keyIndex = 0;

  for (const char of text) {
    const code = char.toUpperCase().charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      const decChar = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      result += char === char.toLowerCase() ? decChar.toLowerCase() : decChar;
      keyIndex++;
    } else {
      result += char;
    }
  }
  return result;
}
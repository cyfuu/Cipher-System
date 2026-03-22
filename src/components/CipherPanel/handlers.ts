import { encryptPlayfair, decryptPlayfair } from "../../utils/playfair";
import { Cipher } from "../../constants/ciphers";

// Handles encryption for each cipher
export function encryptText(
  cipher: Cipher,
  text: string,
  keys: Record<string, any>
): string {
  switch (cipher) {
    case "Caesar Cipher":
      return `Encrypted(${cipher}, Shift=${keys.caesarShift}): ${text}`;
    case "Affine Cipher":
      return `Encrypted(${cipher}, A=${keys.affineA}, B=${keys.affineB}): ${text}`;
    case "Playfair Cipher":
      try {
        return encryptPlayfair(text, keys.playfairKey);
      } catch {
        return "Error: invalid key";
      }
    case "Hill Cipher":
      return `Encrypted(${cipher}, Matrix=${keys.hillMatrix}): ${text}`;
  }
}

// Handles decryption for each cipher
export function decryptText(
  cipher: Cipher,
  text: string,
  keys: Record<string, any>
): string {
  switch (cipher) {
    case "Caesar Cipher":
      return `Decrypted(${cipher}, Shift=${keys.caesarShift}): ${text}`;
    case "Affine Cipher":
      return `Decrypted(${cipher}, A=${keys.affineA}, B=${keys.affineB}): ${text}`;
    case "Playfair Cipher":
      try {
        return decryptPlayfair(text, keys.playfairKey);
      } catch {
        return "Error: invalid key";
      }
    case "Hill Cipher":
      return `Decrypted(${cipher}, Matrix=${keys.hillMatrix}): ${text}`;
  }
}
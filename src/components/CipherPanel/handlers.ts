import { encryptPlayfair, decryptPlayfair } from "../../utils/playfair";
import { encryptPigpen, decryptPigpen } from "../../utils/pigpen";
import { Cipher } from "../../constants/ciphers";

export function encryptText(cipher: Cipher, text: string, keys: Record<string, any>): string {
  switch (cipher) {
    case "Pigpen Cipher":
      return encryptPigpen(text); // ignore keys
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

export function decryptText(cipher: Cipher, text: string, keys: Record<string, any>): string {
  switch (cipher) {
    case "Pigpen Cipher":
      return decryptPigpen(text); // ignore keys
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
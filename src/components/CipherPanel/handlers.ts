import { encryptPlayfair, decryptPlayfair } from "../../utils/playfair";
import { encryptPigpen, decryptPigpen } from "../../utils/pigpen";
import { Cipher } from "../../constants/ciphers";
import { decryptHill, encryptHill } from "../../utils/hill";

export function encryptText(
  cipher: Cipher,
  text: string,
  keys: Record<string, any>,
): string {
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
      try {
        if (!keys.hillMatrix || keys.hillMatrix.length !== 3) {
          throw new Error();
        }
        return encryptHill(text, keys.hillMatrix);
      } catch {
        return "Error: invalid 3x3 matrix (must be invertible mod 26)";
      }

    default:
      return "Unsupported cipher";
  }
}

export function decryptText(
  cipher: Cipher,
  text: string,
  keys: Record<string, any>,
): string {
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
      try {
        if (!keys.hillMatrix || keys.hillMatrix.length !== 3) {
          throw new Error();
        }
        return decryptHill(text, keys.hillMatrix);
      } catch {
        return "Error: invalid 3x3 matrix (must be invertible mod 26)";
      }

    default:
      return "Unsupported cipher";
  }
}

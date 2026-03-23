import { encryptPlayfair, decryptPlayfair } from "../../utils/playfair";
import { encryptPigpen, decryptPigpen } from "../../utils/pigpen";
import { encryptHill, decryptHill } from "../../utils/hill";
import { affineEncrypt, affineDecrypt } from "../../utils/affine";
import { encryptVigenere, decryptVigenere } from "../../utils/vigenere";
import { Cipher } from "../../constants/ciphers";

export function encryptText(
  cipher: Cipher,
  text: string,
  keys: Record<string, any>,
): string {
  switch (cipher) {
    case "Pigpen Cipher":
      return encryptPigpen(text); // ignore keys

    case "Affine Cipher":
      try {
        if (keys.affineA == null || keys.affineB == null) {
          throw new Error();
        }
        return affineEncrypt(text, Number(keys.affineA), Number(keys.affineB));
      } catch {
        return "Error: invalid Affine keys (a must be coprime with 26)";
      }

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

    case "Vigenère Cipher":
      if (!keys.vigenereKey) return "Error: missing Vigenère key";
      return encryptVigenere(text, keys.vigenereKey);

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
      try {
        if (keys.affineA == null || keys.affineB == null) {
          throw new Error();
        }
        return affineDecrypt(text, Number(keys.affineA), Number(keys.affineB));
      } catch {
        return "Error: invalid Affine keys (a must be coprime with 26)";
      }

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

    case "Vigenère Cipher":
      if (!keys.vigenereKey) return "Error: missing Vigenère key";
      return decryptVigenere(text, keys.vigenereKey);
  }
}
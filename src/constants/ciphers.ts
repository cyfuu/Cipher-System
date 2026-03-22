// Cipher names
export type Cipher = "Caesar Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

export const CIPHERS: Cipher[] = ["Caesar Cipher", "Affine Cipher", "Playfair Cipher", "Hill Cipher"];

// Default key values
export const DEFAULT_KEYS = {
  caesarShift: 3,
  affineA: 5,
  affineB: 8,
  playfairKey: "KEY",
  hillMatrix: "3 3;2 5",
};
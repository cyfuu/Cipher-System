// Cipher names
export type Cipher =
  | "Pigpen Cipher"
  | "Affine Cipher"
  | "Playfair Cipher"
  | "Hill Cipher"
  | "Vigenere Cipher";

export const CIPHERS: Cipher[] = [
  "Pigpen Cipher",
  "Affine Cipher",
  "Playfair Cipher",
  "Hill Cipher",
  "Vigenere Cipher",
];

// Default key values
export const DEFAULT_KEYS = {
  pigpenKey: "",
  affineA: 5,
  affineB: 8,
  playfairKey: "KEY",
  hillMatrix: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
  vigenereKey: "KEY",
};
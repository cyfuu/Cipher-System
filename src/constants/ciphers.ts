// Cipher names
export type Cipher =
  | "Pigpen Cipher"
  | "Affine Cipher"
  | "Playfair Cipher"
  | "Hill Cipher"
  | "Vigenère Cipher";

export const CIPHERS: Cipher[] = [
  "Pigpen Cipher",
  "Affine Cipher",
  "Playfair Cipher",
  "Hill Cipher",
  "Vigenère Cipher",
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
// Cipher names
export type Cipher = "Pigpen Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

export const CIPHERS: Cipher[] = ["Pigpen Cipher", "Affine Cipher", "Playfair Cipher", "Hill Cipher"];

// Default key values
export const DEFAULT_KEYS = {
  pigpenKey: "",
  affineA: 5,
  affineB: 8,
  playfairKey: "KEY",
  hillMatrix: "3 3;2 5",
};
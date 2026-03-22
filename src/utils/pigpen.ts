const PIGPEN_GRID = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  ["J", "K", "L", "M", "N", "O", "P", "Q", "R"],
  ["S", "T", "U", "V", "W", "X", "Y", "Z"],
];

// Unicode “Pigpen-like” symbols
// Using box drawing and math symbols for better visual resemblance
const PIGPEN_SYMBOLS = [
  ["┌", "┐", "└", "┘", "─", "│", "╭", "╮", "╯"],
  ["╰", "╱", "╲", "╳", "═", "║", "╔", "╗", "╚"],
  ["╩", "╦", "╠", "╣", "╬", "▐", "▌", "▛", "▜"],
];

/**
 * Encrypt text using Pigpen cipher with visual symbols.
 */
export function encryptPigpen(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => {
      for (let row = 0; row < PIGPEN_GRID.length; row++) {
        const col = PIGPEN_GRID[row].indexOf(char);
        if (col !== -1) return PIGPEN_SYMBOLS[row][col];
      }
      return char; // preserve spaces & punctuation
    })
    .join("");
}

/**
 * Decrypt text using Pigpen cipher symbols back to letters.
 */
export function decryptPigpen(text: string): string {
  return text
    .split("")
    .map((char) => {
      for (let row = 0; row < PIGPEN_SYMBOLS.length; row++) {
        const col = PIGPEN_SYMBOLS[row].indexOf(char);
        if (col !== -1) return PIGPEN_GRID[row][col];
      }
      return char; // preserve spaces & punctuation
    })
    .join("");
}
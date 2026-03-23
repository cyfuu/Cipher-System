import { generateMatrix } from "../../utils/playfair";

interface PlayfairMatrixProps {
  keyValue: string;
  small?: boolean; // optional flag for smaller layout
}

export const PlayfairMatrix = ({ keyValue, small = false }: PlayfairMatrixProps) => {
  let matrix;
  try {
    matrix = generateMatrix(keyValue);
  } catch {
    return null;
  }

  const cellSize = small ? "w-6 h-6" : "w-10 h-10";

  return (
    <div
      className={`grid grid-cols-5 gap-1 border border-gray-300 rounded-lg bg-gray-50 text-center font-mono`}
    >
      {matrix.flat().map((letter, idx) => (
        <div
          key={idx}
          className={`${cellSize} border border-gray-200 rounded flex items-center justify-center text-xs`}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
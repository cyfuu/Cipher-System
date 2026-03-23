import { useState, useEffect } from "react";
import { invertMatrix } from "../../utils/hill";

const mod26 = (n: number) => ((n % 26) + 26) % 26;

export default function SafeHillKeyInput({
  onValidMatrix,
}: {
  onValidMatrix: (matrix: number[][]) => void;
}) {
  // Store as strings for user input
  const [matrix, setMatrix] = useState<string[][]>(
    Array(3)
      .fill(0)
      .map(() => Array(3).fill("")),
  );

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ❗ Don't validate until all fields are filled
    if (matrix.flat().some((v) => v.trim() === "")) {
      setError("Fill all matrix values");
      return;
    }

    const numMatrix: number[][] = matrix.map((row) =>
      row.map((v) => mod26(parseInt(v))),
    );

    try {
      invertMatrix(numMatrix); // ✅ test if invertible
      setError(null);
      onValidMatrix(numMatrix);
    } catch {
      setError("Matrix is not invertible mod 26");
    }
  }, [matrix]);

  const handleChange = (r: number, c: number, value: string) => {
    // Allow only integers (including negative)
    const safeVal = value.replace(/[^0-9-]/g, "");

    setMatrix((prev) => {
      const newM = prev.map((row) => [...row]);
      newM[r][c] = safeVal;
      return newM;
    });
  };

  return (
    <div>
      <table style={{ borderCollapse: "collapse" }}>
        <tbody>
          {matrix.map((row, r) => (
            <tr key={r}>
              {row.map((val, c) => (
                <td key={c} style={{ padding: "4px" }}>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => handleChange(r, c, e.target.value)}
                    style={{
                      width: "50px",
                      textAlign: "center",
                      border: "1px solid #9ca3af",
                      borderRadius: "6px",
                      padding: "4px",
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
}

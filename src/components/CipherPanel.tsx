import { useState } from "react";
import CaesarKeyInput from "./keyInputs/CaesarKeyInput";
import AffineKeyInput from "./keyInputs/AffineKeyInput";
import PlayfairKeyInput from "./keyInputs/PlayfairKeyInput";
import HillKeyInput from "./keyInputs/HillKeyInput";

interface CipherPanelProps {
  name: string;
}

const CipherPanel = ({ name }: CipherPanelProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  // Cipher keys state
  const [caesarShift, setCaesarShift] = useState(3);
  const [affineA, setAffineA] = useState(5);
  const [affineB, setAffineB] = useState(8);
  const [playfairKey, setPlayfairKey] = useState("KEYWORD");
  const [hillMatrix, setHillMatrix] = useState("3 3;2 5");

  const handleEncrypt = () => {
    let keyInfo = "";
    switch (name) {
      case "Caesar Cipher":
        keyInfo = `Shift=${caesarShift}`;
        break;
      case "Affine Cipher":
        keyInfo = `A=${affineA}, B=${affineB}`;
        break;
      case "Playfair Cipher":
        keyInfo = `Key=${playfairKey}`;
        break;
      case "Hill Cipher":
        keyInfo = `Matrix=${hillMatrix}`;
        break;
    }
    setOutputText(`Encrypted(${name}, ${keyInfo}): ${inputText}`);
  };

  const handleDecrypt = () => {
    let keyInfo = "";
    switch (name) {
      case "Caesar Cipher":
        keyInfo = `Shift=${caesarShift}`;
        break;
      case "Affine Cipher":
        keyInfo = `A=${affineA}, B=${affineB}`;
        break;
      case "Playfair Cipher":
        keyInfo = `Key=${playfairKey}`;
        break;
      case "Hill Cipher":
        keyInfo = `Matrix=${hillMatrix}`;
        break;
    }
    setOutputText(`Decrypted(${name}, ${keyInfo}): ${inputText}`);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      {name === "Caesar Cipher" && <CaesarKeyInput value={caesarShift} setValue={setCaesarShift} />}
      {name === "Affine Cipher" && <AffineKeyInput a={affineA} setA={setAffineA} b={affineB} setB={setAffineB} />}
      {name === "Playfair Cipher" && <PlayfairKeyInput value={playfairKey} setValue={setPlayfairKey} />}
      {name === "Hill Cipher" && <HillKeyInput value={hillMatrix} setValue={setHillMatrix} />}

      <textarea
        className="border rounded px-3 py-2 h-24"
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="flex gap-4">
        <button
          className="flex-1 bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>
        <button
          className="flex-1 bg-green-500 text-white rounded py-2 hover:bg-green-600 transition"
          onClick={handleDecrypt}
        >
          Decrypt
        </button>
      </div>

      <textarea
        className="border rounded px-3 py-2 h-24 bg-gray-50"
        value={outputText}
        readOnly
      />
    </div>
  );
};

export default CipherPanel;
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

  // Key states
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
    <div className="flex flex-col gap-4">
      {/* Key Inputs */}
      {name === "Caesar Cipher" && <CaesarKeyInput value={caesarShift} setValue={setCaesarShift} />}
      {name === "Affine Cipher" && <AffineKeyInput a={affineA} setA={setAffineA} b={affineB} setB={setAffineB} />}
      {name === "Playfair Cipher" && <PlayfairKeyInput value={playfairKey} setValue={setPlayfairKey} />}
      {name === "Hill Cipher" && <HillKeyInput value={hillMatrix} setValue={setHillMatrix} />}

      {/* Input Text */}
      <textarea
        className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
          onClick={handleEncrypt}
        >
          Encrypt
        </button>
        <button
          className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
          onClick={handleDecrypt}
        >
          Decrypt
        </button>
      </div>

      {/* Output */}
      <textarea
        className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none bg-gray-50 focus:outline-none"
        value={outputText}
        readOnly
      />
    </div>
  );
};

export default CipherPanel;
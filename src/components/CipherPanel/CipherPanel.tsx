import { useState } from "react";
import { CaesarKeyInput, AffineKeyInput, PlayfairKeyInput, HillKeyInput } from "../keyInputs";
import { Cipher, DEFAULT_KEYS } from "../../constants/ciphers";
import { encryptText, decryptText } from "./handlers";

interface CipherPanelProps {
  name: Cipher;
}

const CipherPanel = ({ name }: CipherPanelProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const [keys, setKeys] = useState({
    caesarShift: DEFAULT_KEYS.caesarShift,
    affineA: DEFAULT_KEYS.affineA,
    affineB: DEFAULT_KEYS.affineB,
    playfairKey: DEFAULT_KEYS.playfairKey,
    hillMatrix: DEFAULT_KEYS.hillMatrix,
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Key Inputs */}
      {name === "Caesar Cipher" && (
        <CaesarKeyInput value={keys.caesarShift} setValue={(v) => setKeys({ ...keys, caesarShift: v })} />
      )}
      {name === "Affine Cipher" && (
        <AffineKeyInput
          a={keys.affineA}
          setA={(v) => setKeys({ ...keys, affineA: v })}
          b={keys.affineB}
          setB={(v) => setKeys({ ...keys, affineB: v })}
        />
      )}
      {name === "Playfair Cipher" && (
        <PlayfairKeyInput value={keys.playfairKey} setValue={(v) => setKeys({ ...keys, playfairKey: v })} />
      )}
      {name === "Hill Cipher" && (
        <HillKeyInput value={keys.hillMatrix} setValue={(v) => setKeys({ ...keys, hillMatrix: v })} />
      )}

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
          onClick={() => setOutputText(encryptText(name, inputText, keys))}
        >
          Encrypt
        </button>
        <button
          className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
          onClick={() => setOutputText(decryptText(name, inputText, keys))}
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
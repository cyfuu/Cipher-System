import { useState } from "react";
import { AffineKeyInput, PlayfairKeyInput, HillKeyInput } from "../keyInputs";
import { Cipher, DEFAULT_KEYS } from "../../constants/ciphers";
import { encryptText, decryptText } from "./handlers";

interface CipherPanelProps {
  name: Cipher;
}

const CipherPanel = ({ name }: CipherPanelProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [copied, setCopied] = useState(false);

  const [keys, setKeys] = useState({
    pigpenKey: DEFAULT_KEYS.pigpenKey,
    affineA: DEFAULT_KEYS.affineA,
    affineB: DEFAULT_KEYS.affineB,
    playfairKey: DEFAULT_KEYS.playfairKey,
    hillMatrix: DEFAULT_KEYS.hillMatrix,
  });

  const handleCopy = async () => {
    if (!outputText) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Key Inputs */}
      {name === "Affine Cipher" && (
        <AffineKeyInput
          a={keys.affineA}
          setA={(v) => setKeys({ ...keys, affineA: v })}
          b={keys.affineB}
          setB={(v) => setKeys({ ...keys, affineB: v })}
        />
      )}
      {name === "Playfair Cipher" && (
        <PlayfairKeyInput
          value={keys.playfairKey}
          setValue={(v) => setKeys({ ...keys, playfairKey: v })}
        />
      )}
      {name === "Hill Cipher" && (
        <HillKeyInput
          onValidMatrix={(matrix) => setKeys({ ...keys, hillMatrix: matrix })}
        />
      )}

      {/* Pigpen info */}
      {name === "Pigpen Cipher" && (
        <div className="text-gray-500 text-sm italic">
          Pigpen Cipher uses symbolic letters — no key input needed.
        </div>
      )}

      {/* Input */}
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

      {/* Output + Copy */}
      <div className="flex flex-col gap-2">
        <textarea
          className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none bg-gray-50 focus:outline-none"
          value={outputText}
          readOnly
        />

        <button
          onClick={handleCopy}
          disabled={!outputText}
          className={`py-2 rounded-lg text-sm font-medium transition
            ${
              outputText
                ? "bg-gray-800 text-white hover:bg-gray-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          {copied ? "Copied!" : "Copy Output"}
        </button>
      </div>
    </div>
  );
};

export default CipherPanel;
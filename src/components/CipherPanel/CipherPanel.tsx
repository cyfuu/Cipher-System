import { useState, useMemo } from "react";
import { KeyInputs } from "./KeyInputs";
import { PlayfairMatrix } from "./PlayfairMatrix";
import { CipherButtons } from "./CipherButtons";
import { OutputArea } from "./OutputArea";
import { Cipher, DEFAULT_KEYS } from "../../constants/ciphers";

interface CipherPanelProps {
  name: Cipher;
}

export const CipherPanel = ({ name }: CipherPanelProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [keys, setKeys] = useState({
    pigpenKey: DEFAULT_KEYS.pigpenKey,
    affineA: DEFAULT_KEYS.affineA,
    affineB: DEFAULT_KEYS.affineB,
    playfairKey: DEFAULT_KEYS.playfairKey,
    hillMatrix: DEFAULT_KEYS.hillMatrix,
  });

  const showPlayfairMatrix = useMemo(() => name === "Playfair Cipher", [name]);

  return (
    <div className="flex flex-col gap-4">
      <KeyInputs name={name} keys={keys} setKeys={setKeys} />

      {name === "Pigpen Cipher" && (
        <div className="text-gray-500 text-sm italic">
          Pigpen Cipher uses symbolic letters — no key input needed.
        </div>
      )}

      <textarea
        className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <CipherButtons
        name={name}
        inputText={inputText}
        keys={keys}
        setOutput={setOutputText}
      />

      <OutputArea outputText={outputText} setOutputText={setOutputText} />
    </div>
  );
};
import { Cipher } from "../../constants/ciphers";
import { encryptText, decryptText } from "./handlers";

interface CipherButtonsProps {
  name: Cipher;
  inputText: string;
  keys: any;
  setOutput: (val: string) => void;
}

export const CipherButtons = ({ name, inputText, keys, setOutput }: CipherButtonsProps) => (
  <div className="flex gap-4">
    <button
      className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
      onClick={() => setOutput(encryptText(name, inputText, keys))}
    >
      Encrypt
    </button>
    <button
      className="flex-1 bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
      onClick={() => setOutput(decryptText(name, inputText, keys))}
    >
      Decrypt
    </button>
  </div>
);
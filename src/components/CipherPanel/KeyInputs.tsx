import { AffineKeyInput, PlayfairKeyInput, HillKeyInput } from "../keyInputs";
import { Cipher } from "../../constants/ciphers";
import { PlayfairMatrix } from "./PlayfairMatrix";

interface KeyInputsProps {
  name: Cipher;
  keys: any;
  setKeys: React.Dispatch<React.SetStateAction<any>>;
}

export const KeyInputs = ({ name, keys, setKeys }: KeyInputsProps) => {
  if (name === "Affine Cipher") {
    return (
      <AffineKeyInput
        a={keys.affineA}
        setA={(v) => setKeys({ ...keys, affineA: v })}
        b={keys.affineB}
        setB={(v) => setKeys({ ...keys, affineB: v })}
      />
    );
  }

  if (name === "Playfair Cipher") {
    return (
      <div className="flex items-start gap-4">
        {/* Key Input */}
        <PlayfairKeyInput
          value={keys.playfairKey}
          setValue={(v) => setKeys({ ...keys, playfairKey: v })}
        />

        {/* Matrix beside key */}
        <PlayfairMatrix keyValue={keys.playfairKey} small />
      </div>
    );
  }

  if (name === "Hill Cipher") {
    return (
      <HillKeyInput
        onValidMatrix={(matrix) => setKeys({ ...keys, hillMatrix: matrix })}
      />
    );
  }

  return null;
};
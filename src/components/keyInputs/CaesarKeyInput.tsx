interface Props {
  value: number;
  setValue: (v: number) => void;
}

const CaesarKeyInput = ({ value, setValue }: Props) => (
  <div className="flex items-center gap-2">
    <label className="font-semibold">Shift:</label>
    <input
      type="number"
      className="border rounded px-2 py-1 w-20"
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
    />
  </div>
);

export default CaesarKeyInput;
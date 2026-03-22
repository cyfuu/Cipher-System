interface Props {
  value: number;
  setValue: (v: number) => void;
}

const PigpenKeyInput = ({ value, setValue }: Props) => (
  <div className="flex items-center gap-3">
    <label className="font-medium text-gray-700">Shift:</label>
    <input
      type="number"
      className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={(e) => setValue(parseInt(e.target.value))}
    />
  </div>
);

export default PigpenKeyInput;
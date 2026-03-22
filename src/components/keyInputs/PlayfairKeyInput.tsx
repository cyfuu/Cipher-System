interface Props {
  value: string;
  setValue: (v: string) => void;
}

const PlayfairKeyInput = ({ value, setValue }: Props) => (
  <div className="flex items-center gap-3">
    <label className="font-medium text-gray-700">Key:</label>
    <input
      type="text"
      className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      value={value}
      onChange={(e) => setValue(e.target.value.toUpperCase())}
    />
  </div>
);

export default PlayfairKeyInput;
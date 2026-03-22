interface Props {
  value: string;
  setValue: (v: string) => void;
}

const PlayfairKeyInput = ({ value, setValue }: Props) => (
  <div className="flex items-center gap-2">
    <label className="font-semibold">Key:</label>
    <input
      type="text"
      className="border rounded px-2 py-1 flex-1"
      value={value}
      onChange={(e) => setValue(e.target.value.toUpperCase())}
    />
  </div>
);

export default PlayfairKeyInput;
interface Props {
  value: string;
  setValue: (v: string) => void;
}

const HillKeyInput = ({ value, setValue }: Props) => (
  <div className="flex flex-col gap-1">
    <label className="font-semibold">Matrix (row1;row2...):</label>
    <input
      type="text"
      className="border rounded px-2 py-1"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export default HillKeyInput;
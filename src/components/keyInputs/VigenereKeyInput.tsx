interface VigenereKeyInputProps {
  value: string;
  setValue: (val: string) => void;
}

const VigenereKeyInput = ({ value, setValue }: VigenereKeyInputProps) => (
    <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Vigenère Key</label>
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter keyword"
        />
    </div>
);

export default VigenereKeyInput;
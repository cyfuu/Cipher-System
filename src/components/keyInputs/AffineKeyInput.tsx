interface Props {
  a: number;
  setA: (v: number) => void;
  b: number;
  setB: (v: number) => void;
}

const AffineKeyInput = ({ a, setA, b, setB }: Props) => (
  <div className="flex gap-2">
    <div className="flex items-center gap-2">
      <label className="font-semibold">A:</label>
      <input type="number" className="border rounded px-2 py-1 w-20" value={a} onChange={(e) => setA(parseInt(e.target.value))} />
    </div>
    <div className="flex items-center gap-2">
      <label className="font-semibold">B:</label>
      <input type="number" className="border rounded px-2 py-1 w-20" value={b} onChange={(e) => setB(parseInt(e.target.value))} />
    </div>
  </div>
);

export default AffineKeyInput;
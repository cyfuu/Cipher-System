import { Dispatch, SetStateAction } from "react";

type Cipher = "Caesar Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

interface TabsProps {
  ciphers: Cipher[];
  activeTab: Cipher;
  setActiveTab: Dispatch<SetStateAction<Cipher>>;
}

const Tabs = ({ ciphers, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {ciphers.map((cipher) => (
        <button
          key={cipher}
          onClick={() => setActiveTab(cipher)}
          className={`px-4 py-2 rounded-t-lg font-semibold transition
            ${activeTab === cipher ? "bg-white shadow" : "bg-gray-200 hover:bg-gray-300"}`}
        >
          {cipher}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
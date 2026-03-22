import React, { Dispatch, SetStateAction } from "react";

type Cipher = "Caesar Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

interface TabsProps {
  ciphers: Cipher[];
  activeTab: Cipher;
  setActiveTab: Dispatch<SetStateAction<Cipher>>;
}

const Tabs = ({ ciphers, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {ciphers.map((cipher) => (
        <button
          key={cipher}
          onClick={() => setActiveTab(cipher)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200
            ${activeTab === cipher ? "bg-blue-600 text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
        >
          {cipher}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
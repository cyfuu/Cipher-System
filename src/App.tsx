import { useState } from "react";
import Tabs from "./components/Tabs";
import CipherPanel from "./components/CipherPanel";

type Cipher = "Caesar Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

const ciphers: Cipher[] = ["Caesar Cipher", "Affine Cipher", "Playfair Cipher", "Hill Cipher"];

const App = () => {
  const [activeTab, setActiveTab] = useState<Cipher>(ciphers[0]);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Cipher Dashboard
      </h1>

      <Tabs ciphers={ciphers} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8 mt-4">
        <CipherPanel name={activeTab} />
      </div>
    </div>
  );
};

export default App;
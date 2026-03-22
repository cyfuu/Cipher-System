import { useState } from "react";
import Tabs from "./components/Tabs";
import CipherPanel from "./components/CipherPanel";

type Cipher = "Caesar Cipher" | "Affine Cipher" | "Playfair Cipher" | "Hill Cipher";

const ciphers: Cipher[] = ["Caesar Cipher", "Affine Cipher", "Playfair Cipher", "Hill Cipher"];

const App = () => {
  const [activeTab, setActiveTab] = useState<Cipher>(ciphers[0]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Cipher Dashboard</h1>
      <Tabs ciphers={ciphers} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full max-w-md bg-white rounded-b-lg shadow p-6">
        <CipherPanel name={activeTab} />
      </div>
    </div>
  );
};

export default App;
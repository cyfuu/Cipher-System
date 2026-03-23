import { useState } from "react";
import Tabs from "./components/Tabs";
import CipherPanel from "./components/CipherPanel/CipherPanel";
import { CIPHERS, Cipher } from "./constants/ciphers";

const App = () => {
  const [activeTab, setActiveTab] = useState<Cipher>(CIPHERS[0]);

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 bg-gray-100">
      
      {/* Header with logo */}
      <div className="flex items-center gap-3 mb-8">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-8 w-8 md:h-10 md:w-10 invert"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Cipher System
        </h1>
      </div>

      <Tabs ciphers={CIPHERS} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 md:p-8 mt-4">
        <CipherPanel name={activeTab} />
      </div>
    </div>
  );
};

export default App;
import { useState } from "react";

interface OutputAreaProps {
  outputText: string;
  setOutputText: (val: string) => void;
}

export const OutputArea = ({ outputText, setOutputText }: OutputAreaProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Copy failed");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border border-gray-300 rounded-lg px-4 py-2 h-28 resize-none bg-gray-50 focus:outline-none"
        value={outputText}
        readOnly
      />
      <button
        onClick={handleCopy}
        disabled={!outputText}
        className={`py-2 rounded-lg text-sm font-medium transition
          ${
            outputText
              ? "bg-gray-800 text-white hover:bg-gray-900"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {copied ? "Copied!" : "Copy Output"}
      </button>
    </div>
  );
};
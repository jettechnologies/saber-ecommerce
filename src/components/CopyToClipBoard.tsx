// for input elements
import React, { useState, useRef } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyToClipboardProps {
  inputValue: string;
  children?: React.ReactNode;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ children, inputValue }) => {
  // const [inputValue, setInputValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="copy-to-clipboard">
      <div className="flex gap-2 items-center p-2 border border-[#c0c0c0] rounded-md">
        <input
          disabled
          ref={inputRef}
          type="text"
          value={inputValue}
          className="text-sm text-normal text-text-black rounded-md p-2"
        />
        <button
          type='button'
          className="bg-transparent justify-self-end text-green-500 flex gap-4 px-4 py-2"
          onClick={copyToClipboard}
          
        >
          {isCopied ? <Check size={20}/> :<Copy size = {20} color="#d0d0d0" />}
          {isCopied && "Copied"}
        </button>
      </div>
      {children}
    </div>
  );
}

export default CopyToClipboard;

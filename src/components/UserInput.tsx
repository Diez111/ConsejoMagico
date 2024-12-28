import React from 'react';
import { Wand2 } from 'lucide-react';

interface UserInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

const UserInput: React.FC<UserInputProps> = ({ topic, setTopic, onSubmit, disabled }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        disabled={disabled}
        placeholder="Ingresa un tema para que los magos debatan..."
        className="flex-1 bg-purple-900/20 border border-purple-500/50 rounded-lg px-4 py-2 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500 backdrop-blur-sm"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200 whitespace-nowrap"
      >
        <Wand2 className="w-5 h-5" />
        <span>Iniciar Debate</span>
      </button>
    </form>
  );
};

export default UserInput;
import React from 'react';

interface CharacterMessageProps {
  character: {
    name: string;
    avatar: string;
  };
  message: string;
}

const CharacterMessage: React.FC<CharacterMessageProps> = ({ character, message }) => {
  return (
    <div className="flex items-start space-x-4 mb-6 animate-fadeIn">
      <div className="flex-shrink-0 relative">
        <img
          src={character.avatar}
          alt={character.name}
          className="w-12 h-12 rounded-full border-2 border-purple-400"
        />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="flex-1 relative">
        <div className="bg-purple-900/40 rounded-2xl p-4 backdrop-blur-sm chat-bubble">
          <h3 className="font-bold text-purple-300 mb-2">{character.name}</h3>
          <p className="text-gray-100 whitespace-pre-wrap">{message}</p>
          <div className="text-xs text-gray-400 mt-2 text-right">
            {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterMessage;
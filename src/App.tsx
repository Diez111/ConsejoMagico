import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import StarryBackground from './components/StarryBackground';
import CharacterMessage from './components/CharacterMessage';
import UserInput from './components/UserInput';
import { generateCharacterResponse } from './services/api';
import { characters } from './constants/characters';

function App() {
  const [messages, setMessages] = useState<Array<{character: string, text: string}>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [currentRound, setCurrentRound] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxRounds = 2;

  const handleStartDebate = async () => {
    if (!topic.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setMessages([]);
    setCurrentRound(0);
    setIsExpanded(true);

    for (const character of characters) {
      const response = await generateCharacterResponse(character, topic, messages);
      setMessages(prev => [...prev, { character: character.name, text: response }]);
    }
    
    setCurrentRound(1);
    setIsGenerating(false);
  };

  useEffect(() => {
    const generateNextRound = async () => {
      if (currentRound > 0 && currentRound <= maxRounds && !isGenerating) {
        setIsGenerating(true);
        
        for (const character of characters) {
          const response = await generateCharacterResponse(character, topic, messages);
          setMessages(prev => [...prev, { character: character.name, text: response }]);
        }
        
        setCurrentRound(prev => prev + 1);
        setIsGenerating(false);
      }
    };

    generateNextRound();
  }, [currentRound, topic, messages, isGenerating]);

  return (
    <div className="min-h-screen bg-[#0a0a2a] text-white relative overflow-hidden">
      <StarryBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className={`text-center transition-all duration-500 ease-in-out ${isExpanded ? 'opacity-0 h-0 overflow-hidden' : 'mb-8'}`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Consejo de Magos
          </h1>
          <p className="text-lg text-purple-200">
            Donde las mentes mágicas convergen para debatir asuntos de importancia
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className={`bg-black/30 backdrop-blur-md rounded-lg p-6 mb-6 transition-all duration-500 ease-in-out ${isExpanded ? 'h-[85vh]' : 'h-[60vh]'} overflow-y-auto scroll-smooth`}>
            {messages.map((message, index) => (
              <CharacterMessage
                key={index}
                character={characters.find(c => c.name === message.character)!}
                message={message.text}
              />
            ))}
            {isGenerating && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="animate-spin text-purple-400 w-8 h-8" />
              </div>
            )}
          </div>

          <UserInput
            topic={topic}
            setTopic={setTopic}
            onSubmit={handleStartDebate}
            disabled={isGenerating}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
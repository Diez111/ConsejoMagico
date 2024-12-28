import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAz0Z46EvtFVRBYrTTmBQ9O038Tlns1ue0';
const genAI = new GoogleGenerativeAI(API_KEY);
const MIN_RESPONSE_TIME = 5000; // 5 segundos mínimo de espera

// Función auxiliar para crear un delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Character {
  name: string;
  role: string;
  avatar: string;
}

export async function generateCharacterResponse(
  character: Character,
  context: string,
  messages: Array<{ character: string; text: string }>
): Promise<string> {
  const startTime = Date.now();
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const lastRoundMessages = messages.slice(-3);
    const isLastRound = messages.length >= 6;
    
    const prompt = `${character.role}
Contexto del debate: ${context}
${lastRoundMessages.length > 0 ? `Últimos mensajes: ${JSON.stringify(lastRoundMessages)}` : ''}
${isLastRound ? 'Esta es la última ronda. Da una conclusión final sobre el tema.' : 'Da una respuesta breve y concisa.'}
IMPORTANTE: 
- Responde SIEMPRE en español
- Máximo 3 oraciones si no es la ronda final
- Si es la última ronda, puedes extenderte más para dar una conclusión
- Considera solo los últimos mensajes para mantener la coherencia`;

    const [result] = await Promise.all([
      model.generateContent(prompt),
      // Asegurar tiempo mínimo de respuesta
      delay(MIN_RESPONSE_TIME - (Date.now() - startTime))
    ]);
    
    const response = await result.response;
    
    if (!response.text()) {
      throw new Error('Respuesta vacía del API');
    }
    
    // Si aún no han pasado 8 segundos, esperar el tiempo restante
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < MIN_RESPONSE_TIME) {
      await delay(MIN_RESPONSE_TIME - elapsedTime);
    }
    
    return response.text();
  } catch (error) {
    // Asegurar tiempo mínimo incluso en caso de error
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < MIN_RESPONSE_TIME) {
      await delay(MIN_RESPONSE_TIME - elapsedTime);
    }
    
    console.error('Error al generar respuesta:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return 'Error de autenticación. Por favor, verifica la API key.';
      }
      if (error.message.includes('quota')) {
        return 'Se ha excedido el límite de la API. Por favor, intenta más tarde.';
      }
    }
    
    return 'Lo siento, pero parece que no puedo responder en este momento. Por favor, intenta de nuevo.';
  }
}
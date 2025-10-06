'use client';

import { useState } from 'react';
import { X, Send, Bot, User, Sparkles } from 'lucide-react';
import { Slide } from '@mui/material';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

interface AIAssistantDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

// Datos mock para el chat
const mockMessages: Message[] = [
    {
        id: '1',
        content: '¡Hola! Soy Darwin AI, tu asistente para explorar datos espaciales. ¿En qué puedo ayudarte hoy?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 300000)
    },
    {
        id: '2',
        content: '¿Puedes explicarme qué representa este grafo de datos?',
        sender: 'user',
        timestamp: new Date(Date.now() - 240000)
    },
    {
        id: '3',
        content: 'Este grafo representa las conexiones entre diferentes entidades espaciales como satélites, estaciones terrestres y misiones. Los nodos muestran cada entidad y las líneas representan las relaciones o comunicaciones entre ellas.',
        sender: 'ai',
        timestamp: new Date(Date.now() - 180000)
    }
];

const recommendedQuestions = [
    "¿Qué patrones puedes identificar en los datos?",
    "¿Cuáles son las conexiones más importantes?",
    "¿Cómo puedo filtrar por categorías específicas?",
    "¿Qué representa cada color en el grafo?",
    "¿Puedes analizar la densidad de conexiones?"
];

export const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        // Agregar mensaje del usuario
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Simular respuesta de IA después de 2 segundos
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: `Gracias por tu pregunta: "${inputMessage}". Esta es una respuesta simulada del asistente Darwin AI. En una implementación real, aquí se procesaría tu consulta y se proporcionaría información relevante sobre los datos espaciales.`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 2000);
    };

    const handleRecommendedQuestion = (question: string) => {
        setInputMessage(question);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Slide direction="left" in={isOpen} mountOnEnter unmountOnExit>
            <div className="w-96 bg-white border-l border-gray-200 flex flex-col h-full shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="flex items-center gap-2">
                        <Bot className="w-6 h-6" />
                        <h2 className="text-lg font-semibold">Darwin AI</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.sender === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-purple-500 text-white'
                                }`}>
                                {message.sender === 'user' ? (
                                    <User className="w-4 h-4" />
                                ) : (
                                    <Bot className="w-4 h-4" />
                                )}
                            </div>
                            <div className={`max-w-[80%] ${message.sender === 'user' ? 'text-right' : 'text-left'
                                }`}>
                                <div className={`p-3 rounded-lg ${message.sender === 'user'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-800'
                                    }`}>
                                    <p className="text-sm">{message.content}</p>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatTime(message.timestamp)}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recommended Questions */}
                <div className="p-4 border-t bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        Preguntas recomendadas
                    </h3>
                    <div className="space-y-2">
                        {recommendedQuestions.slice(0, 3).map((question, index) => (
                            <button
                                key={index}
                                onClick={() => handleRecommendedQuestion(question)}
                                className="w-full text-left p-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Escribe tu pregunta..."
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputMessage.trim() || isTyping}
                            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Slide>
    );
};
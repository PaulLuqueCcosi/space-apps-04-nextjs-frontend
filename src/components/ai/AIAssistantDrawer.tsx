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

// Mock data for chat
const mockMessages: Message[] = [
    {
        id: '1',
        content: 'Hello! I\'m Darwin AI, your assistant for exploring space data. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(Date.now() - 300000)
    },
    {
        id: '2',
        content: 'Can you explain what this data graph represents?',
        sender: 'user',
        timestamp: new Date(Date.now() - 240000)
    },
    {
        id: '3',
        content: 'This graph represents the connections between different space entities such as satellites, ground stations, and missions. The nodes show each entity and the lines represent the relationships or communications between them.',
        sender: 'ai',
        timestamp: new Date(Date.now() - 180000)
    }
];

const recommendedQuestions = [
    "What patterns can you identify in the data?",
    "What are the most important connections?",
    "How can I filter by specific categories?",
    "What does each color in the graph represent?",
    "Can you analyze the connection density?"
];

export const AIAssistantDrawer = ({ isOpen, onClose }: AIAssistantDrawerProps) => {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const generateAIResponse = (userInput: string): string => {
        const input = userInput.toLowerCase();

        // Pattern detection
        if (input.includes('pattern') || input.includes('identify')) {
            return "Based on the current graph analysis, I can identify several key patterns:\n\n1. **Hub Nodes**: Publications with high citation counts act as central hubs, connecting multiple authors and venues.\n\n2. **Temporal Clusters**: Research topics tend to cluster around specific time periods, showing evolution of scientific focus.\n\n3. **Collaboration Networks**: Strong interconnections between certain author groups suggest established research collaborations.\n\n4. **Cross-disciplinary Links**: Some nodes bridge different categories, indicating interdisciplinary research areas.";
        }

        // Connection importance
        if (input.includes('connection') || input.includes('important') || input.includes('relationship')) {
            return "The most significant connections in this graph are:\n\n• **Author-Publication links**: These show research output and expertise areas\n• **Publication-Venue relationships**: Indicate where research is being published and disseminated\n• **Citation networks**: High-weight edges represent frequently cited works that influence the field\n• **Co-authorship patterns**: Reveal collaborative research teams and networks\n\nNodes with the highest degree centrality are typically the most influential in the network.";
        }

        // Filtering
        if (input.includes('filter') || input.includes('categor')) {
            return "To filter by specific categories:\n\n1. Use the sidebar on the left to select/deselect categories\n2. Click on individual category buttons to toggle them\n3. Use 'Select All' or 'Clear All' for quick filtering\n4. The search bar allows text-based filtering across all nodes\n\nCurrently available categories include Publications, Authors, and Publication Venues. Each category is color-coded for easy identification in the graph.";
        }

        // Colors
        if (input.includes('color') || input.includes('represent')) {
            return "Each color in the graph represents a different entity category:\n\n🔵 **Blue**: Publications - Research papers and articles\n🟢 **Green**: Authors - Researchers and scientists\n🟣 **Purple**: Publication Venues - Journals and conferences\n\nThe color intensity may also indicate node importance or connection density. Hover over any node to see detailed information about that entity.";
        }

        // Density analysis
        if (input.includes('densit') || input.includes('analyz')) {
            return "Analyzing the connection density:\n\n**Overall Metrics:**\n• Average degree: Moderate connectivity across the network\n• Clustering coefficient: Shows strong local groupings\n• Network diameter: Indicates relatively short paths between nodes\n\n**Key Observations:**\n• Dense clusters around highly-cited publications\n• Sparse connections in emerging research areas\n• Bridge nodes connecting different research communities\n\nThis structure suggests a well-connected research ecosystem with distinct specialization areas.";
        }

        // Graph explanation
        if (input.includes('graph') || input.includes('explain') || input.includes('what is')) {
            return "This knowledge graph visualizes the relationships within scientific research data:\n\n**Nodes** represent entities like:\n• Publications (research papers)\n• Authors (researchers)\n• Venues (journals/conferences)\n\n**Edges** show relationships such as:\n• Authorship (who wrote what)\n• Citations (which papers reference others)\n• Publication venues (where research appears)\n\nYou can interact with the graph by clicking nodes for details, filtering by category, or searching for specific entities.";
        }

        // Data source
        if (input.includes('data') || input.includes('source') || input.includes('where')) {
            return "This graph integrates data from multiple scientific databases and repositories, including publication metadata, citation networks, and author information. The data represents interconnected research entities and their relationships, allowing you to explore the landscape of scientific knowledge and collaboration patterns.";
        }

        // Navigation help
        if (input.includes('how') || input.includes('use') || input.includes('navigate')) {
            return "Here's how to navigate the graph:\n\n**Interaction:**\n• Click nodes to view detailed information\n• Click edges to see connection details\n• Drag to pan around the graph\n• Scroll to zoom in/out\n\n**Filtering:**\n• Use the sidebar to filter by category\n• Search for specific entities\n• Toggle categories on/off\n\n**Analysis:**\n• Compare nodes using the edge detail drawer\n• Explore recommended questions for insights";
        }

        // Default response
        const defaultResponses = [
            "That's an interesting question! The graph shows complex relationships between publications, authors, and venues. Could you be more specific about what aspect you'd like to explore?",
            "I can help you understand the data better. The network visualizes scientific research connections. What particular area would you like to focus on?",
            "Based on the current graph data, I can provide insights about patterns, connections, or specific entities. What would you like to know more about?",
            "The graph contains rich information about research networks. I can help you analyze patterns, identify key nodes, or explain relationships. What interests you most?"
        ];

        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const currentInput = inputMessage;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: currentInput,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsTyping(true);

        // Variable delay based on message length (1.5-4 seconds)
        const baseDelay = 1500;
        const lengthDelay = Math.min(currentInput.length * 20, 2500);
        const totalDelay = baseDelay + lengthDelay;

        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: generateAIResponse(currentInput),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, totalDelay);
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
                        Recommended questions
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
                            placeholder="Type your question..."
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
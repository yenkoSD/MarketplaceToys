import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: '¡HOLA COLECCIONISTA! ¿EN QUÉ PODEMOS AYUDARTE HOY?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Global scroll listener for dynamic behavior
  useEffect(() => {
    const handleScroll = () => {
      // Shrink logic
      setIsScrolled(window.scrollY > 100);

      // Footer avoidance logic
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPos = window.scrollY + clientHeight;
      const threshold = 150; // Distance from bottom to start moving up
      
      setIsNearFooter(scrollHeight - scrollPos < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll logic inside chat window
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI Response
    setTimeout(() => {
      setIsTyping(false);
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: '¡ENTENDIDO! ESTOY REVISANDO NUESTRO ARCHIVO SECRETO PARA BUSCAR ESA FIGURA. POR AHORA ESTE ES UN DEMO, PERO PRONTO ESTARÉ CONECTADO A MI CEREBRO SPRING BOOT.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1500);
  };

  return (
    <div 
      className={`font-sans transition-all duration-500 ease-out ${
        isNearFooter ? '-translate-y-12' : 'translate-y-0'
      }`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-24 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-[101] border border-zinc-50"
          >
            {/* Header */}
            <div className="bg-white border-b border-zinc-100 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-serif italic font-black tracking-tighter text-zinc-900">
                Archivo de Soporte
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-all text-zinc-400 hover:text-zinc-900"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="h-80 overflow-y-auto p-6 space-y-4 relative scroll-smooth bg-white"
            >
              <div className="relative z-10 space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-black text-white rounded-tr-none' 
                          : 'bg-zinc-100 text-zinc-800 rounded-tl-none'
                      }`}
                    >
                      <p className="font-sans font-medium">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-100 px-5 py-3 rounded-2xl rounded-tl-none text-sm text-zinc-400 flex items-center gap-1.5">
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }} 
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="w-1 h-1 bg-zinc-400 rounded-full" 
                      />
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }} 
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="w-1 h-1 bg-zinc-400 rounded-full" 
                      />
                      <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3] }} 
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="w-1 h-1 bg-zinc-400 rounded-full" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-6 bg-white border-t border-zinc-100 relative z-10"
            >
              <div className="flex items-center gap-3 bg-zinc-50 rounded-full px-5 py-3 border border-transparent focus-within:border-zinc-200 focus-within:bg-white transition-all">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu duda..."
                  className="flex-1 bg-transparent py-0.5 text-sm font-medium text-zinc-800 outline-none placeholder:text-zinc-400"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="text-black disabled:text-zinc-200 hover:scale-110 transition-all"
                >
                  <Send size={18} strokeWidth={2} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button - Modern & Discrete */}
      <div 
        className={`relative group transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'
        }`}
      >
        <motion.div
           className="absolute -top-10 right-0 bg-white border border-zinc-100 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap rounded-lg shadow-lg z-20"
        >
          <span className="text-[11px] font-bold tracking-tight text-zinc-900">
            ¿Necesitas ayuda?
          </span>
        </motion.div>
        
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            width: !isOpen && isScrolled ? 52 : 60,
            height: !isOpen && isScrolled ? 52 : 60
          }}
          className={`rounded-full shadow-xl flex items-center justify-center relative z-10 overflow-hidden transition-colors ${
            isOpen 
              ? 'bg-white text-zinc-900 border border-zinc-100' 
              : 'bg-zinc-900 text-white hover:bg-zinc-800'
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <X size={24} strokeWidth={2.5} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="font-serif italic text-2xl font-bold select-none"
              >
                ?
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};


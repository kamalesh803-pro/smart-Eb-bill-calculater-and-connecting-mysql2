import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AI_TIPS } from '../data/constants';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hi! 👋 I'm your electricity saving assistant. Ask me for tips on saving electricity or improving appliance efficiency!",
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('ac') || msg.includes('air conditioner') || msg.includes('cooling')) {
      return "❄️ **AC Saving Tips:**\n• Set temperature to 24-26°C — each degree lower uses 6% more energy\n• Clean filters monthly for 15% better efficiency\n• Use fans alongside AC to circulate air\n• Install a programmable thermostat\n• Seal windows and doors to prevent cool air leaks";
    }
    if (msg.includes('fridge') || msg.includes('refrigerator')) {
      return "🧊 **Refrigerator Tips:**\n• Keep it at 3-5°C (fridge) and -15°C (freezer)\n• Don't place near heat sources\n• Maintain 4-inch gap behind for airflow\n• Don't overfill — air needs to circulate\n• Check door seals regularly";
    }
    if (msg.includes('light') || msg.includes('bulb') || msg.includes('led')) {
      return "💡 **Lighting Tips:**\n• Switch to LED bulbs (75% less energy)\n• Use natural daylight when possible\n• Install motion sensors in less-used areas\n• Use task lighting instead of overhead\n• LED bulbs last 25x longer!";
    }
    if (msg.includes('wash') || msg.includes('laundry')) {
      return "🫧 **Washing Machine Tips:**\n• Always run full loads\n• Use cold water — 90% of energy heats water!\n• Air-dry clothes when possible\n• Clean the lint filter regularly";
    }
    if (msg.includes('save') || msg.includes('reduce') || msg.includes('bill') || msg.includes('tips') || msg.includes('help')) {
      return "💰 **Top Saving Tips:**\n1. Switch to LED lighting (saves 75%)\n2. Set AC to 24°C (saves 25%)\n3. Unplug standby devices (saves 5-10%)\n4. Use 5-star rated appliances\n5. Run heavy appliances during off-peak hours\n6. Regular maintenance improves efficiency by 10-15%";
    }
    if (msg.includes('solar') || msg.includes('renewable')) {
      return "🌞 **Solar Power:**\n• TN offers subsidies for rooftop solar\n• 3kW system saves ₹2000-4000/month\n• Net metering to sell excess power\n• Payback: 4-5 years, lifespan: 25+ years\n• Contact TEDA for more info!";
    }

    const randomTip = AI_TIPS[Math.floor(Math.random() * AI_TIPS.length)];
    return `${randomTip}\n\n💬 Ask about specific appliances for targeted advice!`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text: input.trim() }]);
    const query = input.trim();
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: getAIResponse(query) }]);
    }, 500);
  };

  return (
    <>
      {/* Chat toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl z-50"
        style={{
          background: isOpen
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, #6366f1, #818cf8)',
          boxShadow: isOpen
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 30px rgba(99, 102, 241, 0.4), 0 0 60px rgba(99, 102, 241, 0.15)',
          backdropFilter: isOpen ? 'blur(20px)' : 'none',
          border: isOpen ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden z-50"
            style={{
              background: 'rgba(6, 21, 37, 0.95)',
              backdropFilter: 'blur(40px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99, 102, 241, 0.1)',
            }}
          >
            {/* Header */}
            <div
              className="p-4"
              style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(129, 140, 248, 0.08))',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: 'rgba(99, 102, 241, 0.2)',
                    boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)',
                  }}
                >
                  🤖
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>AI Energy Assistant</h3>
                  <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>Electricity saving tips</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#6366f1' }} />
                  <span className="text-[10px] font-medium" style={{ color: '#818cf8' }}>Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line"
                    style={
                      msg.role === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #6366f1, #4338ca)',
                            color: '#fff',
                            borderBottomRightRadius: '6px',
                            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.2)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.05)',
                            color: 'var(--text-primary)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderBottomLeftRadius: '6px',
                          }
                    }
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about saving electricity..."
                  className="premium-input flex-1"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  className="glow-btn px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
                >
                  Send
                </motion.button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['💡 LED tips', '❄️ AC saving', '💰 Reduce bill'].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => setInput(quick)}
                    className="text-[11px] px-2.5 py-1 rounded-full transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-secondary)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(99, 102, 241,0.3)'; e.currentTarget.style.background = 'rgba(99, 102, 241,0.1)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    {quick}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

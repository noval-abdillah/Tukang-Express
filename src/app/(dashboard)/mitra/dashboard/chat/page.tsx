'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

const initialConversations = [
  { nama: 'Andi Saputra', pesan: 'Pak, kira-kira jam berapa bisa datang?', waktu: '10:42', unread: 0, avatar: 'AS' },
  { nama: 'Siti Rahma', pesan: 'Oke siap, ditunggu ya pak!', waktu: '09:15', unread: 0, avatar: 'SR' },
  { nama: 'Budi Santoso', pesan: 'Terima kasih, bintang 5 buat bapak!', waktu: 'Kemarin', unread: 0, avatar: 'BS' },
  { nama: 'Dewi Lestari', pesan: 'Harga sudah sesuai yang disepakati?', waktu: 'Kemarin', unread: 0, avatar: 'DL' },
];

const initialMessages: Record<string, { from: 'me' | 'them'; text: string; time: string }[]> = {
  'Andi Saputra': [
    { from: 'them', text: 'Pak, kira-kira jam berapa bisa datang?', time: '10:40' },
    { from: 'me', text: 'Insya Allah sekitar jam 11 siang pak, masih dalam perjalanan', time: '10:41' },
    { from: 'them', text: 'Oke siap pak, saya tunggu di rumah ya', time: '10:42' },
  ],
  'Siti Rahma': [
    { from: 'me', text: 'Bu, besok jam 9 pagi pengerjaannya ya.', time: '09:10' },
    { from: 'them', text: 'Oke siap, ditunggu ya pak!', time: '09:15' },
  ],
  'Budi Santoso': [
    { from: 'me', text: 'Pekerjaan AC sudah beres pak, terima kasih.', time: 'Kemarin' },
    { from: 'them', text: 'Terima kasih, bintang 5 buat bapak!', time: 'Kemarin' },
  ],
};

export default function MitraChatPage() {
  const [activePartner, setActivePartner] = useState('Andi Saputra');
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  // Storage states
  const [custAvatar, setCustAvatar] = useState<string | null>(null);
  const [custNama, setCustNama] = useState('Andi Saputra');
  const [mitraAvatar, setMitraAvatar] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load avatar dari localStorage
  useEffect(() => {
    setCustAvatar(localStorage.getItem('avatar-customer'));
    setMitraAvatar(localStorage.getItem('avatar-mitra'));
    const savedCustNama = localStorage.getItem('nama-customer');
    if (savedCustNama) {
      setCustNama(savedCustNama);
    }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentMsg = inputVal.trim();

    // 1. Tambah chat saya (Mitra)
    setMessages(prev => ({
      ...prev,
      [activePartner]: [...(prev[activePartner] ?? []), { from: 'me', text: currentMsg, time }],
    }));

    setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: currentMsg, waktu: 'Baru saja' } : c));
    setInputVal('');

    // 2. Trigger auto reply dari customer simulator setelah 1.5s
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const replyTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const botReply = `Baik pak, saya terima pesannya. Ditunggu kelanjutan kabarnya ya!`;

      setMessages(prev => ({
        ...prev,
        [activePartner]: [...(prev[activePartner] ?? []), { from: 'them', text: botReply, time: replyTime }],
      }));

      setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: botReply, waktu: 'Baru saja' } : c));
    }, 1500);
  }

  const currentChat = messages[activePartner] ?? [];

  // Helper render avatar customer di chat header & bubble
  function renderPartnerAvatar(size: 'small' | 'large') {
    const isTesterCustomer = activePartner === 'Andi Saputra' || activePartner === custNama;
    const classes = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';

    if (isTesterCustomer && custAvatar) {
      return <img src={custAvatar} alt={activePartner} className={`${classes} rounded-full object-cover shrink-0`} />;
    }
    return (
      <div className={`${classes} rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
        {activePartner.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 h-[calc(100vh-100px)]">
      <div className="h-full rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex">
        
        {/* Sidebar Percakapan */}
        <div className="w-85 border-r border-slate-100 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <p className="font-black text-lg">Chat</p>
            <input className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-green-400" placeholder="Cari percakapan..." />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {conversations.map((c) => {
              const isTesterCustomer = c.nama === 'Andi Saputra' || c.nama === custNama;
              return (
                <div
                  key={c.nama}
                  onClick={() => setActivePartner(c.nama)}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors ${activePartner === c.nama ? 'bg-green-50/70 border-l-4 border-green-500' : ''}`}
                >
                  {isTesterCustomer && custAvatar ? (
                    <img src={custAvatar} alt={c.nama} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{c.avatar}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold truncate text-slate-800">{c.nama === 'Andi Saputra' && custNama !== 'Andi Saputra' ? custNama : c.nama}</p>
                      <p className="text-[10px] text-slate-400 shrink-0">{c.waktu}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{c.pesan}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-50/50">
          <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-white shadow-sm">
            {renderPartnerAvatar('small')}
            <div>
              <p className="font-bold text-sm text-slate-800">{activePartner === 'Andi Saputra' && custNama !== 'Andi Saputra' ? custNama : activePartner}</p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentChat.map((m, i) => (
              <div key={i} className={`flex gap-3 items-end ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'them' && renderPartnerAvatar('small')}
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  m.from === 'me'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  <p className="leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${m.from === 'me' ? 'text-green-100' : 'text-slate-400'}`}>{m.time}</p>
                </div>
                {m.from === 'me' && (
                  mitraAvatar ? (
                    <img src={mitraAvatar} alt="Saya" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">ME</div>
                  )
                )}
              </div>
            ))}

            {botTyping && (
              <div className="flex justify-start gap-3 items-end">
                {renderPartnerAvatar('small')}
                <div className="max-w-xs rounded-2xl px-4 py-2.5 text-sm bg-white text-slate-500 border border-slate-100 rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-3 shadow-inner">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-green-400 bg-slate-50"
              placeholder="Tulis pesan kamu di sini..."
            />
            <button type="submit" className="rounded-2xl bg-green-500 hover:bg-green-400 px-5 py-3 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

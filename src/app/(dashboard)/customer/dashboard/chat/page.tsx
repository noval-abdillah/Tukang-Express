'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Loader2 } from 'lucide-react';

const initialConversations = [
  { nama: 'Budi AC', pesan: 'Insya Allah sekitar jam 11 siang pak', waktu: '10:41', unread: 0, avatar: 'BA', order: 'Servis AC' },
  { nama: 'Andi Plumbing', pesan: 'Order sudah selesai, terima kasih!', waktu: 'Kemarin', unread: 0, avatar: 'AP', order: 'Ledeng & Pipa' },
  { nama: 'Sari Cleaning', pesan: 'Oke siap kak, saya berangkat sekarang', waktu: '2 hari lalu', unread: 0, avatar: 'SC', order: 'Kebersihan' },
  { nama: 'Dono Listrik', pesan: 'Ada yang bisa dibantu, pak?', waktu: '3 hari lalu', unread: 0, avatar: 'DL', order: 'Instalasi Listrik' },
];

const initialMessages: Record<string, { from: 'me' | 'them'; text: string; time: string }[]> = {
  'Budi AC': [
    { from: 'them', text: 'Halo kak, saya Budi. Sudah konfirmasi order Servis AC nya ya', time: '10:30' },
    { from: 'me', text: 'Iya pak, AC di ruang tamu sama kamar. 2 unit', time: '10:32' },
    { from: 'them', text: 'Siap kak. Kira-kira saya tiba jam 11 ya', time: '10:35' },
    { from: 'them', text: 'Insya Allah sekitar jam 11 siang pak, masih dalam perjalanan', time: '10:41' },
  ],
  'Andi Plumbing': [
    { from: 'me', text: 'Pak, pipanya bocor lagi', time: 'Kemarin' },
    { from: 'them', text: 'Oh begitu, saya kesana sekarang untuk cek', time: 'Kemarin' },
    { from: 'them', text: 'Order sudah selesai, terima kasih!', time: 'Kemarin' },
  ],
  'Sari Cleaning': [
    { from: 'them', text: 'Halo kak, kebersihan rumahnya mau dimulai jam berapa?', time: '2 hari lalu' },
    { from: 'me', text: 'Jam 9 pagi ya mbak', time: '2 hari lalu' },
    { from: 'them', text: 'Oke siap kak, saya berangkat sekarang', time: '2 hari lalu' },
  ],
};

function CustomerChatComponent() {
  const searchParams = useSearchParams();
  const paramAktif = searchParams.get('aktif') ?? 'Budi AC';

  const [activePartner, setActivePartner] = useState('Budi AC');
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [inputVal, setInputVal] = useState('');
  const [botTyping, setBotTyping] = useState(false);
  
  // Storage states
  const [custAvatar, setCustAvatar] = useState<string | null>(null);
  const [mitraAvatar, setMitraAvatar] = useState<string | null>(null);
  const [mitraNama, setMitraNama] = useState('Budi AC');

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load avatar dari localStorage
  useEffect(() => {
    setCustAvatar(localStorage.getItem('avatar-customer'));
    setMitraAvatar(localStorage.getItem('avatar-mitra'));
    const savedMitraNama = localStorage.getItem('nama-mitra');
    if (savedMitraNama) {
      setMitraNama(savedMitraNama);
    }
  }, []);

  useEffect(() => {
    if (paramAktif) {
      const exists = conversations.some(c => c.nama === paramAktif);
      if (!exists) {
        const initialMap: Record<string, string> = {
          'Budi AC': 'BA', 'Andi Plumbing': 'AP', 'Sari Cleaning': 'SC',
          'Dono Listrik': 'DL', 'Rini Kebersihan': 'RK', 'Budi Teknisi': 'BT',
        };
        const newConv = {
          nama: paramAktif,
          pesan: 'Percakapan baru dimulai...',
          waktu: 'Baru saja',
          unread: 0,
          avatar: initialMap[paramAktif] ?? paramAktif.slice(0, 2).toUpperCase(),
          order: 'Servis',
        };
        setConversations(prev => [newConv, ...prev]);
        setMessages(prev => ({
          ...prev,
          [paramAktif]: [{ from: 'them', text: `Halo kak, saya ${paramAktif}. Ada yang bisa saya bantu?`, time: 'Baru saja' }],
        }));
      }
      setActivePartner(paramAktif);
    }
  }, [paramAktif, conversations]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentMsg = inputVal.trim();

    // 1. Tambah chat saya
    setMessages(prev => ({
      ...prev,
      [activePartner]: [...(prev[activePartner] ?? []), { from: 'me', text: currentMsg, time }],
    }));

    setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: currentMsg, waktu: 'Baru saja' } : c));
    setInputVal('');

    // 2. Trigger auto reply setelah 1.5s
    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const replyTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const botReply = `Halo kak, terima kasih atas pesannya. Pertanyaan kamu mengenai "${currentMsg}" akan segera kami tindaklanjuti ya!`;

      setMessages(prev => ({
        ...prev,
        [activePartner]: [...(prev[activePartner] ?? []), { from: 'them', text: botReply, time: replyTime }],
      }));

      setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: botReply, waktu: 'Baru saja' } : c));
    }, 1500);
  }

  const currentChat = messages[activePartner] ?? [];

  // Helper render avatar mitra di chat header & bubble
  function renderPartnerAvatar(size: 'small' | 'large') {
    const isBudi = activePartner === 'Budi AC' || activePartner === 'Budi Teknisi' || activePartner === mitraNama;
    const classes = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
    
    if (isBudi && mitraAvatar) {
      return <img src={mitraAvatar} alt={activePartner} className={`${classes} rounded-full object-cover shrink-0`} />;
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
        <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100">
            <p className="font-black text-lg">Chat</p>
            <input className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-400" placeholder="Cari percakapan..." />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {conversations.map((c) => {
              const isBudi = c.nama === 'Budi AC' || c.nama === 'Budi Teknisi' || c.nama === mitraNama;
              return (
                <div
                  key={c.nama}
                  onClick={() => setActivePartner(c.nama)}
                  className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors ${activePartner === c.nama ? 'bg-blue-50/70 border-l-4 border-blue-500' : ''}`}
                >
                  {isBudi && mitraAvatar ? (
                    <img src={mitraAvatar} alt={c.nama} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">{c.avatar}</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold truncate text-slate-800">{c.nama === 'Budi AC' && mitraNama !== 'Budi AC' ? mitraNama : c.nama}</p>
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
              <p className="font-bold text-sm text-slate-800">{activePartner === 'Budi AC' && mitraNama !== 'Budi AC' ? mitraNama : activePartner}</p>
              <p className="text-xs text-blue-500">Online</p>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentChat.map((m, i) => (
              <div key={i} className={`flex gap-3 items-end ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'them' && renderPartnerAvatar('small')}
                <div className={`max-w-md rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  m.from === 'me'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  <p className="leading-relaxed">{m.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${m.from === 'me' ? 'text-blue-100' : 'text-slate-400'}`}>{m.time}</p>
                </div>
                {m.from === 'me' && (
                  custAvatar ? (
                    <img src={custAvatar} alt="Saya" className="w-8 h-8 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">ME</div>
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
              className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-400 bg-slate-50"
              placeholder="Tulis pesan kamu di sini..."
            />
            <button type="submit" className="rounded-2xl bg-blue-500 hover:bg-blue-400 px-5 py-3 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function CustomerChatPage() {
  return (
    <Suspense fallback={<div className="p-6 lg:p-8 text-center text-slate-400 text-sm">Memuat chat...</div>}>
      <CustomerChatComponent />
    </Suspense>
  );
}

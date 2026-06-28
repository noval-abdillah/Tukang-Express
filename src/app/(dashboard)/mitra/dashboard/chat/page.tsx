'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatLayout, type Conversation } from '@/components/dashboard/ChatLayout';

const initialConversations: Conversation[] = [
  { id: 'andi-saputra', nama: 'Andi Saputra', pesan: 'Pak, kira-kira jam berapa bisa datang?', waktu: '10:42', unread: 0, avatar: 'AS' },
  { id: 'siti-rahma', nama: 'Siti Rahma', pesan: 'Oke siap, ditunggu ya pak!', waktu: '09:15', unread: 0, avatar: 'SR' },
  { id: 'budi-santoso', nama: 'Budi Santoso', pesan: 'Terima kasih, bintang 5 buat bapak!', waktu: 'Kemarin', unread: 0, avatar: 'BS' },
  { id: 'dewi-lestari', nama: 'Dewi Lestari', pesan: 'Harga sudah sesuai yang disepakati?', waktu: 'Kemarin', unread: 0, avatar: 'DL' },
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
  const [custAvatar, setCustAvatar] = useState<string | null>(null);
  const [custNama, setCustNama] = useState('Andi Saputra');
  const [mitraAvatar, setMitraAvatar] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCustAvatar(localStorage.getItem('avatar-customer'));
    setMitraAvatar(localStorage.getItem('avatar-mitra'));
    const savedCustNama = localStorage.getItem('nama-customer');
    if (savedCustNama) setCustNama(savedCustNama);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activePartner]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentMsg = inputVal.trim();

    setMessages(prev => ({
      ...prev,
      [activePartner]: [...(prev[activePartner] ?? []), { from: 'me', text: currentMsg, time }],
    }));
    setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: currentMsg, waktu: 'Baru saja' } : c));
    setInputVal('');

    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);
      const replyTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
      const botReply = 'Baik pak, saya terima pesannya. Ditunggu kelanjutan kabarnya ya!';
      setMessages(prev => ({
        ...prev,
        [activePartner]: [...(prev[activePartner] ?? []), { from: 'them', text: botReply, time: replyTime }],
      }));
      setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: botReply, waktu: 'Baru saja' } : c));
    }, 1500);
  }

  function isTesterCustomer(nama: string) {
    return nama === 'Andi Saputra' || nama === custNama;
  }

  function getDisplayName(nama: string) {
    return nama === 'Andi Saputra' && custNama !== 'Andi Saputra' ? custNama : nama;
  }

  function renderPartnerAvatar(size: 'small' | 'large') {
    const classes = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
    if (isTesterCustomer(activePartner) && custAvatar) {
      return <img src={custAvatar} alt={activePartner} className={`${classes} rounded-full object-cover shrink-0`} />;
    }
    return (
      <div className={`${classes} rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
        {activePartner.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  function renderConversationAvatar(c: Conversation) {
    if (isTesterCustomer(c.nama) && custAvatar) {
      return <img src={custAvatar} alt={c.nama} className="w-10 h-10 rounded-full object-cover shrink-0" />;
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
        {c.avatar}
      </div>
    );
  }

  function renderMyAvatar() {
    if (mitraAvatar) {
      return <img src={mitraAvatar} alt="Saya" className="w-8 h-8 rounded-full object-cover shrink-0" />;
    }
    return (
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">ME</div>
    );
  }

  return (
    <ChatLayout
      accentColor="green"
      conversations={conversations}
      activePartner={activePartner}
      onSelectPartner={setActivePartner}
      messages={messages[activePartner] ?? []}
      inputVal={inputVal}
      onInputChange={setInputVal}
      onSend={handleSend}
      botTyping={botTyping}
      renderPartnerAvatar={renderPartnerAvatar}
      renderConversationAvatar={renderConversationAvatar}
      getDisplayName={getDisplayName}
      chatEndRef={chatEndRef}
      renderMyAvatar={renderMyAvatar}
    />
  );
}

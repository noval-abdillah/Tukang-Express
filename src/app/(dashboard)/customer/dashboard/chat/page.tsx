'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ChatLayout, type Conversation } from '@/components/dashboard/ChatLayout';

const initialConversations: Conversation[] = [
  { id: 'budi-ac', nama: 'Budi AC', pesan: 'Insya Allah sekitar jam 11 siang pak', waktu: '10:41', unread: 0, avatar: 'BA', order: 'Servis AC' },
  { id: 'andi-plumbing', nama: 'Andi Plumbing', pesan: 'Order sudah selesai, terima kasih!', waktu: 'Kemarin', unread: 0, avatar: 'AP', order: 'Ledeng & Pipa' },
  { id: 'sari-cleaning', nama: 'Sari Cleaning', pesan: 'Oke siap kak, saya berangkat sekarang', waktu: '2 hari lalu', unread: 0, avatar: 'SC', order: 'Kebersihan' },
  { id: 'dono-listrik', nama: 'Dono Listrik', pesan: 'Ada yang bisa dibantu, pak?', waktu: '3 hari lalu', unread: 0, avatar: 'DL', order: 'Instalasi Listrik' },
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
  const [custAvatar, setCustAvatar] = useState<string | null>(null);
  const [mitraAvatar, setMitraAvatar] = useState<string | null>(null);
  const [mitraNama, setMitraNama] = useState('Budi AC');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCustAvatar(localStorage.getItem('avatar-customer'));
    setMitraAvatar(localStorage.getItem('avatar-mitra'));
    const savedMitraNama = localStorage.getItem('nama-mitra');
    if (savedMitraNama) setMitraNama(savedMitraNama);
  }, []);

  useEffect(() => {
    if (paramAktif) {
      const exists = conversations.some(c => c.nama === paramAktif);
      if (!exists) {
        const initialMap: Record<string, string> = {
          'Budi AC': 'BA', 'Andi Plumbing': 'AP', 'Sari Cleaning': 'SC',
          'Dono Listrik': 'DL', 'Rini Kebersihan': 'RK', 'Budi Teknisi': 'BT',
        };
        const newConv: Conversation = {
          id: paramAktif.toLowerCase().replace(/\s+/g, '-'),
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
      const botReply = `Halo kak, terima kasih atas pesannya. Pertanyaan kamu mengenai "${currentMsg}" akan segera kami tindaklanjuti ya!`;
      setMessages(prev => ({
        ...prev,
        [activePartner]: [...(prev[activePartner] ?? []), { from: 'them', text: botReply, time: replyTime }],
      }));
      setConversations(prev => prev.map(c => c.nama === activePartner ? { ...c, pesan: botReply, waktu: 'Baru saja' } : c));
    }, 1500);
  }

  function isBudiPartner(nama: string) {
    return nama === 'Budi AC' || nama === 'Budi Teknisi' || nama === mitraNama;
  }

  function getDisplayName(nama: string) {
    return nama === 'Budi AC' && mitraNama !== 'Budi AC' ? mitraNama : nama;
  }

  function renderPartnerAvatar(size: 'small' | 'large') {
    const classes = size === 'small' ? 'w-8 h-8' : 'w-10 h-10';
    if (isBudiPartner(activePartner) && mitraAvatar) {
      return <img src={mitraAvatar} alt={activePartner} className={`${classes} rounded-full object-cover shrink-0`} />;
    }
    return (
      <div className={`${classes} rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0`}>
        {activePartner.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  function renderConversationAvatar(c: Conversation) {
    if (isBudiPartner(c.nama) && mitraAvatar) {
      return <img src={mitraAvatar} alt={c.nama} className="w-10 h-10 rounded-full object-cover shrink-0" />;
    }
    return (
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
        {c.avatar}
      </div>
    );
  }

  function renderMyAvatar() {
    if (custAvatar) {
      return <img src={custAvatar} alt="Saya" className="w-8 h-8 rounded-full object-cover shrink-0" />;
    }
    return (
      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">ME</div>
    );
  }

  return (
    <ChatLayout
      accentColor="blue"
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
      initialShowChat={searchParams.has('aktif')}
    />
  );
}

export default function CustomerChatPage() {
  return (
    <Suspense fallback={<div className="p-6 lg:p-8 text-center text-slate-400 text-sm">Memuat chat...</div>}>
      <CustomerChatComponent />
    </Suspense>
  );
}

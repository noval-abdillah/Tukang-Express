'use client';

import { useState, type ReactNode } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

export interface Conversation {
  id: string;
  nama: string;
  pesan: string;
  waktu: string;
  unread: number;
  avatar: string;
  order?: string;
}

export interface ChatMessage {
  from: 'me' | 'them';
  text: string;
  time: string;
}

interface ChatLayoutProps {
  accentColor: 'blue' | 'green';
  conversations: Conversation[];
  activePartner: string;
  onSelectPartner: (nama: string) => void;
  messages: ChatMessage[];
  inputVal: string;
  onInputChange: (val: string) => void;
  onSend: (e: React.FormEvent) => void;
  botTyping: boolean;
  renderPartnerAvatar: (size: 'small' | 'large') => ReactNode;
  renderConversationAvatar: (conv: Conversation) => ReactNode;
  getDisplayName: (nama: string) => string;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  renderMyAvatar: () => ReactNode;
  initialShowChat?: boolean;
}

export function ChatLayout({
  accentColor,
  conversations,
  activePartner,
  onSelectPartner,
  messages,
  inputVal,
  onInputChange,
  onSend,
  botTyping,
  renderPartnerAvatar,
  renderConversationAvatar,
  getDisplayName,
  chatEndRef,
  renderMyAvatar,
  initialShowChat = false,
}: ChatLayoutProps) {
  const [showChat, setShowChat] = useState(initialShowChat);

  const accent = accentColor === 'blue'
    ? {
        activeList: 'bg-blue-50/70 border-blue-500',
        online: 'text-blue-500',
        myBubble: 'bg-blue-500 text-white rounded-tr-none',
        myTime: 'text-blue-100',
        inputFocus: 'focus:border-blue-400',
        sendBtn: 'bg-blue-500 hover:bg-blue-400',
        typingBorder: 'focus:border-blue-400',
      }
    : {
        activeList: 'bg-green-50/70 border-green-500',
        online: 'text-green-500',
        myBubble: 'bg-green-500 text-white rounded-br-none',
        myTime: 'text-green-100',
        inputFocus: 'focus:border-green-400',
        sendBtn: 'bg-green-500 hover:bg-green-400',
        typingBorder: 'focus:border-green-400',
      };

  function handleSelectPartner(nama: string) {
    onSelectPartner(nama);
    setShowChat(true);
  }

  function handleBack() {
    setShowChat(false);
  }

  const containerHeight = 'h-[calc(100dvh-var(--mobile-header-height)-var(--bottom-nav-height)-var(--safe-bottom)-3rem)] lg:h-[calc(100vh-4rem)]';

  return (
    <div className={`p-4 lg:p-8 ${containerHeight}`}>
      <div className="h-full rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden flex">
        {/* Conversation list */}
        <div
          className={`
            w-full lg:w-80 border-r border-slate-100 flex flex-col shrink-0
            ${showChat ? 'hidden lg:flex' : 'flex'}
          `}
        >
          <div className="p-4 border-b border-slate-100">
            <p className="font-black text-lg">Chat</p>
            <input
              className={`mt-3 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none ${accent.inputFocus}`}
              placeholder="Cari percakapan..."
            />
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-slate-50">
            {conversations.map((c) => (
              <div
                key={c.id}
                onClick={() => handleSelectPartner(c.nama)}
                className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors ${
                  activePartner === c.nama ? `${accent.activeList} border-l-4` : ''
                }`}
              >
                {renderConversationAvatar(c)}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold truncate text-slate-800">{getDisplayName(c.nama)}</p>
                    <p className="text-[10px] text-slate-400 shrink-0">{c.waktu}</p>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{c.pesan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div
          className={`
            flex-1 flex flex-col bg-slate-50/50 min-w-0
            ${showChat ? 'flex' : 'hidden lg:flex'}
          `}
        >
          <div className="flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 border-b border-slate-100 bg-white shadow-sm">
            <button
              type="button"
              onClick={handleBack}
              className="lg:hidden rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Kembali ke daftar chat"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            {renderPartnerAvatar('small')}
            <div className="min-w-0">
              <p className="font-bold text-sm text-slate-800 truncate">{getDisplayName(activePartner)}</p>
              <p className={`text-xs ${accent.online}`}>Online</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 lg:gap-3 items-end ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                {m.from === 'them' && renderPartnerAvatar('small')}
                <div className={`max-w-[85%] lg:max-w-md rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  m.from === 'me'
                    ? accent.myBubble
                    : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                }`}>
                  <p className="leading-relaxed break-words">{m.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${m.from === 'me' ? accent.myTime : 'text-slate-400'}`}>{m.time}</p>
                </div>
                {m.from === 'me' && renderMyAvatar()}
              </div>
            ))}

            {botTyping && (
              <div className="flex justify-start gap-2 lg:gap-3 items-end">
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

          <form onSubmit={onSend} className="p-3 lg:p-4 pb-safe bg-white border-t border-slate-100 flex gap-2 lg:gap-3 shadow-inner">
            <input
              value={inputVal}
              onChange={(e) => onInputChange(e.target.value)}
              className={`flex-1 min-w-0 rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none ${accent.inputFocus} bg-slate-50`}
              placeholder="Tulis pesan kamu di sini..."
            />
            <button
              type="submit"
              className={`rounded-2xl ${accent.sendBtn} px-4 lg:px-5 py-3 text-white transition-colors cursor-pointer flex items-center justify-center shrink-0`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

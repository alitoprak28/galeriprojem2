"use client";

import Link from "next/link";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { GalleryAdvisorSuggestionCard } from "@/components/assistant/gallery-advisor-suggestion-card";
import {
  AdvisorCta,
  AdvisorIntent,
  AdvisorMessageInput,
  AdvisorQuickReply,
  AdvisorReply,
  AdvisorSuggestion,
  getInitialAdvisorReply,
} from "@/lib/gallery-advisor-shared";
import { cn } from "@/lib/utils";

interface AdvisorUiMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  intent?: AdvisorIntent;
  suggestions?: AdvisorSuggestion[];
  quickReplies?: AdvisorQuickReply[];
  cta?: AdvisorCta;
}

function createMessageId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function toAssistantMessage(reply: AdvisorReply): AdvisorUiMessage {
  return {
    id: createMessageId(),
    role: "assistant",
    content: reply.message,
    intent: reply.intent,
    suggestions: reply.suggestions,
    quickReplies: reply.quickReplies,
    cta: reply.cta,
  };
}

export function GalleryAdvisor() {
  const initialReply = getInitialAdvisorReply();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<AdvisorUiMessage[]>([
    {
      id: "advisor-welcome",
      role: "assistant",
      content: initialReply.message,
      intent: initialReply.intent,
      suggestions: initialReply.suggestions,
      quickReplies: initialReply.quickReplies,
      cta: initialReply.cta,
    },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading, open]);

  async function sendMessage(messageText: string) {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    const userMessage: AdvisorUiMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmed,
    };

    const requestMessages: AdvisorMessageInput[] = [
      ...messages.map((message) => ({ role: message.role, content: message.content })),
      { role: "user", content: trimmed },
    ];

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setOpen(true);
    setIsLoading(true);

    try {
      const response = await fetch("/api/gallery-advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: requestMessages }),
      });

      if (!response.ok) {
        throw new Error("Advisor request failed");
      }

      const reply = (await response.json()) as AdvisorReply;
      setMessages((current) => [...current, toAssistantMessage(reply)]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            "Şu an kısa bir aksaklık var. İsterseniz bütçe, gövde tipi veya marka tercihinizi tekrar yazın; size uygun araçları yeniden çıkarayım.",
          intent: "clarify",
          quickReplies: [
            { label: "SUV araç öner", prompt: "SUV araç öner." },
            { label: "Bütçem 3 milyon civarı", prompt: "Bütçem 3 milyon civarı." },
            { label: "WhatsApp ile bilgi al", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." },
          ],
          cta: {
            label: "Araç Stok Sayfası",
            href: "/vehicles",
          },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit() {
    void sendMessage(input);
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {open ? (
        <section
          className={cn(
            "pointer-events-auto fixed inset-x-3 flex h-[min(68vh,34rem)] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0f151c]/96 shadow-2xl shadow-black/45 backdrop-blur-2xl",
            "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-40 md:left-auto md:right-5 md:h-[36rem] md:w-[25rem]",
          )}
        >
          <div className="border-b border-white/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-accent">Galeri Danışmanı</p>
                <h2 className="mt-2 text-lg font-semibold text-white">Akıllı araç eşleştirme</h2>
                <p className="mt-1 text-sm leading-6 text-white/65">
                  Bütçe, kullanım ve marka beklentinize göre sizi doğru araçlara yönlendireyim.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
              >
                Kapat
              </button>
            </div>
          </div>

          <div ref={scrollAreaRef} className="hide-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("space-y-3", message.role === "user" ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[92%] rounded-[24px] px-4 py-3",
                    message.role === "assistant"
                      ? "border border-white/10 bg-white/[0.04] text-white"
                      : "ml-auto bg-accent text-black",
                  )}
                >
                  {message.role === "assistant" ? (
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent">Danışman</p>
                  ) : null}
                  <p className={cn("text-sm leading-7", message.role === "assistant" ? "mt-2 text-white/85" : "text-black")}>
                    {message.content}
                  </p>
                </div>

                {message.role === "assistant" && message.suggestions && message.suggestions.length > 0 ? (
                  <div className="space-y-3">
                    {message.suggestions.map((suggestion) => (
                      <GalleryAdvisorSuggestionCard key={`${message.id}-${suggestion.slug}`} suggestion={suggestion} />
                    ))}
                  </div>
                ) : null}

                {message.role === "assistant" && message.quickReplies && message.quickReplies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {message.quickReplies.map((quickReply) => (
                      <button
                        key={`${message.id}-${quickReply.label}`}
                        type="button"
                        onClick={() => {
                          void sendMessage(quickReply.prompt);
                        }}
                        disabled={isLoading}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/78 transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {quickReply.label}
                      </button>
                    ))}
                  </div>
                ) : null}

                {message.role === "assistant" && message.cta ? (
                  /^(https?:|tel:|mailto:)/.test(message.cta.href) ? (
                    <a
                      href={message.cta.href}
                      target={message.cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={message.cta.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:border-accent hover:text-accent"
                    >
                      {message.cta.label}
                    </a>
                  ) : (
                    <Link
                      href={message.cta.href}
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white transition hover:border-accent hover:text-accent"
                    >
                      {message.cta.label}
                    </Link>
                  )
                ) : null}
              </div>
            ))}

            {isLoading ? (
              <div className="max-w-[85%] rounded-[24px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/72">
                <p className="text-[10px] uppercase tracking-[0.18em] text-accent">Danışman</p>
                <p className="mt-2 animate-pulse">Araçları tarıyorum, size en uygun seçenekleri hazırlıyorum...</p>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-[24px] border border-white/10 bg-black/20 p-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleInputKeyDown}
                rows={1}
                placeholder="Bütçe, araç tipi veya marka tercihinizi yazın"
                className="min-h-[52px] w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/35"
              />

              <div className="flex items-center justify-between gap-3 px-2 pb-2">
                <p className="text-[11px] text-white/38">Kısa yazın, ben stoktan size uygun araçları ayırayım.</p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!input.trim() || isLoading}
                  className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "pointer-events-auto fixed right-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#10161d]/95 px-4 py-3 text-left shadow-2xl shadow-black/35 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-white/20 md:right-5",
          "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-24",
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          GD
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] uppercase tracking-[0.18em] text-white/45">Akıllı destek</span>
          <span className="block truncate text-sm font-semibold text-white">
            {open ? "Danışmanı Kapat" : "Galeri Danışmanı"}
          </span>
        </span>
      </button>
    </div>
  );
}

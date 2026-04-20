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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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
            "Su an kisa bir aksaklik var. Isterseniz butce, govde tipi veya marka tercihinizi tekrar yazin; size uygun araclari yeniden cikarayim.",
          intent: "clarify",
          quickReplies: [
            { label: "SUV arac oner", prompt: "SUV arac oner." },
            { label: "Butcem 3 milyon civari", prompt: "Butcem 3 milyon civari." },
            { label: "WhatsApp ile bilgi al", prompt: "WhatsApp uzerinden hizli bilgi almak istiyorum." },
          ],
          cta: {
            label: "Arac Stok Sayfasi",
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
        <>
          <div className="pointer-events-auto fixed inset-0 bg-[#091018]/72 backdrop-blur-md md:bg-black/20 md:backdrop-blur-[2px]" />

          <section
            className={cn(
              "pointer-events-auto fixed inset-0 flex h-[100dvh] flex-col overflow-hidden bg-[#0d141b] md:inset-auto md:bottom-40 md:right-5 md:h-[36rem] md:w-[25rem] md:rounded-[30px] md:border md:border-white/10 md:bg-[#0f151c]/96 md:shadow-2xl md:shadow-black/45 md:backdrop-blur-2xl",
            )}
          >
            <div className="border-b border-white/10 bg-[#0f151c]/92 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] md:bg-transparent md:px-4 md:pt-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-accent">Galeri Danismani</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">Akilli arac eslestirme</h2>
                  <p className="mt-1 max-w-md text-sm leading-6 text-white/65">
                    Butce, kullanim ve marka beklentinize gore sizi dogru araclara yonlendireyim.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Kapat
                </button>
              </div>
            </div>

            <div ref={scrollAreaRef} className="hide-scrollbar flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-4">
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
                      <p className="text-[10px] uppercase tracking-[0.18em] text-accent">Danisman</p>
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
                  <p className="text-[10px] uppercase tracking-[0.18em] text-accent">Danisman</p>
                  <p className="mt-2 animate-pulse">Araclari tariyorum, size en uygun secenekleri hazirliyorum...</p>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 bg-[#0f151c]/96 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:bg-transparent">
              <div className="rounded-[24px] border border-white/10 bg-black/20 p-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  rows={1}
                  placeholder="Butce, arac tipi veya marka tercihinizi yazin"
                  className="min-h-[52px] w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-white/35"
                />

                <div className="flex items-center justify-between gap-3 px-2 pb-2">
                  <p className="text-[11px] text-white/38">Kisa yazin, ben stoktan size uygun araclari ayirayim.</p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!input.trim() || isLoading}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Gonder
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "pointer-events-auto fixed right-3 inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#10161d]/95 px-4 py-3 text-left shadow-2xl shadow-black/35 backdrop-blur-2xl transition hover:-translate-y-0.5 hover:border-white/20 md:right-5",
            "bottom-[calc(6.5rem+env(safe-area-inset-bottom))] md:bottom-24",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            GD
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.18em] text-white/45">Akilli destek</span>
            <span className="block truncate text-sm font-semibold text-white">Galeri Danismani</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}

export type AdvisorRole = "assistant" | "user";
export type AdvisorIntent = "welcome" | "clarify" | "recommend" | "contact";

export interface AdvisorMessageInput {
  role: AdvisorRole;
  content: string;
}

export interface AdvisorQuickReply {
  label: string;
  prompt: string;
}

export interface AdvisorSuggestion {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  reason: string;
  href: string;
  whatsappHref: string;
  image: string;
}

export interface AdvisorCta {
  label: string;
  href: string;
}

export interface AdvisorReply {
  intent: AdvisorIntent;
  message: string;
  suggestions: AdvisorSuggestion[];
  quickReplies: AdvisorQuickReply[];
  cta?: AdvisorCta;
}

export const advisorQuickActions: AdvisorQuickReply[] = [
  { label: "Bütçeme uygun araç bul", prompt: "Bütçeme uygun araç bulmama yardımcı ol." },
  { label: "SUV araç öner", prompt: "SUV araç öner." },
  { label: "Elektrikli araç göster", prompt: "Elektrikli araç göster." },
  { label: "Premium araçları listele", prompt: "Premium araçları listele." },
  { label: "Aile için uygun araç öner", prompt: "Aile için uygun araç öner." },
  { label: "Hızlı iletişime geç", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." },
];

export function getInitialAdvisorReply(): AdvisorReply {
  return {
    intent: "welcome",
    message:
      "Merhaba, size uygun aracı bulmanızda yardımcı olabilirim. İsterseniz birkaç kısa soruyla ihtiyacınızı netleştirip stoktan size uygun modelleri önereyim.",
    suggestions: [],
    quickReplies: advisorQuickActions,
    cta: {
      label: "Tüm Stok",
      href: "/vehicles",
    },
  };
}

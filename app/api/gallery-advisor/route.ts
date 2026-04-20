import { NextResponse } from "next/server";
import { buildAdvisorReply } from "@/lib/gallery-advisor";
import { AdvisorMessageInput } from "@/lib/gallery-advisor-shared";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: AdvisorMessageInput[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];
    const reply = buildAdvisorReply(messages);

    return NextResponse.json(reply);
  } catch {
    return NextResponse.json(
      {
        intent: "clarify",
        message:
          "Kısa bir aksaklık oluştu. İsterseniz bütçe, araç tipi veya marka tercihinizi tekrar yazın; size uygun araçları yeniden çıkarayım.",
        suggestions: [],
        quickReplies: [
          { label: "SUV araç öner", prompt: "SUV araç öner." },
          { label: "Bütçem 3 milyon civarı", prompt: "Bütçem 3 milyon civarı." },
          { label: "WhatsApp ile bilgi al", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." },
        ],
      },
      { status: 200 },
    );
  }
}

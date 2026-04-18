"use client";

import { FormEvent, useState } from "react";
import { contactInfo } from "@/lib/data";
import { LeadItem } from "@/lib/types";

const LEADS_STORAGE_KEY = "velocita-leads";

interface LeadFormProps {
  title: string;
  description?: string;
  vehicleLabel?: string;
  source?: string;
  showTradeIn?: boolean;
  showFinance?: boolean;
  showAppointment?: boolean;
  compact?: boolean;
  submitLabel?: string;
}

function saveLead(lead: LeadItem) {
  if (typeof window === "undefined") return;
  const existing = window.localStorage.getItem(LEADS_STORAGE_KEY);
  const leads: LeadItem[] = existing ? JSON.parse(existing) : [];
  leads.unshift(lead);
  window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads.slice(0, 50)));
}

export function LeadForm({
  title,
  description,
  vehicleLabel,
  source = "Form",
  showTradeIn = true,
  showFinance = true,
  showAppointment = false,
  compact = false,
  submitLabel = "WhatsApp ile Talep Gönder",
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState(vehicleLabel ?? "");
  const [message, setMessage] = useState("");
  const [wantsTradeIn, setWantsTradeIn] = useState(false);
  const [wantsFinance, setWantsFinance] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const lead: LeadItem = {
      id: `${Date.now()}`,
      name,
      phone,
      interest,
      message,
      source,
      wantsTradeIn,
      wantsFinance,
      appointmentDate: appointmentDate || undefined,
      createdAt: new Date().toISOString(),
    };

    saveLead(lead);

    const leadMessage = [
      `Merhaba, ${vehicleLabel ? `${vehicleLabel} hakkında` : "araç alım süreci için"} bilgi almak istiyorum.`,
      name ? `Ad Soyad: ${name}` : "",
      phone ? `Telefon: ${phone}` : "",
      interest ? `İlgilendiğim araç: ${interest}` : "",
      `Kaynak: ${source}`,
      wantsTradeIn ? "Takas talebi var" : "",
      wantsFinance ? "Finansman talebi var" : "",
      appointmentDate ? `Randevu talebi: ${appointmentDate}` : "",
      message ? `Not: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(leadMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-[32px] border border-white/10 bg-white/[0.03] ${compact ? "p-5" : "p-7"}`}>
      <p className="text-xs uppercase tracking-[0.3em] text-accent">{source}</p>
      <h3 className={`${compact ? "mt-3 text-2xl" : "mt-4 text-3xl"} font-semibold text-white`}>{title}</h3>
      {description ? <p className="mt-3 text-sm leading-7 text-muted">{description}</p> : null}

      <div className={`mt-8 grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Ad Soyad"
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent"
          required
        />
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          type="tel"
          placeholder="Telefon"
          className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent"
          required
        />
        <input
          value={interest}
          onChange={(event) => setInterest(event.target.value)}
          type="text"
          placeholder="İlgilendiğiniz marka / model"
          className={`rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent ${compact ? "" : "md:col-span-2"}`}
        />
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Bütçe, takas, finansman veya özel taleplerinizi yazın"
          rows={compact ? 4 : 5}
          className={`rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted focus:border-accent ${compact ? "" : "md:col-span-2"}`}
        />
        {(showTradeIn || showFinance || showAppointment) && (
          <div className={`grid gap-3 ${compact ? "" : "md:col-span-2 md:grid-cols-3"}`}>
            {showTradeIn ? (
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                <input
                  type="checkbox"
                  checked={wantsTradeIn}
                  onChange={(event) => setWantsTradeIn(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-accent"
                />
                Takas düşünüyorum
              </label>
            ) : null}
            {showFinance ? (
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/85">
                <input
                  type="checkbox"
                  checked={wantsFinance}
                  onChange={(event) => setWantsFinance(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-accent"
                />
                Finansman istiyorum
              </label>
            ) : null}
            {showAppointment ? (
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none focus:border-accent"
              />
            ) : null}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:brightness-110"
      >
        {submitLabel}
      </button>
    </form>
  );
}

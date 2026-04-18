"use client";

import { useEffect, useMemo, useState } from "react";
import { adminQuickStats, sampleLeads, vehicles } from "@/lib/data";
import { LeadItem, VehicleStatus } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

const LEADS_STORAGE_KEY = "velocita-leads";
const STATUS_STORAGE_KEY = "velocita-status-overrides";
const DRAFTS_STORAGE_KEY = "velocita-draft-vehicles";

type StatusOverrides = Record<string, VehicleStatus>;

export function AdminDashboard() {
  const [leads, setLeads] = useState<LeadItem[]>(sampleLeads);
  const [statusOverrides, setStatusOverrides] = useState<StatusOverrides>({});
  const [draftTitle, setDraftTitle] = useState("");
  const [draftPrice, setDraftPrice] = useState("");
  const [drafts, setDrafts] = useState<Array<{ title: string; price: string }>>([]);

  useEffect(() => {
    const storedLeads = window.localStorage.getItem(LEADS_STORAGE_KEY);
    const storedStatuses = window.localStorage.getItem(STATUS_STORAGE_KEY);
    const storedDrafts = window.localStorage.getItem(DRAFTS_STORAGE_KEY);

    if (storedLeads) setLeads(JSON.parse(storedLeads));
    if (storedStatuses) setStatusOverrides(JSON.parse(storedStatuses));
    if (storedDrafts) setDrafts(JSON.parse(storedDrafts));
  }, []);

  const leadStats = useMemo(
    () => ({
      total: leads.length,
      finance: leads.filter((lead) => lead.wantsFinance).length,
      trade: leads.filter((lead) => lead.wantsTradeIn).length,
    }),
    [leads],
  );

  function updateStatus(slug: string, status: VehicleStatus) {
    const next = { ...statusOverrides, [slug]: status };
    setStatusOverrides(next);
    window.localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(next));
  }

  function addDraft() {
    if (!draftTitle.trim()) return;
    const next = [{ title: draftTitle.trim(), price: draftPrice.trim() || "Belirlenmedi" }, ...drafts];
    setDrafts(next);
    window.localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(next));
    setDraftTitle("");
    setDraftPrice("");
  }

  return (
    <div className="container-shell py-16 md:py-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Yönetim paneli</p>
          <h1 className="mt-4 text-5xl font-semibold text-white">Envanter, lead ve operasyon merkezi</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">
            Bu panel, galericiye gelen talepleri izlemek, araç durumlarını güncellemek ve yeni araç taslaklarını
            hazırlamak için yerel bir CMS iskeleti sunar.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-4">
        {adminQuickStats.map((item) => (
          <article key={item.label} className="rounded-[26px] border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-muted">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Lead merkezi</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Son talepler</h2>
            </div>
            <div className="text-right text-sm text-white/75">
              <p>Toplam: {leadStats.total}</p>
              <p>Finansman: {leadStats.finance}</p>
              <p>Takas: {leadStats.trade}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {leads.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-white/15 p-6 text-sm text-muted">
                Henüz lead yok. Site formlarından gelen talepler burada listelenecek.
              </div>
            ) : (
              leads.map((lead) => (
                <article key={lead.id} className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{lead.name}</h3>
                      <p className="mt-1 text-sm text-white/70">{lead.phone}</p>
                      <p className="mt-3 text-sm text-muted">{lead.interest || "Genel talep"}</p>
                      <p className="mt-2 text-sm leading-7 text-white/80">{lead.message || "Not bırakılmadı."}</p>
                    </div>
                    <div className="space-y-2 text-right text-xs uppercase tracking-[0.18em] text-muted">
                      <p>{lead.source}</p>
                      <p>{lead.wantsTradeIn ? "Takas" : "Takas yok"}</p>
                      <p>{lead.wantsFinance ? "Finansman" : "Peşin / Belirsiz"}</p>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <div className="space-y-8">
          <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Araç taslağı</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Yeni araç hazırla</h2>
            <div className="mt-6 grid gap-4">
              <input
                value={draftTitle}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="Örnek: Mercedes-Benz GLC 300 Coupé"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
              />
              <input
                value={draftPrice}
                onChange={(event) => setDraftPrice(event.target.value)}
                placeholder="Örnek: 5.450.000 TL"
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={addDraft}
                className="inline-flex w-fit rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
              >
                Taslak Ekle
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {drafts.map((draft, index) => (
                <div key={`${draft.title}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                  {draft.title} - {draft.price}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">Envanter durumu</p>
            <div className="mt-6 space-y-4">
              {vehicles.slice(0, 6).map((vehicle) => (
                <div key={vehicle.slug} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">
                        {vehicle.brand} {vehicle.model}
                      </p>
                      <p className="mt-1 text-sm text-muted">{formatPrice(vehicle.price)}</p>
                    </div>
                    <select
                      value={statusOverrides[vehicle.slug] ?? vehicle.status ?? "Stokta"}
                      onChange={(event) => updateStatus(vehicle.slug, event.target.value as VehicleStatus)}
                      className="rounded-full border border-white/10 bg-[#11161d] px-4 py-2 text-sm text-white outline-none"
                    >
                      <option value="Stokta">Stokta</option>
                      <option value="Yeni Giriş">Yeni Giriş</option>
                      <option value="Kapora Alındı">Kapora Alındı</option>
                      <option value="Satıldı">Satıldı</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

import { contactInfo, getVehicleStatus, vehicles } from "@/lib/data";
import {
  AdvisorCta,
  AdvisorIntent,
  AdvisorMessageInput,
  AdvisorQuickReply,
  AdvisorReply,
  AdvisorSuggestion,
  advisorQuickActions,
  getInitialAdvisorReply,
} from "@/lib/gallery-advisor-shared";
import type { Brand, FuelType, Vehicle } from "@/lib/types";
import { formatKm, formatPrice } from "@/lib/utils";

type VehicleBodyStyle = "SUV" | "Sedan" | "Hatchback";
type VehicleUseCase = "family" | "city" | "long-road";

interface AdvisorPreferences {
  budgetMax?: number;
  brands: Brand[];
  fuel?: FuelType;
  bodyStyle?: VehicleBodyStyle;
  useCase?: VehicleUseCase;
  wantsPremium: boolean;
  wantsElectric: boolean;
}

interface ScoredVehicle {
  vehicle: Vehicle;
  score: number;
  reasons: string[];
}

const brandNames: Brand[] = ["Mercedes-Benz", "Audi", "BMW", "Tesla", "Porsche", "Volkswagen"];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeCompactText(value: string) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "");
}

function getVehicleSearchKeys(vehicle: Vehicle) {
  const modelKey = normalizeText(vehicle.model);
  const brandModelKey = normalizeText(`${vehicle.brand} ${vehicle.model}`);
  const seriesKey = normalizeText(`${vehicle.model} ${vehicle.series}`);
  const modelTokens = modelKey.split(/\s+/).filter(Boolean);
  const firstToken = modelTokens[0];
  const secondToken = modelTokens[1];
  const shorthandKeys = [
    firstToken && (firstToken.length >= 3 || /\d/.test(firstToken)) ? firstToken : undefined,
    firstToken && secondToken ? `${firstToken} ${secondToken}` : undefined,
    firstToken === "model" && secondToken ? `model ${secondToken}` : undefined,
    firstToken && firstToken.length === 1 && secondToken ? `${firstToken} ${secondToken}` : undefined,
  ].filter((value): value is string => Boolean(value));

  return [
    { value: brandModelKey, weight: 6 },
    { value: seriesKey, weight: 5 },
    { value: modelKey, weight: 4 },
    ...shorthandKeys.map((value) => ({ value, weight: value.includes(" ") ? 3 : 2 })),
  ];
}

function inferBodyStyle(vehicle: Vehicle): VehicleBodyStyle {
  if (
    ["model-y", "macan", "q8", "x5", "q5", "tiguan", "glc", "gle", "x3", "x7", "q3", "q7"].some((keyword) =>
      vehicle.slug.includes(keyword),
    )
  ) {
    return "SUV";
  }

  if (vehicle.slug.includes("golf")) {
    return "Hatchback";
  }

  return "Sedan";
}

function extractBrands(text: string) {
  const normalized = normalizeText(text);
  return brandNames.filter((brand) => normalized.includes(normalizeText(brand)));
}

function extractFuel(text: string): FuelType | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("elektrik") || normalized.includes("elektrikli")) return "Elektrik";
  if (normalized.includes("hibrit") || normalized.includes("hybrid")) return "Hibrit";
  if (normalized.includes("dizel")) return "Dizel";
  if (normalized.includes("benzin")) return "Benzin";

  return undefined;
}

function extractBodyStyle(text: string): VehicleBodyStyle | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("suv")) return "SUV";
  if (normalized.includes("sedan")) return "Sedan";
  if (normalized.includes("hatchback") || normalized.includes("hb")) return "Hatchback";

  return undefined;
}

function extractUseCase(text: string): VehicleUseCase | undefined {
  const normalized = normalizeText(text);

  if (normalized.includes("aile") || normalized.includes("cocuk") || normalized.includes("genis") || normalized.includes("7 koltuk")) {
    return "family";
  }

  if (normalized.includes("uzun yol") || normalized.includes("seyahat") || normalized.includes("konfor")) {
    return "long-road";
  }

  if (normalized.includes("sehir ici") || normalized.includes("sehirici") || normalized.includes("gunluk") || normalized.includes("gundelik")) {
    return "city";
  }

  return undefined;
}

function extractBudgetMax(text: string): number | undefined {
  const normalized = normalizeText(text);
  const budgetContextMillionMatch = normalized.match(
    /(?:maks(?:imum)?|maximum|en\s+fazla|en\s+cok|ust\s+limit(?:im)?|limit(?:im)?)\s*(\d+(?:[.,]\d+)?)\s*(?:milyon(?:luk)?|mn|m)\b/,
  );

  if (budgetContextMillionMatch) {
    return Number(budgetContextMillionMatch[1].replace(",", ".")) * 1_000_000;
  }

  const rangeMillionMatch = normalized.match(/(\d+(?:[.,]\d+)?)\s*(?:-|ile|ila)\s*(\d+(?:[.,]\d+)?)\s*(?:milyon(?:luk)?|mn|m)\b/);

  if (rangeMillionMatch) {
    return Number(rangeMillionMatch[2].replace(",", ".")) * 1_000_000;
  }

  const millionMatches = [...normalized.matchAll(/(\d+(?:[.,]\d+)?)\s*(?:milyon(?:luk)?|mn|m)\b/g)];
  if (millionMatches.length > 0) {
    return Math.max(...millionMatches.map((match) => Number(match[1].replace(",", ".")) * 1_000_000));
  }

  const tlMatches = [...normalized.matchAll(/(?:butce(?:m|miz)?|tl|₺)?\s*(\d{6,8}|\d{1,3}(?:[.\s]\d{3}){1,2})\b/g)];
  if (tlMatches.length > 0) {
    return Math.max(
      ...tlMatches.map((match) => {
        const digits = match[1].replace(/[.\s]/g, "");
        const value = Number(digits);
        return Number.isFinite(value) ? value : 0;
      }),
    );
  }

  return undefined;
}

function findMentionedVehicles(text: string) {
  const normalized = normalizeText(text);
  const compactNormalized = normalizeCompactText(text);

  return vehicles.filter((vehicle) => {
    return getVehicleSearchKeys(vehicle).some(({ value }) => {
      const compactCandidate = normalizeCompactText(value);
      return normalized.includes(value) || compactNormalized.includes(compactCandidate);
    });
  });
}

function findPrimaryVehicleMatch(text: string) {
  const normalized = normalizeText(text);
  const compactNormalized = normalizeCompactText(text);

  const matches = vehicles
    .map((vehicle) => {
      let maxScore = 0;

      for (const { value, weight } of getVehicleSearchKeys(vehicle)) {
        const compactCandidate = normalizeCompactText(value);
        const matched = normalized.includes(value) || compactNormalized.includes(compactCandidate);
        if (matched) {
          maxScore = Math.max(maxScore, weight);
        }
      }

      return { vehicle, score: maxScore };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);

  return matches[0]?.vehicle;
}

function extractPreferences(messages: AdvisorMessageInput[]): AdvisorPreferences {
  const combined = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ");

  const normalized = normalizeText(combined);

  return {
    budgetMax: extractBudgetMax(combined),
    brands: extractBrands(combined),
    fuel: extractFuel(combined),
    bodyStyle: extractBodyStyle(combined),
    useCase: extractUseCase(combined),
    wantsPremium: normalized.includes("premium") || normalized.includes("prestij") || normalized.includes("lux") || normalized.includes("luks"),
    wantsElectric: normalized.includes("elektrik") || normalized.includes("elektrikli"),
  };
}

function asksForRecommendation(text: string) {
  const normalized = normalizeText(text);

  return ["oner", "listele", "goster", "bul", "yardim", "uygun", "bakiyorum", "istiyorum"].some((keyword) =>
    normalized.includes(keyword),
  );
}

function asksForContact(text: string) {
  const normalized = normalizeText(text);

  return /(whatsapp|iletisim|iletisime gec|randevu|telefon|hizli bilgi|beni ara|danismanla gorus)/.test(normalized);
}

function isFamilyFriendly(vehicle: Vehicle) {
  return inferBodyStyle(vehicle) === "SUV" || vehicle.slug.includes("e-220") || vehicle.slug.includes("a6");
}

function isCityFriendly(vehicle: Vehicle) {
  return vehicle.fuel === "Elektrik" || vehicle.fuel === "Hibrit" || vehicle.slug.includes("golf");
}

function isLongRoadFriendly(vehicle: Vehicle) {
  return vehicle.fuel === "Dizel" || inferBodyStyle(vehicle) === "SUV" || vehicle.slug.includes("e-220") || vehicle.slug.includes("a6");
}

function isPremiumChoice(vehicle: Vehicle) {
  return vehicle.brand !== "Volkswagen" || vehicle.slug.includes("golf-1-5-etsi-r-line-2024");
}

function getAvailableVehicles() {
  return vehicles.filter((vehicle) => getVehicleStatus(vehicle.slug) !== "Satıldı");
}

function getBudgetCap(budgetMax: number, multiplier: number) {
  return Math.round(budgetMax * multiplier);
}

function applyBudgetFilterToRankedVehicles(rankedVehicles: ScoredVehicle[], budgetMax?: number) {
  if (!budgetMax) {
    return rankedVehicles;
  }

  const budgetCaps = [1, 1.08, 1.15, 1.25].map((multiplier) => getBudgetCap(budgetMax, multiplier));

  for (const budgetCap of budgetCaps) {
    const matches = rankedVehicles.filter((item) => item.vehicle.price <= budgetCap);
    if (matches.length > 0) {
      return matches;
    }
  }

  return [];
}

function applyBudgetFilterToSuggestions(suggestions: AdvisorSuggestion[], budgetMax?: number) {
  if (!budgetMax) {
    return suggestions;
  }

  const budgetCaps = [1, 1.08, 1.15, 1.25].map((multiplier) => getBudgetCap(budgetMax, multiplier));

  for (const budgetCap of budgetCaps) {
    const matches = suggestions.filter((suggestion) => {
      const vehicle = vehicles.find((item) => item.slug === suggestion.slug);
      return vehicle ? vehicle.price <= budgetCap : false;
    });

    if (matches.length > 0) {
      return matches;
    }
  }

  return [];
}

function scoreVehicles(preferences: AdvisorPreferences, specificVehicles: Vehicle[]) {
  const availableVehicles = getAvailableVehicles();

  return availableVehicles
    .map<ScoredVehicle>((vehicle) => {
      let score = 0;
      const reasons: string[] = [];
      const bodyStyle = inferBodyStyle(vehicle);

      if (specificVehicles.some((item) => item.slug === vehicle.slug)) {
        score += 50;
        reasons.push("Doğrudan ilgilendiğiniz model olduğu için önceliklendirildi.");
      }

      if (preferences.brands.includes(vehicle.brand)) {
        score += 24;
        reasons.push(`${vehicle.brand} tercihinize uyuyor.`);
      }

      if (preferences.fuel && preferences.fuel === vehicle.fuel) {
        score += 18;
        reasons.push(`${vehicle.fuel} tercihinize uygun.`);
      }

      if (preferences.bodyStyle && preferences.bodyStyle === bodyStyle) {
        score += 20;
        reasons.push(`${bodyStyle} gövde beklentinize uyuyor.`);
      }

      if (preferences.useCase === "family" && isFamilyFriendly(vehicle)) {
        score += 16;
        reasons.push("Aile kullanımı için hacim ve konfor tarafı güçlü.");
      }

      if (preferences.useCase === "city" && isCityFriendly(vehicle)) {
        score += 14;
        reasons.push("Şehir içi kullanıma uygun, pratik bir seçenek.");
      }

      if (preferences.useCase === "long-road" && isLongRoadFriendly(vehicle)) {
        score += 14;
        reasons.push("Uzun yol konforu ve sürüş dengesi güçlü.");
      }

      if (preferences.wantsPremium && isPremiumChoice(vehicle)) {
        score += 10;
        reasons.push("Premium his ve donanım tarafı güçlü.");
      }

      if (preferences.wantsElectric && vehicle.fuel === "Elektrik") {
        score += 20;
        reasons.push("Elektrikli kullanım beklentinizle örtüşüyor.");
      }

      if (preferences.budgetMax) {
        const ratio = vehicle.price / preferences.budgetMax;

        if (ratio <= 1) {
          score += 22;
          reasons.push("Bütçenizin içinde veya çok yakınında kalıyor.");
        } else if (ratio <= 1.12) {
          score += 12;
          reasons.push("Bütçenize yakın güçlü bir alternatif.");
        } else if (ratio <= 1.25) {
          score += 4;
        } else {
          score -= 12;
        }
      }

      if (score === 0) {
        score += Math.max(1, vehicle.year - 2020);
      }

      return { vehicle, score, reasons };
    })
    .sort((left, right) => right.score - left.score);
}

function applyExplicitFilters(
  rankedVehicles: ScoredVehicle[],
  preferences: AdvisorPreferences,
) {
  let filtered = applyBudgetFilterToRankedVehicles(rankedVehicles, preferences.budgetMax);

  if (preferences.brands.length > 0) {
    filtered = filtered.filter((item) => preferences.brands.includes(item.vehicle.brand));
  }

  if (preferences.bodyStyle) {
    filtered = filtered.filter((item) => inferBodyStyle(item.vehicle) === preferences.bodyStyle);
  }

  if (preferences.fuel) {
    filtered = filtered.filter((item) => item.vehicle.fuel === preferences.fuel);
  } else if (preferences.wantsElectric) {
    const electricMatches = filtered.filter((item) => item.vehicle.fuel === "Elektrik");
    if (electricMatches.length > 0) {
      filtered = electricMatches;
    } else {
      filtered = filtered.filter((item) => item.vehicle.fuel === "Hibrit");
    }
  }

  if (preferences.wantsPremium) {
    filtered = filtered.filter((item) => isPremiumChoice(item.vehicle));
  }

  return filtered;
}

function enforceFinalSuggestionFilters(suggestions: AdvisorSuggestion[], preferences: AdvisorPreferences) {
  let filtered = applyBudgetFilterToSuggestions(suggestions, preferences.budgetMax);

  if (preferences.brands.length > 0) {
    filtered = filtered.filter((suggestion) =>
      preferences.brands.some((brand) => suggestion.title.startsWith(brand)),
    );
  }

  if (preferences.bodyStyle) {
    filtered = filtered.filter((suggestion) => {
      const vehicle = vehicles.find((item) => item.slug === suggestion.slug);
      return vehicle ? inferBodyStyle(vehicle) === preferences.bodyStyle : false;
    });
  }

  if (preferences.fuel) {
    filtered = filtered.filter((suggestion) => suggestion.subtitle.includes(`• ${preferences.fuel} •`));
  } else if (preferences.wantsElectric) {
    const electricMatches = filtered.filter((suggestion) => suggestion.subtitle.includes("• Elektrik •"));
    if (electricMatches.length > 0) {
      filtered = electricMatches;
    } else {
      filtered = filtered.filter((suggestion) => suggestion.subtitle.includes("• Hibrit •"));
    }
  }

  if (preferences.wantsPremium) {
    filtered = filtered.filter((suggestion) => {
      const vehicle = vehicles.find((item) => item.slug === suggestion.slug);
      return vehicle ? isPremiumChoice(vehicle) : false;
    });
  }

  return filtered;
}

function toSuggestion({ vehicle, reasons }: ScoredVehicle): AdvisorSuggestion {
  const title = `${vehicle.brand} ${vehicle.model}`;
  const subtitle = `${vehicle.year} • ${vehicle.fuel} • ${formatKm(vehicle.km)} km`;
  const reason = reasons.slice(0, 2).join(" ") || vehicle.shortDescription;
  const whatsappText = encodeURIComponent(`${title} ${vehicle.series} hakkında hızlı bilgi almak istiyorum.`);

  return {
    slug: vehicle.slug,
    title,
    subtitle,
    price: formatPrice(vehicle.price),
    reason,
    href: `/vehicles/${vehicle.slug}`,
    whatsappHref: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${whatsappText}`,
    image: vehicle.coverImage,
  };
}

function getClarifyingQuickReplies(preferences: AdvisorPreferences) {
  const replies: AdvisorQuickReply[] = [];

  if (!preferences.budgetMax) {
    replies.push({ label: "Bütçem 2 milyon civarı", prompt: "Bütçem 2 milyon civarı." });
  }

  if (!preferences.bodyStyle) {
    replies.push({ label: "SUV olsun", prompt: "SUV olsun." });
  }

  if (!preferences.fuel) {
    replies.push({ label: "Dizel tercih ederim", prompt: "Dizel tercih ederim." });
  }

  replies.push({ label: "WhatsApp ile devam edelim", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." });

  return replies.slice(0, 4);
}

function buildContactReply(suggestions: AdvisorSuggestion[]): AdvisorReply {
  const message =
    suggestions.length > 0
      ? "İsterseniz bu araçlar için sizi doğrudan hızlı bilgi hattına yönlendireyim. WhatsApp üzerinden ekspertiz, fiyat ve randevu detaylarını aynı anda netleştirebiliriz."
      : "Sizi doğrudan hızlı bilgi hattına yönlendirebilirim. WhatsApp üzerinden stok, fiyat, takas ve randevu detaylarını kısa sürede paylaşalım.";

  return {
    intent: "contact",
    message,
    suggestions: suggestions.slice(0, 2),
    quickReplies: [
      { label: "Stoktaki araçları göster", prompt: "Stoktaki araçları göster." },
      { label: "SUV öner", prompt: "SUV araç öner." },
      { label: "Premium araçları göster", prompt: "Premium araçları listele." },
    ],
    cta: {
      label: "WhatsApp ile Bilgi Al",
      href: `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
        "Merhaba, Galeri Danışmanı üzerinden bilgi almak ve uygun araçları konuşmak istiyorum.",
      )}`,
    },
  };
}

function buildRecommendationMessage(preferences: AdvisorPreferences, suggestions: AdvisorSuggestion[]) {
  const intro = preferences.useCase === "family"
    ? "Aile kullanımı için hacim ve konforu güçlü seçenekleri öne çıkardım."
    : preferences.bodyStyle === "SUV"
      ? "SUV tarafında size en güçlü duran seçenekleri ayırdım."
      : preferences.wantsElectric
        ? "Elektrikli tarafta size uygun öne çıkan seçenekleri hazırladım."
        : preferences.brands.length > 0
          ? `${preferences.brands.join(", ")} tarafında size yakın duran araçları öne çıkardım.`
          : "Kriterlerinize göre size en yakın duran araçları ayırdım.";

  const outro = !preferences.budgetMax || !preferences.fuel || !preferences.bodyStyle
    ? "İsterseniz bütçe veya kullanım detayını biraz daha netleştirip listeyi daha da daraltabilirim."
    : "İsterseniz detay sayfasına geçebilir ya da doğrudan hızlı bilgi hattına yönlenebilirsiniz.";

  if (suggestions.length === 0) {
    return "Bu kriterlere tam oturan araç şu an stokta görünmüyor. İsterseniz bütçeyi veya gövde tipini biraz esnetip en yakın alternatifleri çıkarayım.";
  }

  return `${intro} ${outro}`;
}

function buildClarifyingMessage(preferences: AdvisorPreferences) {
  if (preferences.useCase === "family") {
    return "Aile kullanımı için geniş SUV ve konforlu sedan seçenekler mantıklı olur. Bütçe ve yakıt tercihinizi paylaşırsanız listeyi daha net eşleştirebilirim.";
  }

  if (preferences.bodyStyle === "SUV") {
    return "SUV tarafında birkaç güçlü seçenek çıkarabilirim. Bütçe ve yakıt tercihinizi de paylaşırsanız daha temiz bir eşleştirme yaparım.";
  }

  if (preferences.wantsElectric) {
    return "Elektrikli tarafta menzil ve kullanım senaryosu önemli. İsterseniz bütçe ve kullanım tipinize göre size uygun modeli ayırayım.";
  }

  return "Size uygun aracı daha net önerebilmem için bütçe, araç tipi veya yakıt tercihinden biriyle başlayabiliriz. İsterseniz birkaç kısa soruyla ilerleyelim.";
}

export function buildAdvisorReply(messages: AdvisorMessageInput[]): AdvisorReply {
  const userMessages = messages.filter((message) => message.role === "user");

  if (userMessages.length === 0) {
    return getInitialAdvisorReply();
  }

  const lastMessage = userMessages[userMessages.length - 1]?.content ?? "";
  const preferences = extractPreferences(messages);
  const primaryVehicleMatch = findPrimaryVehicleMatch(lastMessage);
  const mentionedVehicles = primaryVehicleMatch ? [primaryVehicleMatch] : findMentionedVehicles(lastMessage);
  const rankedVehicles = applyExplicitFilters(scoreVehicles(preferences, mentionedVehicles), preferences);
  const suggestions = enforceFinalSuggestionFilters(rankedVehicles.slice(0, 8).map(toSuggestion), preferences).slice(0, 4);
  const signalCount = [
    preferences.budgetMax,
    preferences.fuel,
    preferences.bodyStyle,
    preferences.useCase,
    preferences.wantsPremium || undefined,
    preferences.wantsElectric || undefined,
    preferences.brands.length > 0 ? preferences.brands.join(",") : undefined,
  ].filter(Boolean).length;

  if (asksForContact(lastMessage)) {
    return buildContactReply(suggestions);
  }

  if (primaryVehicleMatch && asksForRecommendation(lastMessage)) {
    return {
      intent: "recommend",
      message: `${primaryVehicleMatch.brand} ${primaryVehicleMatch.model} için sizi doğrudan detay sayfasına yönlendirebilirim. İsterseniz benzer birkaç alternatifi de yanına bıraktım.`,
      suggestions,
      quickReplies: [
        { label: "Benzer araçları göster", prompt: "Benzer araçları göster." },
        { label: "SUV alternatif göster", prompt: "SUV araç öner." },
        { label: "WhatsApp ile bilgi al", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." },
      ],
      cta: {
        label: "Araç Detayına Git",
        href: `/vehicles/${primaryVehicleMatch.slug}`,
      },
    };
  }

  if (signalCount >= 2 || asksForRecommendation(lastMessage) || mentionedVehicles.length > 0) {
    return {
      intent: "recommend",
      message: buildRecommendationMessage(preferences, suggestions),
      suggestions,
      quickReplies: [
        !preferences.budgetMax
          ? { label: "Bütçem 3 milyon civarı", prompt: "Bütçem 3 milyon civarı." }
          : { label: "Bütçeme daha yakın araç göster", prompt: "Bütçeme daha yakın araç göster." },
        !preferences.bodyStyle
          ? { label: "Sedan olsun", prompt: "Sedan olsun." }
          : { label: "Benzer araç göster", prompt: "Benzer araç göster." },
        !preferences.fuel
          ? { label: "Hibrit de olabilir", prompt: "Hibrit de olabilir." }
          : { label: "Yakıtı farklı alternatif göster", prompt: "Yakıtı farklı alternatif göster." },
        { label: "WhatsApp ile devam et", prompt: "WhatsApp üzerinden hızlı bilgi almak istiyorum." },
      ],
      cta: {
        label: "Tüm Stoku İncele",
        href: "/vehicles",
      },
    };
  }

  return {
    intent: "clarify",
    message: buildClarifyingMessage(preferences),
    suggestions: suggestions.slice(0, 2),
    quickReplies: getClarifyingQuickReplies(preferences),
    cta: {
      label: "Araç Stok Sayfası",
      href: "/vehicles",
    },
  };
}

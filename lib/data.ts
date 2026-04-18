import {
  Brand,
  DeliveryStory,
  FinancePlan,
  LeadItem,
  TransparencyItem,
  TrustItem,
  Vehicle,
  VehicleStatus,
} from "@/lib/types";

export const contactInfo = {
  company: "Velocita Motors",
  phone: "+90 212 555 01 01",
  whatsapp: "+90 548 889 38 94",
  email: "iletisim@velocitamotors.com",
  instagram: "velocitamotors",
  facebook: "velocitamotors",
  address: "Maslak Atatürk Oto Sanayi, 2. Kısım No:145, Sarıyer / İstanbul",
  hours: [
    "Pazartesi - Cuma: 09:00 - 19:00",
    "Cumartesi: 10:00 - 18:00",
    "Pazar: Randevu ile",
  ],
};

export const brands: Array<{
  name: Brand;
  tagline: string;
  description: string;
}> = [
  {
    name: "Mercedes-Benz",
    tagline: "Kurumsal konfor ve prestij",
    description: "S-Class zarafetinden AMG karakterine uzanan seçkin koleksiyon.",
  },
  {
    name: "Audi",
    tagline: "Teknoloji odaklı premium sürüş",
    description: "Quattro mirasıyla dinamik, rafine ve günlük kullanıma güçlü cevap.",
  },
  {
    name: "BMW",
    tagline: "Sürüş keyfi ve net duruş",
    description: "M Sport çizgileri ve yüksek donanımlı sedan-SUV seçenekleri.",
  },
  {
    name: "Tesla",
    tagline: "Yeni nesil elektrikli deneyim",
    description: "Yüksek menzil, yazılım odaklı kullanım ve güçlü performans.",
  },
  {
    name: "Porsche",
    tagline: "İkonik performans ve tasarım",
    description: "Sportif karakteri günlük lüksle birleştiren özel seçenekler.",
  },
  {
    name: "Volkswagen",
    tagline: "Akıllı yatırım, güçlü kullanıcı değeri",
    description: "Dengeli donanım, düşük işletme maliyeti ve sağlam ikinci el algısı.",
  },
];

export const stats = [
  { label: "Yıllık sektör deneyimi", value: "12+" },
  { label: "Teslim edilen premium araç", value: "1.850+" },
  { label: "Memnuniyet odaklı danışmanlık", value: "%98" },
  { label: "Aynı gün geri dönüş", value: "15 dk" },
];

export const trustHighlights = [
  {
    title: "Ekspertiz ve şeffaf geçmiş",
    description:
      "Her araç bağımsız ekspertiz raporu, bakım geçmişi ve hasar şeffaflığı ile sunulur.",
  },
  {
    title: "Premium danışmanlık akışı",
    description:
      "İlk temastan teslimata kadar tek bir uzman danışmanla hızlı, net ve güvenli ilerlersiniz.",
  },
  {
    title: "Takas ve finansman desteği",
    description:
      "Değerleme, takas ve kredi yönlendirmelerini aynı çatı altında pratik şekilde yönetiriz.",
  },
];

export const testimonials = [
  {
    name: "Emre T.",
    role: "Porsche Macan Alıcısı",
    quote:
      "Araç anlatımı, ekspertiz şeffaflığı ve teslimat süreci tam olarak premium bir deneyimdi.",
  },
  {
    name: "Zeynep A.",
    role: "Tesla Model Y Alıcısı",
    quote:
      "Instagram üzerinden geldim, aynı gün görüntülü tanıtım aldım ve güvenerek kapora sürecine geçtim.",
  },
  {
    name: "Murat K.",
    role: "Kurumsal Filo Müşterisi",
    quote:
      "İletişim hızları ve kurumsal duruşları sayesinde ikinci alımımızı da gönül rahatlığıyla yaptık.",
  },
];

export const instagramFeed = [
  {
    title: "Yeni gelenler",
    caption: "Haftanın dikkat çeken premium teslimata hazır araçları.",
  },
  {
    title: "Teslimat anları",
    caption: "Mutlu müşteri hikayeleri ve anahtar teslim deneyimi.",
  },
  {
    title: "Showroom detayları",
    caption: "Dijital vitrin kadar güçlü bir fiziksel karşılaşma için seçilmiş kareler.",
  },
];

export const vehicles: Vehicle[] = [
  {
    slug: "mercedes-benz-e-220-d-amg-2023",
    brand: "Mercedes-Benz",
    model: "E 220 d",
    series: "AMG",
    year: 2023,
    price: 4875000,
    km: 24000,
    fuel: "Dizel",
    transmission: "9G-Tronic",
    horsepower: 200,
    drivetrain: "Arkadan itiş",
    color: "Obsidyen Siyah",
    badge: "Yeni Giriş",
    location: "İstanbul",
    shortDescription: "Gece paketli, cam tavanlı, bayi çıkışlı, servis bakımlı.",
    description:
      "Dış tasarımında AMG paketin net duruşunu, iç mekanda ise Burmester ses sistemi ve çift ekran mimarisini öne çıkaran rafine bir E Serisi. Uzun yolda konfor, şehir içinde prestij ve düşük kilometre avantajını bir arada sunar.",
    coverImage:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "AMG dış tasarım paketi",
      "Burmester ses sistemi",
      "Adaptif hız sabitleyici",
      "Panoramik cam tavan",
      "360 derece kamera",
      "Isıtmalı hafızalı ön koltuklar",
    ],
  },
  {
    slug: "audi-a6-45-tfsi-quattro-2022",
    brand: "Audi",
    model: "A6 45 TFSI",
    series: "quattro",
    year: 2022,
    price: 4325000,
    km: 31000,
    fuel: "Hibrit",
    transmission: "Otomatik",
    horsepower: 245,
    drivetrain: "Dört çeker",
    color: "Daytona Gri",
    badge: "Prestige",
    location: "İstanbul",
    shortDescription: "Matrix LED, Bang & Olufsen, sürüş destek plus paket.",
    description:
      "Minimal Alman çizgisini güçlü teknoloji ile buluşturan A6, quattro altyapısı ve yüksek kabin izolasyonu sayesinde hem yönetici kullanımı hem aile sürüşü için ideal.",
    coverImage:
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "quattro dört çeker",
      "Bang & Olufsen premium ses",
      "Matrix LED farlar",
      "Ambiyans iç mekan paketi",
      "Head-up display",
      "Kablosuz Apple CarPlay",
    ],
  },
  {
    slug: "bmw-520i-m-sport-2024",
    brand: "BMW",
    model: "520i",
    series: "M Sport",
    year: 2024,
    price: 5190000,
    km: 9000,
    fuel: "Benzin",
    transmission: "Otomatik",
    horsepower: 190,
    drivetrain: "Arkadan itiş",
    color: "Mineral Beyaz",
    badge: "Low KM",
    location: "İstanbul",
    shortDescription: "Live Cockpit, Harman Kardon, launch control destekli.",
    description:
      "Yeni nesil 5 Serisi formu, dijital kokpit mimarisi ve M Sport detayları ile güçlü bir ilk izlenim yaratır. Düşük kilometresi ve güncel kasasıyla yatırım değeri yüksektir.",
    coverImage:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "M Sport tasarım paketi",
      "Harman Kardon ses sistemi",
      "Adaptif sürüş modları",
      "Elektrikli bagaj kapağı",
      "Kablosuz şarj",
      "Şerit takip asistanı",
    ],
  },
  {
    slug: "tesla-model-y-long-range-2024",
    brand: "Tesla",
    model: "Model Y",
    series: "Long Range",
    year: 2024,
    price: 3280000,
    km: 11000,
    fuel: "Elektrik",
    transmission: "Otomatik",
    horsepower: 514,
    drivetrain: "Dört çeker",
    color: "Pearl White",
    badge: "Elektrikli",
    location: "İstanbul",
    shortDescription: "Autopilot, çift motor, uzun menzil, mat PPF korumalı.",
    description:
      "Şehir içi verimlilik ile yüksek performansı tek gövdede buluşturan Model Y, teknoloji odaklı kullanıcılar için modern ve düşük işletme maliyetli bir premium çözüm.",
    coverImage:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "Long Range çift motor",
      "Autopilot destek paketi",
      "Panoramik cam tavan",
      "Elektrikli bagaj kapağı",
      "Isıtmalı ön/arka koltuklar",
      "Over-the-air yazılım güncellemeleri",
    ],
  },
  {
    slug: "porsche-macan-2023",
    brand: "Porsche",
    model: "Macan",
    series: "Sport Chrono",
    year: 2023,
    price: 6985000,
    km: 18000,
    fuel: "Benzin",
    transmission: "Tiptronic",
    horsepower: 265,
    drivetrain: "Dört çeker",
    color: "Volcano Grey",
    badge: "Sport",
    location: "İstanbul",
    shortDescription: "Sport Chrono, pano bordo iç, adaptif havalı süspansiyon.",
    description:
      "Macan, Porsche sürüş karakterini SUV pratikliği ile buluşturuyor. Sport Chrono ve havalı süspansiyon kombinasyonu sayesinde hem şehirde hem uzun yolda karakterini koruyor.",
    coverImage:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "Sport Chrono paketi",
      "Adaptif havalı süspansiyon",
      "Bose surround ses",
      "14 yön elektrikli koltuklar",
      "360 derece kamera",
      "Porsche Communication Management",
    ],
  },
  {
    slug: "volkswagen-golf-1-5-etsi-r-line-2024",
    brand: "Volkswagen",
    model: "Golf 1.5 eTSI",
    series: "R-Line",
    year: 2024,
    price: 2140000,
    km: 6000,
    fuel: "Hibrit",
    transmission: "Otomatik",
    horsepower: 150,
    drivetrain: "Önden çekiş",
    color: "Lapiz Blue",
    badge: "Akıllı Seçim",
    location: "İstanbul",
    shortDescription: "Matrix far, dijital cockpit, garanti devam ediyor.",
    description:
      "Golf R-Line, günlük kullanıma uygunluğu ve güçlü ikinci el algısı sayesinde dengeli bir premium giriş noktası sunuyor. Düşük kilometre ve güncel garanti avantajıyla öne çıkar.",
    coverImage:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "R-Line iç/dış paket",
      "Dijital Cockpit Pro",
      "IQ.Light Matrix LED",
      "Adaptif hız sabitleyici",
      "Kablosuz telefon yansıtma",
      "Şerit ortalama asistanı",
    ],
  },
  {
    slug: "audi-q8-55-tfsi-s-line-2023",
    brand: "Audi",
    model: "Q8 55 TFSI",
    series: "S line",
    year: 2023,
    price: 7890000,
    km: 22000,
    fuel: "Benzin",
    transmission: "Otomatik",
    horsepower: 340,
    drivetrain: "Dört çeker",
    color: "Mythos Black",
    badge: "SUV",
    location: "İstanbul",
    shortDescription: "S line iç/dış, gece görüş, soft close, masaj koltuk.",
    description:
      "Geniş omuz çizgisi, coupe SUV karakteri ve üst düzey kabin teknolojisiyle Q8, dikkat çekici fakat kurumsal kalabilen nadir modellerden biri.",
    coverImage:
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "S line iç ve dış tasarım",
      "Masaj fonksiyonlu ön koltuklar",
      "Soft close kapılar",
      "Gece görüş asistanı",
      "Dört teker yönlendirme",
      "Bang & Olufsen 3D ses",
    ],
  },
  {
    slug: "bmw-x5-xdrive30d-m-sport-2022",
    brand: "BMW",
    model: "X5 xDrive30d",
    series: "M Sport",
    year: 2022,
    price: 6150000,
    km: 43000,
    fuel: "Dizel",
    transmission: "Otomatik",
    horsepower: 286,
    drivetrain: "Dört çeker",
    color: "Carbon Black",
    badge: "Aile SUV",
    location: "İstanbul",
    shortDescription: "7 koltuk, panoramik cam tavan, lazer far, servis kayıtlı.",
    description:
      "Geniş yaşam alanı ve güçlü dizel motor kombinasyonuyla uzun yol yapan aileler ve şirket sahipleri için yüksek konforlu bir seçenek.",
    coverImage:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1400&q=80",
    ],
    equipment: [
      "M Sport tasarım paketi",
      "7 koltuk düzeni",
      "BMW Laserlight",
      "Panoramik cam tavan",
      "Head-up display",
      "Harman Kardon surround ses",
    ],
  },
];

export const featuredSlugs = [
  "mercedes-benz-e-220-d-amg-2023",
  "audi-a6-45-tfsi-quattro-2022",
  "bmw-520i-m-sport-2024",
  "porsche-macan-2023",
];

export const vehicleStatusMap: Record<string, VehicleStatus> = {
  "mercedes-benz-e-220-d-amg-2023": "Yeni Giriş",
  "audi-a6-45-tfsi-quattro-2022": "Stokta",
  "bmw-520i-m-sport-2024": "Kapora Alındı",
  "tesla-model-y-long-range-2024": "Stokta",
  "porsche-macan-2023": "Yeni Giriş",
  "volkswagen-golf-1-5-etsi-r-line-2024": "Stokta",
  "audi-q8-55-tfsi-s-line-2023": "Stokta",
  "bmw-x5-xdrive30d-m-sport-2022": "Satıldı",
};

export const vehicleVideoMap: Record<string, string> = {
  "mercedes-benz-e-220-d-amg-2023": "https://www.youtube-nocookie.com/embed/1qZEy7Migdo",
  "audi-a6-45-tfsi-quattro-2022": "https://www.youtube-nocookie.com/embed/RR1nA22M8ew",
  "bmw-520i-m-sport-2024": "https://www.youtube-nocookie.com/embed/YP4A2gkYkqQ",
  "tesla-model-y-long-range-2024": "https://www.youtube-nocookie.com/embed/xpY6O4J8f9k",
  "porsche-macan-2023": "https://www.youtube-nocookie.com/embed/J5wL8mASeJQ",
};

export const vehicleTrustMap: Record<string, TrustItem[]> = {
  "mercedes-benz-e-220-d-amg-2023": [
    { title: "Ekspertiz Hazır", description: "Bağımsız ekspertiz raporu teslim günü dahil paylaşılır.", value: "%100" },
    { title: "Servis Kayıtlı", description: "Periyodik bakım geçmişi dijital dosya olarak sunulur." },
    { title: "Bayi Çıkışlı", description: "Kaynak ve kullanım geçmişi net şekilde açıklanır." },
  ],
  "audi-a6-45-tfsi-quattro-2022": [
    { title: "Quattro Güvencesi", description: "Şase ve mekanik kontroller showroom öncesi tamamlandı." },
    { title: "Boyasız Panel Bilgisi", description: "Kritik panel ve değişen parçası şeffaf şekilde beyan edilir." },
    { title: "Test Sürüşü Randevulu", description: "Ciddi alıcılar için uzman eşliğinde sürüş organize edilir." },
  ],
};

export const vehicleTransparencyMap: Record<string, TransparencyItem[]> = {
  "mercedes-benz-e-220-d-amg-2023": [
    { label: "Ekspertiz", value: "Bağımsız ekspertiz raporu hazır" },
    { label: "Tramer", value: "Danışman üzerinden şeffaf paylaşım" },
    { label: "Boya / Değişen", value: "Panel detayları talep anında iletilir" },
    { label: "Servis Geçmişi", value: "Yetkili / özel servis kayıtları mevcut" },
  ],
  "audi-a6-45-tfsi-quattro-2022": [
    { label: "Ekspertiz", value: "Kontrol ve test süreci tamamlandı" },
    { label: "Tramer", value: "Hasar kaydı bilgisi talepte açıklanır" },
    { label: "Boya / Değişen", value: "Kritik panel bilgileri şeffaf beyan edilir" },
    { label: "Servis Geçmişi", value: "Bakım kayıtları dijital dosyada sunulur" },
  ],
};

export const defaultTransparencyItems: TransparencyItem[] = [
  { label: "Ekspertiz", value: "Bağımsız ekspertiz raporu paylaşılır" },
  { label: "Tramer", value: "Hasar / kayıt bilgisi danışmanla açıklanır" },
  { label: "Boya / Değişen", value: "Panel detayları şeffaf şekilde beyan edilir" },
  { label: "Servis Geçmişi", value: "Mevcut kayıtlar teslim öncesi aktarılır" },
];

export const defaultTrustItems: TrustItem[] = [
  { title: "Ekspertiz Raporu", description: "Tüm mekanik ve kozmetik detaylar teslim öncesi paylaşılır." },
  { title: "Servis Geçmişi", description: "Mevcut servis ve bakım kayıtları dosya halinde aktarılır." },
  { title: "Noter ve Teslimat", description: "Noter, sigorta ve teslim akışı tek danışmanla yönetilir." },
];

export const vehicleFinanceMap: Record<string, FinancePlan[]> = {
  "mercedes-benz-e-220-d-amg-2023": [
    { title: "Kurumsal Plan", downPayment: "1.450.000 TL", term: "24 Ay", monthly: "178.000 TL" },
    { title: "Dengeli Plan", downPayment: "1.950.000 TL", term: "18 Ay", monthly: "156.000 TL" },
  ],
  "bmw-520i-m-sport-2024": [
    { title: "M Sport Plan", downPayment: "1.800.000 TL", term: "24 Ay", monthly: "182.000 TL" },
    { title: "Hizli Kapanis", downPayment: "2.400.000 TL", term: "12 Ay", monthly: "240.000 TL" },
  ],
  "tesla-model-y-long-range-2024": [
    { title: "Elektrikli Plan", downPayment: "1.100.000 TL", term: "24 Ay", monthly: "121.000 TL" },
    { title: "Esnek Odeme", downPayment: "1.450.000 TL", term: "18 Ay", monthly: "109.000 TL" },
  ],
};

export const defaultFinancePlans: FinancePlan[] = [
  { title: "Standart Plan", downPayment: "Araca göre", term: "12-24 Ay", monthly: "Danışmanla belirlenir" },
  { title: "Takas Destekli", downPayment: "Araç değerlemesine göre", term: "12-24 Ay", monthly: "Kredi uygunluğuna göre" },
];

export const googleReviewSummary = {
  rating: "4.9",
  count: "286+",
  label: "Google yorumu",
};

export const recentDeliveries: DeliveryStory[] = [
  {
    customer: "Berke C.",
    vehicle: "BMW 520i M Sport",
    city: "İstanbul",
    note: "Instagram üzerinden başlayan süreç aynı hafta noter teslimiyle tamamlandı.",
  },
  {
    customer: "Selin O.",
    vehicle: "Tesla Model Y Long Range",
    city: "Bursa",
    note: "Görüntülü tanıtım, ekspertiz dosyası ve uzaktan kapora süreci sorunsuz ilerledi.",
  },
  {
    customer: "Onur D.",
    vehicle: "Porsche Macan",
    city: "Ankara",
    note: "Takas destekli premium teslimat akışı ile iki araçlı işlem tek günde kapandı.",
  },
];

export const financeHighlights = [
  "Takas kabul edilir ve aynı gün değerleme sunulur.",
  "Kredi başvuru evrakları danışman tarafından tek listede yönetilir.",
  "Premium segment araçlar için esnek kapora ve noter planlaması yapılır.",
];

export const adminQuickStats = [
  { label: "Bugun gelen lead", value: "14" },
  { label: "WhatsApp donus orani", value: "%63" },
  { label: "Randevuya donusen lead", value: "5" },
  { label: "Kapora asamasindaki arac", value: "3" },
];

export const sampleLeads: LeadItem[] = [
  {
    id: "lead-1",
    name: "Can Yilmaz",
    phone: "+90 532 400 10 10",
    interest: "BMW 520i M Sport",
    message: "Takas ve kredi seceneklerini ogrenmek istiyorum.",
    source: "Arac Detay",
    wantsTradeIn: true,
    wantsFinance: true,
    appointmentDate: "2026-04-20T14:30",
    createdAt: "2026-04-18T11:20:00.000Z",
  },
  {
    id: "lead-2",
    name: "Ece Demir",
    phone: "+90 533 222 44 55",
    interest: "Tesla Model Y Long Range",
    message: "Araci hafta sonu gormek istiyorum.",
    source: "Ana Sayfa Sticky Bar",
    wantsTradeIn: false,
    wantsFinance: false,
    appointmentDate: "2026-04-19T12:00",
    createdAt: "2026-04-18T09:05:00.000Z",
  },
];

export const featuredVehicles = vehicles.filter((vehicle) => featuredSlugs.includes(vehicle.slug)).slice(0, 4);

export function getVehicleBySlug(slug: string) {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getRelatedVehicles(slug: string, brand: Brand) {
  return vehicles.filter((vehicle) => vehicle.slug !== slug && vehicle.brand === brand).slice(0, 3);
}

export function getVehicleStatus(slug: string) {
  return vehicleStatusMap[slug] ?? "Stokta";
}

export function getVehicleVideo(slug: string) {
  return vehicleVideoMap[slug];
}

export function getVehicleTrustItems(slug: string) {
  return vehicleTrustMap[slug] ?? defaultTrustItems;
}

export function getVehicleFinancePlans(slug: string) {
  return vehicleFinanceMap[slug] ?? defaultFinancePlans;
}

export function getVehicleTransparencyItems(slug: string) {
  return vehicleTransparencyMap[slug] ?? defaultTransparencyItems;
}

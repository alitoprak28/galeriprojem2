export type Brand =
  | "Mercedes-Benz"
  | "Audi"
  | "BMW"
  | "Tesla"
  | "Porsche"
  | "Volkswagen";

export type FuelType = "Benzin" | "Dizel" | "Elektrik" | "Hibrit";
export type Transmission = "Otomatik" | "Tiptronic" | "8G-Tronic" | "9G-Tronic";
export type VehicleStatus = "Stokta" | "Yeni Giriş" | "Kapora Alındı" | "Satıldı";

export interface FinancePlan {
  title: string;
  downPayment: string;
  term: string;
  monthly: string;
}

export interface TrustItem {
  title: string;
  description: string;
  value?: string;
}

export interface TransparencyItem {
  label: string;
  value: string;
}

export interface DeliveryStory {
  customer: string;
  vehicle: string;
  city: string;
  note: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  interest: string;
  message: string;
  source: string;
  wantsTradeIn: boolean;
  wantsFinance: boolean;
  appointmentDate?: string;
  createdAt: string;
}

export interface Vehicle {
  slug: string;
  brand: Brand;
  model: string;
  series: string;
  year: number;
  price: number;
  km: number;
  fuel: FuelType;
  transmission: Transmission;
  horsepower: number;
  drivetrain: string;
  color: string;
  badge: string;
  location: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  equipment: string[];
  status?: VehicleStatus;
  featured?: boolean;
  videoUrl?: string;
  trustItems?: TrustItem[];
  financePlans?: FinancePlan[];
  serviceHistory?: string[];
  transparencyItems?: TransparencyItem[];
}

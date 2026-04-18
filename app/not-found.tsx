import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="container-shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-6 text-5xl font-semibold text-white">Aradığınız sayfa bulunamadı.</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">
        İsterseniz stoktaki araçları inceleyebilir ya da danışman ekibimizle doğrudan iletişime geçebilirsiniz.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/vehicles">Araçlara Git</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          İletişime Geç
        </ButtonLink>
      </div>
    </div>
  );
}

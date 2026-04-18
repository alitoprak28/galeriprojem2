export function VideoPanel({ title, videoUrl }: { title: string; videoUrl?: string }) {
  if (!videoUrl) {
    return null;
  }

  return (
    <section className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7">
      <p className="text-xs uppercase tracking-[0.3em] text-accent">Araç videosu</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Showroom anlatımı ve detaylı video inceleme</h2>
      <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10">
        <iframe
          title={`${title} video`}
          src={videoUrl}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}

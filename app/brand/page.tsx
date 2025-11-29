import Hero from "@/components/Hero";
import VideoPlayer from "@/components/VideoPlayer";

export default function BrandDemo() {
  return (
    <main id="main" className="min-h-screen px-6">
      <Hero />
      <section className="mx-auto max-w-4xl py-10">
        <h2 className="text-2xl font-display mb-4">Video demo (with captions)</h2>
        <VideoPlayer
          src="/demo/sample.m3u8"
          poster="/demo/poster.jpg"
          captions={[{ src: "/demo/sample.en.vtt", srclang: "en", label: "English", default: true }]}
        />
      </section>
    </main>
  );
}
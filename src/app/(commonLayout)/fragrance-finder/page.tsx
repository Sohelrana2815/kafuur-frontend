// src/app/(commonLayout)/fragrance-finder/page.tsx

import FragranceFinder from "@/components/modules/products/FragranceFinder";

export const metadata = {
  title: "Find Your Perfect Fragrance | Kafuur",
  description: "Answer a few simple questions for a personalized fragrance recommendation.",
};

export default function FragranceFinderPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-2">
          ✨ Get In Touch
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Fragrance</h1>
        <p className="text-neutral-400">
          Answer a few simple questions for a personalized fragrance recommendation<br/>
          based on your unique style and needs.
        </p>
      </div>
      <FragranceFinder />
    </main>
  );
}
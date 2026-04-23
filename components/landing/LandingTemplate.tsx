import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function LandingTemplate({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#0b1028] sm:text-4xl">
            Template landing page
          </h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Area hero dan konten utama bisa Anda ganti di sini. Navbar memakai mega-menu saat hover
            pada &quot;Services&quot; (desktop). Footer dan menu navigasi memakai array di{" "}
            <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-sm">components/landing/data.ts</code>.
          </p>
        </section>
        {children}
      </main>
      <Footer />
    </div>
  );
}

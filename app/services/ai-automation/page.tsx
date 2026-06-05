import { FAQ } from "@/components/pages/service/ai-automation/FAQ";
import { Hero } from "@/components/pages/service/ai-automation/Hero";

export default function AiAutomationPage() {
  return (
    <main className="bg-white">
      <div className="mx-0 px-0">
        <Hero />
      </div>
      <div className="-mt-px mx-0 px-0">
        <FAQ />
      </div>
    </main>
  );
}

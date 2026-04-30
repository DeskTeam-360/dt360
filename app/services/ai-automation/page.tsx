import { FAQ } from "@/components/pages/service/ai-automation/FAQ";
import { Hero } from "@/components/pages/service/ai-automation/Hero";

export default function AiAutomationPage() {
  return (
    <main className="bg-white">
      <Hero />
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}

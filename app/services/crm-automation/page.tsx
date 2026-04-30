import { FAQ } from "@/components/pages/service/crm-automation/FAQ";
import { Hero } from "@/components/pages/service/crm-automation/Hero";

export default function CrmAutomationPage() {
  return (
    <main className="bg-white">
      <Hero />
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}

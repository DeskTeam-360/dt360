import { FAQ } from "@/components/pages/service/crm-automation/FAQ";
import { Hero } from "@/components/pages/service/crm-automation/Hero";

export default function CrmAutomationPage() {
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

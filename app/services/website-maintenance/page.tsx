import { FAQ } from "@/components/pages/service/website-maintenance/FAQ";
import { Hero } from "@/components/pages/service/website-maintenance/Hero";

export default function WebsiteMaintenancePage() {
  return (
    <main className="bg-white">
      <Hero />
      <div className="-mt-px">
        <FAQ />
      </div>
    </main>
  );
}

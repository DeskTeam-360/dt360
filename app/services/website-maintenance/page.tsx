import { FAQ } from "@/components/pages/service/website-maintenance/FAQ";
import { Hero } from "@/components/pages/service/website-maintenance/Hero";

export default function WebsiteMaintenancePage() {
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

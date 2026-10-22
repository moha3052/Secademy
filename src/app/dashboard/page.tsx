import { Shell } from "@/components/layout/shell";
import { LocalDashboard } from "@/components/local-dashboard";
export const metadata = { title: "Min læsning" };
export default function Dashboard() {
  return (
    <Shell active="/dashboard">
      <main id="main" className="workspace">
        <LocalDashboard />
      </main>
    </Shell>
  );
}

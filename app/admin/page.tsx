import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/login");
  }

  const rawLeads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates for Client Component props
  const leads = rawLeads.map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    interest: l.interest,
    message: l.message,
    createdAt: l.createdAt.toISOString(),
  }));

  return <AdminDashboard initialLeads={leads} />;
}

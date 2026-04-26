import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { DashboardAppShell } from "@/components/dashboard/dashboard-app-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  /*
  if (!session) {
    redirect("/login");
  }
  */

  return (
    <DashboardAppShell session={session}>
      {children}
    </DashboardAppShell>
  );
}

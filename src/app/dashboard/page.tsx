import { Suspense } from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserButton from "@/modules/auth/components/user-button";

function DashboardLoading() {
  return (
    <div
      className="mx-auto mt-12 h-48 max-w-5xl animate-pulse rounded-xl bg-muted"
      aria-label="Loading dashboard"
    />
  );
}

async function AuthenticatedDashboard() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/sign-in");
  }

  return (
    <>
      <header className="flex items-center justify-between border-b bg-background px-6 py-4">
        <Link href="/dashboard" className="text-lg font-semibold">
          VibeCode Editor
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {session.user.email}
          </span>
          <UserButton />
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm font-medium text-primary">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Welcome back{session.user.name ? `, ${session.user.name}` : ""}.
        </h1>
        <div className="mt-8 rounded-xl border bg-background p-6">
          <h2 className="text-lg font-medium">You’re signed in</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is ready. Manage your session from the profile menu.
          </p>
        </div>
      </section>
    </>
  );
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-muted/40">
      <Suspense fallback={<DashboardLoading />}>
        <AuthenticatedDashboard />
      </Suspense>
    </main>
  );
}

import { SEO } from "@/components/SEO";
import { AppHeader } from "@/components/app/AppHeader";
import { AppSidebar } from "@/components/app/AppSidebar";
import { MapView } from "@/components/app/MapView";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <SEO title="Dashboard - UtilityGIS" description="UtilityGIS mapping dashboard" />
      <div className="h-screen flex flex-col overflow-hidden">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-hidden">
            <MapView />
          </main>
        </div>
      </div>
    </>
  );
}
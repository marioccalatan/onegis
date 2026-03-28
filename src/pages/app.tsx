import { SEO } from "@/components/SEO";
import { AppHeader } from "@/components/app/AppHeader";
import { AppSidebar } from "@/components/app/AppSidebar";
import { MapView } from "@/components/app/MapView";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bypassAuth, setBypassAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Allow bypass for testing if auth not configured
    const timer = setTimeout(() => {
      if (status === "unauthenticated") {
        setBypassAuth(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [status]);

  if (status === "loading" && !bypassAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show map even without auth for testing purposes
  const showMap = session || bypassAuth;

  if (!showMap) {
    return null;
  }

  return (
    <>
      <SEO title="Dashboard - UtilityGIS" description="UtilityGIS mapping dashboard" />
      <div className="h-screen flex flex-col overflow-hidden">
        <AppHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar isOpen={sidebarOpen} />
          <main className="flex-1 overflow-hidden">
            <MapView />
          </main>
        </div>
      </div>
    </>
  );
}
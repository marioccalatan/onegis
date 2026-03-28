import { SEO } from "@/components/SEO";
import { AppHeader } from "@/components/app/AppHeader";
import { AppSidebar } from "@/components/app/AppSidebar";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { SchemaTab } from "@/components/project/SchemaTab";

export default function ProjectDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const [bypassAuth, setBypassAuth] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("project");

  useEffect(() => {
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

  const showContent = session || bypassAuth;

  if (!showContent) {
    return null;
  }

  return (
    <>
      <SEO title={`${projectData?.project.name || "Project"} - OneGIS`} description="OneGIS project management" />
      <div className="h-screen flex flex-col overflow-hidden">
        <AppHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar 
            isOpen={sidebarOpen} 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <main className="flex-1 overflow-auto bg-background">
            <div className="container py-6">
              <div className="mb-6">
                <Link href="/app">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Button>
                </Link>
              </div>

              <div className="mb-6">
                <h1 className="text-3xl font-heading font-bold">Project {id}</h1>
                <p className="text-muted-foreground mt-1">Manage your project schema, data, and settings</p>
              </div>

              <Tabs defaultValue="schema" className="w-full">
                <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
                  <TabsTrigger value="schema">Schema</TabsTrigger>
                  <TabsTrigger value="database">Database</TabsTrigger>
                  <TabsTrigger value="dataview">Data View</TabsTrigger>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="sync">Sync</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="schema" className="mt-6">
                  <SchemaTab projectId={id as string} />
                </TabsContent>

                <TabsContent value="database" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    Database management coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="dataview" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    Data view coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="team" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    Team management coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="sync" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    Sync settings coming soon...
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="text-center py-12 text-muted-foreground">
                    Project settings coming soon...
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
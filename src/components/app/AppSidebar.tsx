import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Map, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export function AppSidebar({ isOpen }: { isOpen: boolean }) {
  const [activeSection, setActiveSection] = useState("map");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const sections = [
    { id: "project", label: "PROJECT", icon: FolderOpen },
    { id: "map", label: "MAP", icon: Map },
    { id: "settings", label: "SETTINGS", icon: Settings },
  ];

  return (
    <aside
      className={`border-r border-border bg-card flex flex-col shrink-0 transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activeSection === section.id ? "bg-accent text-white" : ""
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            <section.icon className="w-4 h-4 mr-3" />
            {section.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
        >
          <LogOut className="w-4 h-4 mr-3" />
          LOGOUT
        </Button>
      </div>
    </aside>
  );
}
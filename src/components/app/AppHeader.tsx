import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";

export function AppHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-border bg-background flex items-center px-6 shrink-0">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <span className="font-heading font-bold text-xl">OneGIS</span>
      </div>

      <div className="ml-auto flex items-center space-x-4">
        {session?.user && (
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
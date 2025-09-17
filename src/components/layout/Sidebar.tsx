import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Settings, 
  Database, 
  History, 
  BarChart3,
  Menu,
  X,
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: "dashboard", name: "Dashboard", icon: BarChart3 },
  { id: "settings", name: "Configurações", icon: Settings },
  { id: "rag", name: "Base de Conhecimento", icon: Database },
  { id: "conversations", name: "Conversas", icon: History },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { profile, signOut } = useAuth();

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-card shadow-soft"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-gradient-card border-r shadow-medium transform transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <h1 className="font-bold text-lg">ChatBot RAG</h1>
                <p className="text-sm text-muted-foreground">WhatsApp Admin</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-smooth",
                    activeTab === item.id && "bg-gradient-primary text-primary-foreground shadow-soft"
                  )}
                  onClick={() => {
                    onTabChange(item.id);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Footer with User Profile */}
          <div className="mt-auto p-4 space-y-4">
            <Separator />
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {profile?.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {profile?.full_name || 'Usuário'}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {profile?.email}
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
            
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                ChatBot RAG v1.0
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Send,
  User,
  LogOut,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockClientUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { AuthProvider } from '@/components/auth-provider';
import { ClientNav } from '@/components/client/client-nav';


export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
        <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <Logo className="w-7 h-7" />
                <span className="text-lg font-semibold">FLUX</span>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <ClientNav />
            </SidebarContent>
            <SidebarFooter className="mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <Avatar className="h-9 w-9">
                <AvatarImage src={mockClientUser.avatarUrl} alt={mockClientUser.name} />
                <AvatarFallback>{mockClientUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{mockClientUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mockClientUser.email}</p>
                </div>
                <Link href="/client/profile">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Settings className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <main className="min-h-screen">
                {children}
            </main>
        </SidebarInset>
        <AIChatWidget userType="client" />
        </SidebarProvider>
    </AuthProvider>
  );
}

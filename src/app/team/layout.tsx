import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockTeamUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { AuthProvider } from '@/components/auth-provider';
import { TeamNav } from '@/components/team/team-nav';

export default function TeamLayout({
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
                <Logo className="w-7 h-7 text-accent" />
                <span className="text-lg font-semibold">FLUX (Team)</span>
            </div>
            </SidebarHeader>
            <SidebarContent>
                <TeamNav />
            </SidebarContent>
            <SidebarFooter className="mt-auto">
            <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
                <Avatar className="h-9 w-9">
                <AvatarImage src={mockTeamUser.avatarUrl} alt={mockTeamUser.name} />
                <AvatarFallback>{mockTeamUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate">{mockTeamUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mockTeamUser.role}</p>
                </div>
                 <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <main className="min-h-screen">
                {children}
            </main>
        </SidebarInset>
        <AIChatWidget userType="team" />
        </SidebarProvider>
    </AuthProvider>
  );
}

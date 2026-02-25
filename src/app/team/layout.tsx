import React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { AIChatWidget } from '@/components/ai-chat-widget';
import { AuthProvider } from '@/components/auth-provider';
import { TeamNav } from '@/components/team/team-nav';
import { TeamUserMenu } from '@/components/team/team-user-menu';

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
              <TeamUserMenu />
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

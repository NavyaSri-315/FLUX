"use client";

import React from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  Contact,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth-provider';
import { Button } from '../ui/button';

const navItems = [
  { href: '/team/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/team/team', icon: <Users />, label: 'Team' },
  { href: '/team/tasks', icon: <CheckSquare />, label: 'Tasks' },
  { href: '/team/timeline', icon: <Calendar />, label: 'Timeline' },
  { href: '/team/clients', icon: <Contact />, label: 'Clients' },
];

export function TeamNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className='flex flex-col h-full'>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname.startsWith(item.href)}
                icon={item.icon}
              >
                {item.label}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <div className='mt-auto p-2'>
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}

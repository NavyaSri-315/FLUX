"use client";

import React from 'react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Send,
  User as UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../auth-provider';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const navItems = [
  { href: '/client/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { href: '/client/transactions', icon: <ArrowLeftRight />, label: 'Transactions' },
  { href: '/client/analytics', icon: <BarChart3 />, label: 'Analytics' },
  { href: '/client/payments', icon: <Send />, label: 'Payments' },
  { href: '/client/profile', icon: <UserIcon />, label: 'Profile' },
];

export function ClientNav() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <div className='flex flex-col h-full'>
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <SidebarMenuButton
                isActive={pathname === item.href}
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

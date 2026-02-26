'use client';

import { useAuth } from '@/components/auth-provider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type TeamMember } from '@/lib/types';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export function TeamUserMenu() {
  const { user, userType, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
        <Skeleton className="h-9 w-9 rounded-full" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (!user || userType !== 'team') {
    return null;
  }
  
  const teamUser = user as TeamMember;

  return (
    <div className="flex items-center gap-3 p-2 rounded-md bg-muted/50">
      <Avatar className="h-9 w-9">
        <AvatarFallback>{teamUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-semibold truncate">{teamUser.name}</p>
        <p className="text-xs text-muted-foreground truncate">{teamUser.role}</p>
      </div>
      <Link href="/team/profile" passHref>
        <Button variant="ghost" size="icon" className="w-8 h-8">
            <Settings className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}

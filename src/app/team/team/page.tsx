import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockTeamMembers } from "@/lib/data";
import { UserPlus } from "lucide-react";
import type { TeamMember } from "@/lib/types";

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const totalTasks = member.tasksCompleted + member.tasksPending;
  const completionRate = totalTasks > 0 ? (member.tasksCompleted / totalTasks) * 100 : 0;

  return (
    <Card className="bg-card/60 backdrop-blur-xl border-border/30">
        <CardContent className="p-6 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-primary">{member.role}</p>
            <div className="text-left mt-6 space-y-4">
                <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Task Completion</span>
                        <span>{completionRate.toFixed(0)}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Completed Tasks:</span>
                    <span className="font-medium">{member.tasksCompleted}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Pending Tasks:</span>
                    <span className="font-medium">{member.tasksPending}</span>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default function TeamPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team</h1>
          <p className="text-muted-foreground">Overview of the FLUX team members and their performance.</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockTeamMembers.map(member => (
          <TeamMemberCard key={member.uid} member={member} />
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockTasks, mockTeamUser } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const taskStatusColors = {
  Completed: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const StatCard = ({ title, value }: { title: string, value: number }) => (
    <Card className="bg-card/60">
        <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
)

export default function TasksPage() {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const myTasks = mockTasks.filter(t => t.assignedTo === mockTeamUser.name);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Track and manage team and personal tasks.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Task
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Tasks" value={totalTasks} />
        <StatCard title="Completed" value={completedTasks} />
        <StatCard title="Pending" value={pendingTasks} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Tasks assigned to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {myTasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 p-3 rounded-md border border-border/30 hover:bg-muted/20">
                <Checkbox defaultChecked={task.status === 'Completed'} />
                <div className="flex-1">
                  <p className={cn("font-medium", task.status === 'Completed' && "line-through text-muted-foreground")}>{task.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                </div>
                <Badge variant="outline" className={cn("capitalize", taskStatusColors[task.status])}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>All Tasks Summary</CardTitle>
            <CardDescription>A quick look at all ongoing tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockTasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between">
                <p className="text-sm">{task.title}</p>
                 <Badge variant="outline" className={cn("capitalize text-xs", taskStatusColors[task.status])}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

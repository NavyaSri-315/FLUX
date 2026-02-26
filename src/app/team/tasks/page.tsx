'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockTasks, mockTeamUser } from "@/lib/data";
import { PlusCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Task } from "@/lib/types";

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
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState(mockTeamUser.name);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' } 
        : task
    ));
    toast({
      title: "Task Updated",
      description: "The task status has been successfully updated.",
    });
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    setIsAdding(true);
    // Simulate API delay
    setTimeout(() => {
      const newTask: Task = {
        id: `T${Date.now()}`,
        title: newTaskTitle,
        status: 'Pending',
        dueDate: 'Next week',
        assignedTo: newTaskAssignee,
      };
      setTasks(prev => [newTask, ...prev]);
      setNewTaskTitle("");
      setIsAdding(false);
      setIsDialogOpen(false);
      toast({
        title: "Task Added",
        description: `New task has been assigned to ${newTaskAssignee}.`,
      });
    }, 800);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const myTasks = tasks.filter(t => t.assignedTo === mockTeamUser.name);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Track and manage team and personal tasks.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task and assign it to a team member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task description..."
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">Assignee</Label>
                <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Navya">Navya</SelectItem>
                    <SelectItem value="Sowmya">Sowmya</SelectItem>
                    <SelectItem value="Subhash">Subhash</SelectItem>
                    <SelectItem value="Gaffar">Gaffar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTask} disabled={isAdding || !newTaskTitle.trim()}>
                {isAdding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
            {myTasks.length > 0 ? (
              myTasks.map(task => (
                <div key={task.id} className="flex items-center gap-4 p-3 rounded-md border border-border/30 hover:bg-muted/20 transition-colors">
                  <Checkbox 
                    id={`task-${task.id}`}
                    checked={task.status === 'Completed'} 
                    onCheckedChange={() => handleToggleTask(task.id)}
                  />
                  <div className="flex-1 cursor-pointer" onClick={() => handleToggleTask(task.id)}>
                    <p className={cn("font-medium", task.status === 'Completed' && "line-through text-muted-foreground")}>
                      {task.title}
                    </p>
                    <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                  </div>
                  <Badge variant="outline" className={cn("capitalize", taskStatusColors[task.status])}>
                    {task.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No tasks assigned to you.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>All Tasks Summary</CardTitle>
            <CardDescription>A quick look at all ongoing tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.length > 0 ? (
              tasks.slice(0, 8).map(task => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-1.5 h-1.5 rounded-full", task.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500')} />
                    <p className="text-sm">{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{task.assignedTo}</span>
                    <Badge variant="outline" className={cn("capitalize text-[10px] px-1.5 py-0", taskStatusColors[task.status])}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No tasks found.</p>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

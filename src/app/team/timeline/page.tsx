import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { mockTimelineEvents } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function TimelinePage() {
    
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Timeline</h1>
        <p className="text-muted-foreground">Interactive calendar of upcoming client transactions and events.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
                <CardContent className="p-2">
                    <Calendar
                        mode="multiple"
                        selected={mockTimelineEvents.map(e => e.date)}
                        className="w-full"
                        classNames={{
                            day_selected: "bg-primary/20 text-primary-foreground hover:bg-primary/30",
                            day_today: "bg-accent/50 text-accent-foreground",
                        }}
                    />
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1">
            <Card className="bg-card/60 backdrop-blur-xl border-border/30">
                <CardHeader>
                    <CardTitle>Scheduled Transactions</CardTitle>
                    <CardDescription>Details for marked dates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[500px] overflow-y-auto">
                    {mockTimelineEvents.sort((a,b) => a.date.getTime() - b.date.getTime()).map(event => (
                        <div key={event.id} className="p-3 rounded-md border border-border/50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                                </div>
                                <Badge variant="outline" className={cn("capitalize", priorityColors[event.priority])}>{event.priority}</Badge>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

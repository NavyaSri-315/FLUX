import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockClients } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const statusColors = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Inactive: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Flagged: "bg-red-500/20 text-red-400 border-red-500/30",
};


export default function ClientsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage and review all client accounts.</p>
        </div>
         <div className="relative mt-4 md:mt-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-8 w-full md:w-64" />
        </div>
      </header>
      
      <Card className="bg-card/60 backdrop-blur-xl border-border/30">
        <CardContent className="p-0">
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Total Volume</TableHead>
                            <TableHead>Last Transaction</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockClients.map(client => (
                            <TableRow key={client.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{client.name}</p>
                                            <p className="text-xs text-muted-foreground">{client.company}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-mono">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(client.totalVolume)}</TableCell>
                                <TableCell>{new Date(client.lastTransaction).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn("capitalize", statusColors[client.status])}>
                                        {client.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

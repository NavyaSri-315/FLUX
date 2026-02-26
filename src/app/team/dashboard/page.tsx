'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { teamRevenueData, mockClientFeedback } from "@/lib/data";
import { DollarSign, ArrowLeftRight, Users, TrendingUp, Star, Server } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ title, value, icon, change }: { title: string, value: string, icon: React.ReactNode, change?: string }) => (
  <Card className="bg-card/60 backdrop-blur-xl border-border/30">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && <p className="text-xs text-muted-foreground">{change}</p>}
    </CardContent>
  </Card>
);

const chartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  profit: { label: "Profit", color: "hsl(var(--accent))" },
};

export default function TeamDashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <p className="text-muted-foreground">Internal overview of FLUX's performance.</p>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue (Q2)" value="$1.35M" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} change="+12% from last quarter" />
        <StatCard title="Transactions (30d)" value="1.2k" icon={<ArrowLeftRight className="h-4 w-4 text-muted-foreground" />} change="+5.2% from last month" />
        <StatCard title="Active Clients" value="1,200+" icon={<Users className="h-4 w-4 text-muted-foreground" />} change="+20 new this month" />
        <StatCard title="Projected Revenue" value="$6M" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} change="Annual projection" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>Financial Overview (Monthly)</CardTitle>
            <CardDescription>Revenue and profit trends over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={teamRevenueData}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)"/>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={4} />
                <Bar dataKey="profit" fill="hsl(var(--accent))" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Live status of core services.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>API Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Operational</span>
                </div>
              </div>
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>Payment Processor</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Operational</span>
                </div>
              </div>
               <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>Stablecoin Bridge</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">Operational</span>
                </div>
              </div>
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>KYC Service</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-sm text-muted-foreground">Degraded</span>
                </div>
              </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 backdrop-blur-xl border-border/30">
        <CardHeader>
          <CardTitle>Latest Client Reviews</CardTitle>
          <CardDescription>Pending transactions: <Badge variant="destructive">3</Badge></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockClientFeedback.slice(0, 3).map((feedback) => (
              <div key={feedback.id} className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={feedback.avatarUrl} />
                  <AvatarFallback>{feedback.clientName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{feedback.clientName} <span className="font-normal text-muted-foreground">from {feedback.clientCompany}</span></p>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(feedback.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                      {[...Array(5-feedback.rating)].map((_, i) => <Star key={i} className="h-4 w-4" />)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 italic">"{feedback.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

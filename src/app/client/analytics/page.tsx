'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { analyticsData } from "@/lib/data";
import { TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, Pie, PieChart as RechartsPieChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

const chartConfigSavings = {
  "Your Savings": {
    label: "Your Savings",
    color: "hsl(var(--primary))",
  },
  "Traditional Fees": {
    label: "Traditional Fees",
    color: "hsl(var(--muted-foreground))",
  },
};

const chartConfigFees = {
    "FLUX Fees": {
      label: "FLUX Fees",
      color: "hsl(var(--primary))",
    },
    "Traditional Banking Fees": {
      label: "Traditional Fees",
      color: "hsl(var(--muted-foreground))",
    },
  };

export default function AnalyticsPage() {
    const totalSavings = analyticsData.savingsOverTime.reduce((acc, item) => acc + (item["Traditional Fees"] - item["Your Savings"]), 0);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Visualize your savings and payment patterns.</p>
      </header>

      <Card className="bg-card/60 backdrop-blur-xl border-border/30">
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Your Savings Over Time</CardTitle>
                <CardDescription>Monthly fees paid vs. what you would have paid with traditional banks.</CardDescription>
            </div>
            <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Saved</p>
                <p className="text-2xl font-bold text-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalSavings)}</p>
            </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfigSavings} className="h-[300px] w-full">
            <RechartsLineChart data={analyticsData.savingsOverTime}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="Traditional Fees" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Your Savings" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-card/60 backdrop-blur-xl border-border/30">
            <CardHeader>
                <CardTitle>Route Usage</CardTitle>
                <CardDescription>Breakdown of payment routes used.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[250px] w-full">
                    <RechartsPieChart>
                        <Tooltip content={<ChartTooltipContent nameKey="route"/>} />
                        <Pie data={analyticsData.routeUsage} dataKey="value" nameKey="route" innerRadius={50} outerRadius={80} paddingAngle={5} />
                        <Legend content={<ChartLegendContent nameKey="route" />} />
                    </RechartsPieChart>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-xl border-border/30">
            <CardHeader>
                <CardTitle>Fees Paid vs. Traditional Banking</CardTitle>
                <CardDescription>A direct comparison of total fees.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfigFees} className="h-[250px] w-full">
                    <RechartsBarChart data={analyticsData.feesComparison} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border)/0.5)" />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" hide/>
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend content={<ChartLegendContent />} />
                        <Bar dataKey="Traditional Banking Fees" fill="hsl(var(--muted-foreground))" radius={4} />
                        <Bar dataKey="FLUX Fees" fill="hsl(var(--primary))" radius={4} />
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

       <Card className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 rounded-full bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Projected Savings Calculator</CardTitle>
                <CardDescription>Estimate your savings on future transactions.</CardDescription>
              </div>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
              <p className="text-muted-foreground">If you transfer</p>
              <Badge variant="outline" className="text-lg py-1 px-4">$100,000</Badge>
              <p className="text-muted-foreground">you could save up to</p>
              <Badge className="text-lg py-1 px-4">$850</Badge>
              <p className="text-muted-foreground">per transaction.</p>
          </CardContent>
      </Card>

    </div>
  );
}

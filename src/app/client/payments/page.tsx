'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { ArrowRight, Clock, DollarSign, Gem, Loader, Zap } from 'lucide-react';
import { clientPaymentRouteOptimization, ClientPaymentRouteOptimizationOutput } from '@/ai/flows/client-payment-route-optimization';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const countries = [
  { value: 'USA', label: '🇺🇸 United States' },
  { value: 'India', label: '🇮🇳 India' },
  { value: 'Germany', label: '🇩🇪 Germany' },
  { value: 'UK', label: '🇬🇧 United Kingdom' },
  { value: 'Singapore', label: '🇸🇬 Singapore' },
];

const formSchema = z.object({
  fromCountry: z.string().min(1, 'Please select a country.'),
  toCountry: z.string().min(1, 'Please select a country.'),
  amount: z.coerce.number().positive('Amount must be positive.'),
});

const RouteCard = ({ title, icon, cost, time, description, savings, isOptimal }: { title: string, icon: React.ReactNode, cost: number, time: string, description: string, savings?: number, isOptimal?: boolean }) => (
    <Card className={`relative overflow-hidden ${isOptimal ? 'border-primary shadow-lg' : 'bg-card/60'}`}>
        {isOptimal && <Badge className="absolute top-2 right-2">Optimal Route</Badge>}
        <CardHeader>
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <CardTitle>{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Cost</span>
                <span className="font-bold text-lg">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cost)}</span>
            </div>
             <div className="flex justify-between items-baseline">
                <span className="text-sm text-muted-foreground">Time</span>
                <span className="font-bold text-lg">{time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>
            {savings !== undefined && (
                <div className="flex items-center gap-2 text-primary">
                    <Gem className="h-4 w-4" />
                    <span className="font-medium">You save {savings.toFixed(1)}% vs SWIFT</span>
                </div>
            )}
             <Button className="w-full mt-2" disabled={!isOptimal}>
                Confirm Payment
             </Button>
        </CardContent>
    </Card>
)

export default function PaymentsPage() {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<ClientPaymentRouteOptimizationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCountry: '',
      toCountry: '',
      amount: 10000,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResults(null);
    startTransition(async () => {
      try {
        const optimizationResults = await clientPaymentRouteOptimization(values);
        setResults(optimizationResults);
        toast({
          title: "Routes Optimized!",
          description: "We've found the best routes for your transaction.",
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Could not fetch payment routes. Please try again.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">New Payment</h1>
        <p className="text-muted-foreground">Find the fastest and most cost-effective route for your transfer.</p>
      </header>

      <Card className="bg-card/60 backdrop-blur-xl border-border/30">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <FormField
                control={form.control}
                name="fromCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="toCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>{countries.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (USD)</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="number" placeholder="10,000" className="pl-8" {...field} />
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
                Find Best Route
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
         <div className="text-center p-8">
             <Loader className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="mt-4 text-muted-foreground">Optimizing routes...</p>
         </div>
      )}

      {results && (
        <div>
            <h2 className="text-2xl font-bold mb-4">Your Optimized Routes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RouteCard title="Stablecoin" icon={<Zap />} cost={results.stablecoin.cost} time={results.stablecoin.time} description={results.stablecoin.description} savings={results.stablecoin.savingsPercentage} isOptimal />
                <RouteCard title="Local Rail" icon={<Clock />} cost={results.localRail.cost} time={results.localRail.time} description={results.localRail.description} savings={results.localRail.savingsPercentage} />
                <RouteCard title="SWIFT" icon={<DollarSign />} cost={results.swift.cost} time={results.swift.time} description={results.swift.description} />
            </div>
        </div>
      )}

    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockClientUser, mockStablecoinRates, mockClientFeedback, mockTransactions } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ArrowUpRight, DollarSign, Gem, Users, Zap } from "lucide-react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const StatCard = ({ title, value, icon, subValue }: { title: string, value: string, icon: React.ReactNode, subValue?: string }) => (
  <Card className="bg-card/60 backdrop-blur-xl border-border/30">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </CardContent>
  </Card>
);

const SuccessMetric = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);


export default function ClientDashboardPage() {
  const totalTransferred = mockTransactions.reduce((acc, t) => acc + t.amount, 0);
  const feesSaved = mockTransactions.reduce((acc, t) => {
    if (t.status === 'Completed' && t.savingsPercentage > 0) {
      const traditionalFee = t.feePaid / (1 - t.savingsPercentage / 100);
      return acc + (traditionalFee - t.feePaid);
    }
    return acc;
  }, 0);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {mockClientUser.company}</h1>
          <p className="text-muted-foreground">Here's your financial overview at a glance.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Account Balance</p>
            <p className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mockClientUser.balance)}</p>
          </div>
          <Separator orientation="vertical" className="h-10" />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Fees Payable</p>
            <p className="text-lg font-semibold text-primary">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mockClientUser.feesOwed)}</p>
          </div>
           <Button asChild>
                <Link href="/client/payments">New Payment <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Transferred" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalTransferred)} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} subValue="Across all corridors" />
        <StatCard title="Fees Saved" value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(feesSaved)} icon={<Gem className="h-4 w-4 text-muted-foreground" />} subValue="Compared to traditional banking" />
        <StatCard title="Transactions" value={`+${mockTransactions.length}`} icon={<ArrowLeftRight className="h-4 w-4 text-muted-foreground" />} subValue="In the last 30 days" />
        <StatCard title="Active Corridors" value="+4" icon={<Users className="h-4 w-4 text-muted-foreground" />} subValue="USA, UK, India, Germany" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-xl border-border/30">
          <CardHeader>
            <CardTitle>Live Stablecoin Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pair</TableHead>
                        <TableHead className="text-right">Rate</TableHead>
                        <TableHead className="text-right">% Change (24h)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockStablecoinRates.map(rate => (
                        <TableRow key={rate.pair}>
                            <TableCell className="font-medium">{rate.pair}</TableCell>
                            <TableCell className="text-right">{rate.rate.toFixed(4)}</TableCell>
                            <TableCell className={`text-right font-medium ${rate.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
                                {rate.change.toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-xl border-border/30">
            <CardHeader>
                <CardTitle>The FLUX Advantage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <SuccessMetric icon={<Zap />} title="3-Second Settlements" description="Near-instant transfers via stablecoins."/>
                <SuccessMetric icon={<Gem />} title="Zero Hidden Fees" description="Complete transparency on all costs."/>
                <SuccessMetric icon={<DollarSign />} title="Unbeatable Savings" description="Average 32% savings vs banks."/>
            </CardContent>
        </Card>
      </div>

       <div className="relative">
        <h2 className="text-2xl font-bold mb-4">What Our Clients Say</h2>
        <Carousel opts={{ loop: true }} className="w-full">
          <CarouselContent>
            {mockClientFeedback.map((feedback) => (
              <CarouselItem key={feedback.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full bg-card/60 backdrop-blur-xl border-border/30">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                        <div className="flex items-center gap-4">
                             <Avatar className="h-12 w-12">
                                <AvatarFallback>{feedback.clientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{feedback.clientName}</p>
                                <p className="text-sm text-muted-foreground">{feedback.clientCompany}</p>
                            </div>
                        </div>
                      <p className="text-sm text-muted-foreground italic">"{feedback.comment}"</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-[-20px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-20px] top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </div>
  );
}

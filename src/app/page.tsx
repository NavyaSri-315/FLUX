import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { ArrowRight, CheckCircle2, Bot } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const stats = [
  { value: '$1.2B+', label: 'Processed' },
  { value: '32%', label: 'Avg. Savings' },
  { value: '1,200+', label: 'Happy Clients' },
  { value: '8', label: 'Countries' },
];

const features = [
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: '85% Cheaper than Banks',
    description: 'Slash your transfer fees and keep more of your money.',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: '3-Second Settlements',
    description:
      'Experience near-instantaneous transactions with our stablecoin routes.',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: 'Zero Hidden Fees',
    description:
      'What you see is what you get. Transparent pricing, always.',
  },
    {
    icon: <Bot className="h-6 w-6 text-primary" />,
    title: 'AI-Powered Optimization',
    description:
      'Our smart engine finds the cheapest, fastest route for every payment.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="font-bold">FLUX</span>
          </Link>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login/team">Team Login</Link>
              </Button>
              <Button asChild>
                <Link href="/login/client">
                  Client Login <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 md:py-32">
          <div
            aria-hidden="true"
            className="absolute inset-0 top-0 -z-10 h-full w-full"
          >
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
            <div className="absolute inset-0 -z-20 bg-background"></div>
            <div className="absolute inset-x-0 top-0 h-64 -z-10 bg-gradient-to-b from-background via-background/80 to-transparent"></div>
            <div className="absolute inset-x-0 -bottom-1/2 h-64 -z-10 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          <div className="container text-center">
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              Smarter Cross-Border Payments
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              FLUX is your intelligent partner for international transactions. We
              leverage cutting-edge technology to provide payments that are
              faster, cheaper, and more transparent than traditional services
              like Wise or bank transfers.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login/client">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Why Businesses Choose FLUX
            </h2>
            <p className="mt-4 text-muted-foreground">
              Stop losing money on outdated financial systems.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/60 p-6 backdrop-blur-xl transition-all hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  {feature.icon}
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="container py-16 md:py-24">
            <div className="relative rounded-xl border border-border/40 bg-card/50 p-8 md:p-12 overflow-hidden">
                 <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10"
                >
                     <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[length:1rem_1rem] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold">Ready to Revolutionize Your Payments?</h2>
                    <p className="mt-4 text-muted-foreground">Join over a thousand businesses saving time and money with FLUX.</p>
                    <div className="mt-8">
                         <Button size="lg" asChild>
                            <Link href="/login/client">
                            Open a Free Account
                            <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
          <div className="flex items-center gap-2 text-center text-sm text-muted-foreground md:text-left">
            <Logo className="h-4 w-4" />
            <span>© {new Date().getFullYear()} FLUX, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
